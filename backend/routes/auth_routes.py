from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from database.models import User, Alert, SystemLog
from database.db import db
from utils.helpers import serialize_user

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password') or not data.get('name') or not data.get('role'):
        return jsonify({'message': 'Missing required fields (email, password, name, role)'}), 400
        
    if data['role'] not in ['patient', 'doctor', 'admin']:
        return jsonify({'message': 'Invalid role specified. Must be patient, doctor, or admin.'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists with this email'}), 409

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,
        role=data['role']
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'message': 'User created successfully',
        'user': serialize_user(new_user)
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    ip_addr = request.remote_addr or '127.0.0.1'
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    
    # 🔴 SECURITY DEMO: If password is wrong or user doesn't exist, log a security alert & system log
    if not user or not check_password_hash(user.password, data['password']):
        # If user email exists but password was wrong, flag it as a Brute Force attempt
        if user:
            alert = Alert(user_id=user.id, alert_type="Suspicious Login Attempt", severity="High")
            syslog = SystemLog(user_id=user.id, action="Login failed (Wrong Password)", ip_address=ip_addr, status="Failed")
            db.session.add(alert)
        else:
            syslog = SystemLog(action=f"Login failed (Unknown Email: {data.get('email')})", ip_address=ip_addr, status="Failed")
            
        db.session.add(syslog)
        db.session.commit()
        return jsonify({'message': 'Invalid credentials'}), 401
    
    if user.is_blocked:
        syslog = SystemLog(user_id=user.id, action="Blocked account login attempt", ip_address=ip_addr, status="Blocked")
        db.session.add(syslog)
        db.session.commit()
        return jsonify({'message': 'Your account has been blocked by an administrator.'}), 403
        
    token = jwt.encode({
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, current_app.config['SECRET_KEY'], algorithm="HS256")
    
    # 🟢 Log Successful Login
    syslog = SystemLog(user_id=user.id, action="User Logged In", ip_address=ip_addr, status="Success")
    db.session.add(syslog)
    db.session.commit()
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': serialize_user(user)
    }), 200
