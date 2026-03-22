import os
from datetime import datetime
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from middleware.auth import token_required, roles_required
from database.models import Report, Alert, Message, User, DoctorProfile, Appointment, PatientDoctorMapping
from database.db import db
from utils.helpers import serialize_report, serialize_alert, serialize_message

patient_bp = Blueprint('patient_bp', __name__)

@patient_bp.route('/reports/upload', methods=['POST'])
@token_required
@roles_required('patient')
def upload_report(current_user):
    if 'file' not in request.files:
        return jsonify({'message': 'No file part found in request'}), 400
    
    file = request.files['file']
    report_name = request.form.get('report_name', 'Unnamed Report')
    
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
        
    if file:
        filename = secure_filename(file.filename)
        # Store under logged-in patient only
        user_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], str(current_user.id))
        os.makedirs(user_folder, exist_ok=True)
        
        file_path = os.path.join(user_folder, filename)
        file.save(file_path)
        
        # Save relative path for database
        relative_path = f"{current_user.id}/{filename}"
        
        new_report = Report(
            user_id=current_user.id,
            report_name=report_name,
            file_path=relative_path
        )
        db.session.add(new_report)
        db.session.commit()
        
        return jsonify({
            'message': 'Report uploaded successfully',
            'report': serialize_report(new_report)
        }), 201

@patient_bp.route('/reports', methods=['GET'])
@token_required
@roles_required('patient')
def get_own_reports(current_user):
    # Retrieve only the logged-in patient's reports
    reports = Report.query.filter_by(user_id=current_user.id).all()
    return jsonify([serialize_report(report) for report in reports]), 200

@patient_bp.route('/alerts', methods=['GET'])
@token_required
@roles_required('patient')
def get_own_alerts(current_user):
    # Retrieve only the logged-in patient's alerts
    alerts = Alert.query.filter_by(user_id=current_user.id).all()
    return jsonify([serialize_alert(alert) for alert in alerts]), 200

@patient_bp.route('/chat', methods=['POST'])
@token_required
@roles_required('patient')
def send_message_to_doctor(current_user):
    data = request.get_json()
    doctor_id = data.get('doctor_id')
    message_text = data.get('message')
    
    if not doctor_id or not message_text:
        return jsonify({'message': 'Missing doctor_id or message'}), 400
        
    # Verify doctor exists and has role doctor
    doctor = User.query.filter_by(id=doctor_id, role='doctor').first()
    if not doctor:
        return jsonify({'message': 'Doctor not found'}), 404
        
    new_message = Message(
        sender_id=current_user.id,
        receiver_id=doctor_id,
        message=message_text
    )
    db.session.add(new_message)
    db.session.commit()
    
    return jsonify({
        'message': 'Message sent successfully',
        'data': serialize_message(new_message)
    }), 201

@patient_bp.route('/chat/<int:doctor_id>', methods=['GET'])
@token_required
@roles_required('patient')
def get_messages_with_doctor(current_user, doctor_id):
    # Get chat history between patient and doctor
    messages = Message.query.filter(
        ((Message.sender_id == current_user.id) & (Message.receiver_id == doctor_id)) |
        ((Message.sender_id == doctor_id) & (Message.receiver_id == current_user.id))
    ).order_by(Message.timestamp).all()
    
    return jsonify([serialize_message(m) for m in messages]), 200

@patient_bp.route('/doctors', methods=['GET'])
@token_required
@roles_required('patient')
def get_all_doctors(current_user):
    doctors = User.query.filter_by(role='doctor').all()
    result = []
    for doc in doctors:
        profile = DoctorProfile.query.filter_by(doctor_id=doc.id).first()
        if profile:
            result.append({
                'id': doc.id,
                'name': doc.name,
                'specialty': profile.specialty,
                'education': profile.education,
                'experience': profile.experience,
                'contact_number': profile.contact_number
            })
    return jsonify(result), 200

