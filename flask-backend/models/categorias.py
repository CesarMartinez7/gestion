from utils.db import db
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, String, DateTime

class Categorias(db.Model):
    __tablename__ = 'categorias'

    id_categoria = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True) 
    estado = db.Column(db.SmallInteger, default=1, nullable=False)

    productos = db.relationship("Productos", back_populates="categoria")
    historial_cambios = db.relationship("HistorialCambiosCategoria", back_populates="categoria")


    