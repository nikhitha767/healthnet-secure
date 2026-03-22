from flask import Blueprint, request, jsonify
from middleware.auth import token_required, roles_required
from database.models import User, Report, Alert, PatientDoctorMapping, SystemLog
from database.db import db
from utils.helpers import serialize_user, serialize_report, serialize_alert

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/users', methods=['GET'])
@token_required
@roles_required('admin')
def get_all_users(current_user):
    # Admin has full access to all users
    users = User.query.all()
    return jsonify([serialize_user(user) for user in users]), 200

@admin_bp.route('/reports', methods=['GET'])
@token_required
@roles_required('admin')
def get_all_reports(current_user):
    # Admin has full access to all reports
    reports = Report.query.all()
    return jsonify([serialize_report(report) for report in reports]), 200

@admin_bp.route('/alerts', methods=['GET'])
@token_required
@roles_required('admin')
def get_all_alerts(current_user):
    # Admin has full access to all alerts
    alerts = Alert.query.all()
    return jsonify([serialize_alert(alert) for alert in alerts]), 200

@admin_bp.route('/users/<int:user_id>/block', methods=['POST'])
@token_required
@roles_required('admin')
def block_unblock_user(current_user, user_id):
    # Admin can Block/unblock users
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
        
    data = request.get_json() or {}
    # Default behavior is to toggle block status if no exact value is provided, but safe default is blocking
    block_status = data.get('blocked', not user.is_blocked)
    
    user.is_blocked = block_status
    db.session.commit()
    
    status_text = "blocked" if block_status else "unblocked"
    return jsonify({'message': f'User securely {status_text}'}), 200

@admin_bp.route('/assign_patient', methods=['POST'])
@token_required
@roles_required('admin')
def assign_patient_to_doctor(current_user):
    # Utility method to facilitate mapping
    data = request.get_json()
    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')
    
    if not patient_id or not doctor_id:
        return jsonify({'message': 'Missing patient_id or doctor_id'}), 400
        
    # Check if assignment already exists
    mapping = PatientDoctorMapping.query.filter_by(patient_id=patient_id, doctor_id=doctor_id).first()
    if mapping:
         return jsonify({'message': 'Assignment already exists'}), 409
         
    # Optional Validation: Check if patient is indeed a patient and doctor is a doctor
    patient = User.query.filter_by(id=patient_id, role='patient').first()
    doctor = User.query.filter_by(id=doctor_id, role='doctor').first()
    
    if not patient or not doctor:
        return jsonify({'message': 'Invalid patient or doctor.'}), 400
         
    new_mapping = PatientDoctorMapping(patient_id=patient_id, doctor_id=doctor_id)
    db.session.add(new_mapping)
    db.session.commit()
    
    return jsonify({'message': 'Patient successfully assigned to the doctor.'}), 201

@admin_bp.route('/logs', methods=['GET'])
@token_required
@roles_required('admin')
def get_all_logs(current_user):
    logs = SystemLog.query.order_by(SystemLog.timestamp.desc()).all()
    result = []
    for log in logs:
        user_name = "System/Unknown"
        if log.user_id:
            u = User.query.get(log.user_id)
            if u:
                user_name = f"{u.name} (Role: {u.role})"
                
        result.append({
            'id': log.id,
            'action': log.action,
            'user': user_name,
            'ip': log.ip_address,
            'status': log.status,
            'timestamp': log.timestamp.isoformat()
        })
    return jsonify(result), 200
