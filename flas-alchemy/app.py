import os
from flask import Flask
from utils.db import db
from routes.pedidos import pedidos
from routes.productos import productos 
from routes.categorias import categorias
from routes.auth import auth_bp
from flask_cors import CORS
from flask import Flask, request, jsonify
from utils.respuestas import respuesta_fail, respuesta_success
import uuid

app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost:3306/alchemy_flask_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

# Habilitar CORS globalmente
CORS(app, resources={r"/*": {
    "origins": "http://localhost:5173", 
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    "allow_headers": ["Content-Type", "Authorization"]
}})

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route("/upload", methods=["POST"])
def upload_file():
    if "imagen" not in request.files:
        return respuesta_fail("No se encontró el archivo")
    file = request.files["imagen"]
    if file.filename == "":
        return respuesta_fail("No se encontró el archivo")
    allowed_extensions = {"png", "jpg", "jpeg", "gif"}
    extension = file.filename.rsplit(".", 1)[-1].lower()
    if extension not in allowed_extensions:
        return respuesta_fail("Extensión de archivo no permitida")
    filename = f"{uuid.uuid4().hex}.{extension}"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)
    image_url = f"http://localhost:5000/static/uploads/{filename}"

    return jsonify({"url": image_url}), 201

# Inicializar la base de datos
db.init_app(app)

# Registrar las rutas
app.register_blueprint(pedidos)
app.register_blueprint(productos)
app.register_blueprint(categorias)
app.register_blueprint(auth_bp)
