from utils.db import db
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, String, DateTime

class HistorialCambiosProducto(db.Model):
    __tablename__ = 'historial_cambios_producto'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id_producto', ondelete='CASCADE'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255), nullable=True)
    cantidad = db.Column(db.Integer, nullable=True)
    precio = db.Column(db.Float, nullable=True)
    estado = db.Column(db.Integer, nullable=False)
    imagenes = db.Column(db.String(255), nullable=True)
    fecha = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    
    producto = relationship("Productos", back_populates="historial_cambios")