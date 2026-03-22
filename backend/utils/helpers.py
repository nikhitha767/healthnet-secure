def serialize_report(report):
    return {
        'id': report.id,
        'user_id': report.user_id,
        'report_name': report.report_name,
        'file_path': report.file_path,
        'created_at': report.created_at.isoformat() if report.created_at else None
    }

def serialize_message(message):
    return {
        'id': message.id,
        'sender_id': message.sender_id,
        'receiver_id': message.receiver_id,
        'message': message.message,
        'timestamp': message.timestamp.isoformat() if message.timestamp else None
    }

def serialize_alert(alert):
    return {
        'id': alert.id,
        'user_id': alert.user_id,
        'alert_type': alert.alert_type,
        'severity': alert.severity,
        'created_at': alert.created_at.isoformat() if alert.created_at else None
    }

def serialize_user(user):
    return {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'is_blocked': user.is_blocked
    }
