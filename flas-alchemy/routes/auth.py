from flask import Blueprint, request, jsonify
from Services.auth_queries import  login_user
from utils.db import db
from utils.respuestas import respuesta_fail, respuesta_no_autorizado, respuesta_success

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return respuesta_fail("Usuario y contraseña requeridos")

    session = db.session
    token, error = login_user(session, username, password)

    if error:
        return respuesta_no_autorizado(error)

    return respuesta_success(token)


