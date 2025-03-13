import os
from utils.auth import require_auth
from utils.respuestas import respuesta_fail
from flask import Blueprint, request, jsonify
from Services.Productos_queries import ProductosQuery
from utils.respuestas import respuesta_created, respuesta_success
from utils.Validaciones_productos import validaciones_ingresar_productos, cambiar_estado_productos

productos = Blueprint('productos', __name__)

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@productos.route('/productos', methods=['GET'])

def obtener_productos():
    producto = ProductosQuery.obtener_productos()
    productos_lista = [
        {
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'cantidad': producto.cantidad,
            'precio': producto.precio,
            'id_categoria': producto.id_categoria,
            'id_producto': producto.id_producto,
            'imagenes': producto.imagenes
        } for producto in producto
    ]
    return respuesta_success(productos_lista)

@productos.route('/ingresar_productos', methods=['POST'])

def ingresar_producto():
    try:
        valores_productos = {
            "nombre": request.json["nombre"],
            "descripcion": request.json["descripcion"],
            "cantidad": request.json["cantidad"],
            "precio": request.json["precio"],
            "id_categoria": request.json["id_categoria"],
            "imagenes": request.json["imagenes"]
        }

        
        validacion = validaciones_ingresar_productos(valores_productos)
        if validacion:
            return respuesta_fail(validacion)
        ProductosQuery.crear_producto(valores_productos)
        return respuesta_created("Producto creado con éxito")
    except Exception as e:
        return jsonify(str(e)), 400
    


    


@productos.route('/actualizar_productos', methods=['PUT'])

def actualizar_producto():
    try:
        valores_productos = {
            "id_producto": request.json["id_producto"],
            "nombre": request.json["nombre"],
            "descripcion": request.json["descripcion"],
            "cantidad": request.json["cantidad"],
            "precio": request.json["precio"],
            

           
        }
        
        ProductosQuery.actualizar_producto(valores_productos)
        return respuesta_success("Producto actualizado con éxito")
    except Exception as e:
        return jsonify(str(e)), 400
    

@productos.route('/cambiar_estado_productos', methods=['PUT'])

def cambiar_estado_producto():
    try:
        valores_productos = {
            "id_producto": request.json["id_producto"],
            "estado": request.json["estado"],
        }
        validacion = cambiar_estado_productos(valores_productos)
        if validacion:
            return respuesta_fail(validacion)
            
        ProductosQuery.cambiar_estado_producto(valores_productos)
        return respuesta_success("Estado del producto actualizado con éxito")
    except Exception as e:
        return jsonify(str(e)), 400







