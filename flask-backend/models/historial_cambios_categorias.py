from utils.db import db
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, String, DateTime

class HistorialCambiosCategoria(db.Model):
    __tablename__ = 'historial_cambios_categoria'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Integer, nullable=False)
    fecha = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)

    categoria = db.relationship("Categorias", back_populates="historial_cambios")
