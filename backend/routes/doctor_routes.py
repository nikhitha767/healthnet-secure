from flask import Blueprint, request, jsonify
from middleware.auth import token_required, roles_required
from database.models import User, PatientDoctorMapping, Report, Message, DoctorProfile, Appointment
from database.db import db
from utils.helpers import serialize_user, serialize_report, serialize_message

doctor_bp = Blueprint('doctor_bp', __name__)

@doctor_bp.route('/patients', methods=['GET'])
@token_required
@roles_required('doctor')
def get_assigned_patients(current_user):
    # Only view assigned patients
    mappings = PatientDoctorMapping.query.filter_by(doctor_id=current_user.id).all()
    patient_ids = [m.patient_id for m in mappings]
    
    if not patient_ids:
        return jsonify([]), 200
        
    patients = User.query.filter(User.id.in_(patient_ids)).all()
    return jsonify([serialize_user(p) for p in patients]), 200

@doctor_bp.route('/patients/<int:patient_id>/reports', methods=['GET'])
@token_required
@roles_required('doctor')
def get_patient_reports(current_user, patient_id):
    # Enforce role-based access: can doctor view this particular patient's reports?
    mapping = PatientDoctorMapping.query.filter_by(doctor_id=current_user.id, patient_id=patient_id).first()
    if not mapping:
        return jsonify({'message': 'Access denied: Patient is not assigned to you.'}), 403
        
    reports = Report.query.filter_by(user_id=patient_id).all()
    return jsonify([serialize_report(report) for report in reports]), 200

@doctor_bp.route('/chat', methods=['POST'])
@token_required
@roles_required('doctor')
def send_message_to_patient(current_user):
    data = request.get_json()
    patient_id = data.get('patient_id')
    message_text = data.get('message')
    
    if not patient_id or not message_text:
        return jsonify({'message': 'Missing patient_id or message'}), 400
        
    # Security Rule: Doctors can only access assigned patients
    mapping = PatientDoctorMapping.query.filter_by(doctor_id=current_user.id, patient_id=patient_id).first()
    if not mapping:
        return jsonify({'message': 'Access denied: Patient is not assigned to you.'}), 403
        
    new_message = Message(
        sender_id=current_user.id,
        receiver_id=patient_id,
        message=message_text
    )
    db.session.add(new_message)
    db.session.commit()
    
    return jsonify({
        'message': 'Message sent successfully',
        'data': serialize_message(new_message)
    }), 201

@doctor_bp.route('/chat/<int:patient_id>', methods=['GET'])
@token_required
@roles_required('doctor')
def get_messages_with_patient(current_user, patient_id):
    # Security Rule: Doctors can only access assigned patients
    mapping = PatientDoctorMapping.query.filter_by(doctor_id=current_user.id, patient_id=patient_id).first()
    if not mapping:
        return jsonify({'message': 'Access denied: Patient is not assigned to you.'}), 403
        
    messages = Message.query.filter(
        ((Message.sender_id == current_user.id) & (Message.receiver_id == patient_id)) |
        ((Message.sender_id == patient_id) & (Message.receiver_id == current_user.id))
    ).order_by(Message.timestamp).all()
    
    return jsonify([serialize_message(m) for m in messages]), 200

@doctor_bp.route('/profile', methods=['GET', 'POST'])
@token_required
@roles_required('doctor')
def doctor_profile(current_user):
    profile = DoctorProfile.query.filter_by(doctor_id=current_user.id).first()
    
    if request.method == 'POST':
        data = request.get_json()
        if not profile:
            profile = DoctorProfile(doctor_id=current_user.id)
            db.session.add(profile)
        
        profile.specialty = data.get('specialty', getattr(profile, 'specialty', ''))
        profile.education = data.get('education', getattr(profile, 'education', ''))
        profile.experience = data.get('experience', getattr(profile, 'experience', 0))
        profile.contact_number = data.get('contact_number', getattr(profile, 'contact_number', ''))
        
        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
        
    if not profile:
        return jsonify(None), 200
        
    return jsonify({
        'id': profile.id,
        'specialty': profile.specialty,
        'education': profile.education,
        'experience': profile.experience,
        'contact_number': profile.contact_number
    }), 200

@doctor_bp.route('/appointments', methods=['GET'])
@token_required
@roles_required('doctor')
def get_doctor_appointments(current_user):
    appointments = Appointment.query.filter_by(doctor_id=current_user.id).all()
    result = []
    for apt in appointments:
        patient = User.query.get(apt.patient_id)
        result.append({
            'id': apt.id,
            'patient_name': patient.name,
            'appointment_date': apt.appointment_date,
            'appointment_time': apt.appointment_time,
            'status': apt.status,
            'created_at': apt.created_at.isoformat()
        })
    return jsonify(result), 200

@doctor_bp.route('/appointments/<int:appointment_id>', methods=['PUT'])
@token_required
@roles_required('doctor')
def update_appointment(current_user, appointment_id):
    data = request.get_json()
    status = data.get('status')
    
    appointment = Appointment.query.filter_by(id=appointment_id, doctor_id=current_user.id).first()
    if not appointment:
        return jsonify({'message': 'Appointment not found'}), 404
        
    if status in ['Confirmed', 'Cancelled', 'Completed']:
        appointment.status = status
        
        # If 'Confirmed', map the patient to the doctor's roster permanently
        if status == 'Confirmed':
            mapping = PatientDoctorMapping.query.filter_by(patient_id=appointment.patient_id, doctor_id=current_user.id).first()
            if not mapping:
                new_mapping = PatientDoctorMapping(patient_id=appointment.patient_id, doctor_id=current_user.id)
                db.session.add(new_mapping)
                
        db.session.commit()
        return jsonify({'message': f'Appointment {status.lower()} successfully'}), 200
    
    return jsonify({'message': 'Invalid status'}), 400