@patient_bp.route('/appointments', methods=['POST'])
@token_required
@roles_required('patient')
def book_appointment(current_user):
    data = request.get_json()
    doctor_id = data.get('doctor_id')
    date = data.get('appointment_date')
    time = data.get('appointment_time')
    
    if not all([doctor_id, date, time]):
        return jsonify({'message': 'Missing required fields'}), 400
        
    new_apt = Appointment(
        patient_id=current_user.id,
        doctor_id=doctor_id,
        appointment_date=date,
        appointment_time=time,
        status='Pending'
    )
    db.session.add(new_apt)
    db.session.commit()
    return jsonify({'message': 'Appointment booked successfully'}), 201

@patient_bp.route('/appointments', methods=['GET'])
@token_required
@roles_required('patient')
def get_appointments(current_user):
    appointments = Appointment.query.filter_by(patient_id=current_user.id).all()
    result = []
    for apt in appointments:
        doctor = User.query.get(apt.doctor_id)
        result.append({
            'id': apt.id,
            'doctor_name': doctor.name,
            'appointment_date': apt.appointment_date,
            'appointment_time': apt.appointment_time,
            'status': apt.status,
            'created_at': apt.created_at.isoformat()
        })
    return jsonify(result), 200

@patient_bp.route('/notifications', methods=['GET'])
@token_required
@roles_required('patient')
def get_notifications(current_user):
    notifications = []
    # Check appointments
    appointments = Appointment.query.filter_by(patient_id=current_user.id).all()
    for apt in appointments:
        doctor = User.query.get(apt.doctor_id)
        doctor_name_fmt = doctor.name if doctor.name.startswith('Dr') else f'Dr. {doctor.name}'
        
        if apt.status == 'Pending':
            notifications.append({
                'id': f'apt-{apt.id}-pending',
                'type': 'warning',
                'title': 'Appointment Pending',
                'message': f'Your appointment request with {doctor_name_fmt} for {apt.appointment_date} at {apt.appointment_time} is pending approval.',
                'timestamp': apt.created_at.isoformat()
            })
        elif apt.status == 'Confirmed':
            notifications.append({
                'id': f'apt-{apt.id}-confirmed',
                'type': 'success',
                'title': 'Appointment Confirmed',
                'message': f'{doctor_name_fmt} has confirmed your appointment for {apt.appointment_date} at {apt.appointment_time}. Next step: If you have past medical records, please click on "Upload Report" to attach them for the doctor to review.',
                'timestamp': apt.created_at.isoformat() # Ideally we'd use updated_at, but created_at works as fallback
            })
        elif apt.status == 'Cancelled':
            notifications.append({
                'id': f'apt-{apt.id}-cancelled',
                'type': 'error',
                'title': 'Appointment Declined',
                'message': f'{doctor_name_fmt} has declined your appointment request for {apt.appointment_date}. Please try booking a different slot or another specialist.',
                'timestamp': apt.created_at.isoformat()
            })
            
    # Check reports
    reports = Report.query.filter_by(user_id=current_user.id).all()
    if not reports:
        notifications.append({
            'id': 'rep-reminder',
            'type': 'info',
            'title': 'Action Recommended',
            'message': 'You haven\'t uploaded any medical reports yet. Uploading your previous records helps doctors provide better care.',
            'timestamp': datetime.utcnow().isoformat()
        })
    else:
        confirmed_apts = [a for a in appointments if a.status == 'Confirmed']
        if confirmed_apts:
            notifications.append({
                'id': 'rep-uploaded-confirmed',
                'type': 'info',
                'title': 'Reports Uploaded',
                'message': 'Your medical reports are securely uploaded. The doctor can now review them. Next Step: You can securely message the doctor in the Chat section if you have early questions.',
                'timestamp': reports[-1].created_at.isoformat()
            })
        else:
            notifications.append({
                'id': 'rep-uploaded-no-apt',
                'type': 'info',
                'title': 'Reports Uploaded',
                'message': 'Your medical reports are securely uploaded. Next Step: Go to Appointments and book a consultation with a specialist so they can review your records.',
                'timestamp': reports[-1].created_at.isoformat()
            })
        
    # Sort by timestamp descending
    notifications.sort(key=lambda x: x['timestamp'], reverse=True)
    return jsonify(notifications), 200


