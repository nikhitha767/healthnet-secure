import os
from flask import Flask, send_from_directory
from config import Config
from database.db import db
from routes.auth_routes import auth_bp
from routes.patient_routes import patient_bp
from routes.doctor_routes import doctor_bp
from routes.admin_routes import admin_bp
from flask_cors import CORS

def create_app(config_class=Config):
    # Initialize Core Application
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize CORS
    CORS(app)

    # Initialize Plugins
    db.init_app(app)

    # Ensure the upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(patient_bp, url_prefix='/api/patient')
    app.register_blueprint(doctor_bp, url_prefix='/api/doctor')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # Basic root endpoint
    @app.route('/', methods=['GET'])
    def index():
        return {
            "message": "Welcome to AI-Driven Secure Digital Health Communication Network API"
        }, 200

    @app.route('/uploads/<path:filename>', methods=['GET'])
    def serve_upload(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    # Ensure tables are created securely before app runs
    with app.app_context():
        # Setup tables - in production you'll use migrations (e.g., Flask-Migrate)
        db.create_all()

    return app

if __name__ == '__main__':
    # Instantiate the application and run it
    app = create_app()
    app.run(debug=True, port=5000)
