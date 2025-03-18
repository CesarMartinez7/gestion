from functools import wraps
from flask import request, jsonify
from datetime import datetime
from models.session import Session
from utils.db import db

def require_auth(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Token requerido o formato inválido"}), 401

        token = auth_header.split("Bearer ")[1] 

        session = db.session
        user_session = session.query(Session).filter_by(token=token).first()

        if not user_session:
            return jsonify({"error": "Token inválido"}), 401

        if user_session.expires_at < datetime.utcnow():
            return jsonify({"error": "Token expirado"}), 401

        return func(*args, **kwargs)

    return decorated_function