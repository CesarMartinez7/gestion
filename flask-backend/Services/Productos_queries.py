from utils.save import save_changes
import os
from models.productos import Productos
from models.historial_cambios_productos import HistorialCambiosProducto

activo = 1
inactivo = 2    

class ProductosQuery:

    @staticmethod
    def obtener_productos():
        return Productos.query.filter_by(estado=activo).all()

    @staticmethod
    def crear_producto(valores_productos):
        producto = Productos(
            nombre=valores_productos["nombre"],
            descripcion=valores_productos["descripcion"],
            cantidad=valores_productos["cantidad"],
            precio=valores_productos["precio"],
            id_categoria=valores_productos["id_categoria"],
            imagenes=valores_productos["imagenes"]
            
        )
        print(producto)
        save_changes(producto)
        registro = HistorialCambiosProducto(id_producto=producto.id_producto,nombre=valores_productos["nombre"], descripcion=valores_productos["descripcion"], cantidad=valores_productos["cantidad"], precio=valores_productos["precio"], estado=activo, imagenes=valores_productos["imagenes"])
        save_changes(registro)

    @staticmethod
    def actualizar_producto(valores_productos):
        producto = Productos.query.filter_by(id_producto=valores_productos["id_producto"]).first()

        if valores_productos["nombre"]:
            producto.nombre = valores_productos["nombre"]
        if valores_productos["descripcion"]:
            producto.descripcion = valores_productos["descripcion"]
        if valores_productos["cantidad"]:
            producto.cantidad = valores_productos["cantidad"]
        if valores_productos["precio"]:
            producto.precio = valores_productos["precio"]
        registro = HistorialCambiosProducto(id_producto=valores_productos["id_producto"], nombre=producto.nombre, descripcion=producto.descripcion, cantidad=producto.cantidad, precio=producto.precio, estado=producto.estado)
        save_changes(registro)

    @staticmethod
    def cambiar_estado_producto(valores_productos):
        producto = Productos.query.filter_by(id_producto=valores_productos["id_producto"]).first()
        
        if producto.estado == activo:
            producto.estado = inactivo
        elif producto.estado == inactivo:
            producto.estado = activo
        registro = HistorialCambiosProducto(id_producto=valores_productos["id_producto"], nombre=producto.nombre, descripcion=producto.descripcion, cantidad=producto.cantidad, precio=producto.precio, estado=producto.estado)
        save_changes(registro)