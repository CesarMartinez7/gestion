from utils.db import db
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, Float, DateTime, CheckConstraint


class HistorialCambiosPedidos(db.Model):
    __tablename__ = 'historial_cambios_pedidos'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.id_pedido', ondelete='CASCADE'), nullable=False)
    fecha_pedido = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    precio_unitario = db.Column(db.Float, nullable=False)
    estado = db.Column(db.Integer, nullable=False, default=3)

    pedido = db.relationship("Pedidos", back_populates="historial_cambios")

