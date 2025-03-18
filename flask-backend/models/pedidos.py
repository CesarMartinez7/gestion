from utils.db import db
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, String, DateTime

class Pedidos(db.Model):
    __tablename__ = 'pedidos'

    id_pedido = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fecha_pedido = db.Column(db.DateTime, nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id_producto'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    precio_unitario = db.Column(db.Numeric(10,2), nullable=False)
    total = db.Column(db.Numeric(10,2), nullable=False)
    estado = db.Column(db.Integer, default=3, nullable=False)
    
    producto = db.relationship("Productos", back_populates="pedidos")
    historial_cambios = db.relationship("HistorialCambiosPedidos", back_populates="pedido", cascade="all, delete-orphan")