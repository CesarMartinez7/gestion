from utils.db import db
from datetime import datetime
from models.pedidos import Pedidos  
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, String, DateTime
from models.historial_cambios_productos import HistorialCambiosProducto  

class Productos(db.Model):
    __tablename__ = 'productos'

    id_producto = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    cantidad = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Numeric(11,2), nullable=False)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)
    estado = db.Column(db.Integer, default=1, nullable=False)
    imagenes = db.Column(db.String(255), nullable=True)
    categoria = relationship("Categorias", back_populates="productos")
    historial_cambios = db.relationship("HistorialCambiosProducto", back_populates="producto", cascade="all, delete-orphan")
    pedidos = db.relationship("Pedidos", back_populates="producto")

