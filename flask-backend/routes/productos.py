import os
from utils.auth import require_auth
from utils.respuestas import respuesta_fail
from flask import Blueprint, request, jsonify
from Services.Productos_queries import ProductosQuery
from utils.respuestas import respuesta_created, respuesta_success
from utils.Validaciones_productos import validaciones_ingresar_productos, cambiar_estado_productos

productos = Blueprint('productos', __name__)

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Asegurarte de que la carpeta exista

@productos.route('/productos', methods=['GET'])
def obtener_productos():
    try:
        productos_lista = ProductosQuery.obtener_productos()
        productos_serializados = [
            {
                'nombre': producto.nombre,
                'descripcion': producto.descripcion,
                'cantidad': producto.cantidad,
                'precio': producto.precio,
                'id_categoria': producto.id_categoria,
                'id_producto': producto.id_producto,
                'imagenes': producto.imagenes
            }
            for producto in productos_lista
        ]
        return respuesta_success(productos_serializados)
    except Exception as e:
        return jsonify(str(e)), 400

@productos.route('/ingresar_productos', methods=['POST'])
def ingresar_producto():
    try:
        # Obtener los valores del formulario (texto)
        nombre = request.form.get('nombre')
        descripcion = request.form.get('descripcion')
        cantidad = request.form.get('cantidad')
        precio = request.form.get('precio')
        id_categoria = request.form.get('id_categoria')

        # Validación de los datos de texto
        if not nombre or not descripcion or not cantidad or not precio or not id_categoria:
            return respuesta_fail("Faltan datos necesarios.")

        imagenes = request.files.get('imagenes')  # Obtenemos la imagen

        # Verificar si la imagen fue subida
        if imagenes:
            imagen_filename = imagenes.filename
            imagen_filepath = os.path.join(UPLOAD_FOLDER, imagen_filename)
            imagenes.save(imagen_filepath)
        else:
            imagen_filepath = None

        valores_productos = {
            "nombre": nombre,
            "descripcion": descripcion,
            "cantidad": cantidad,
            "precio": precio,
            "id_categoria": id_categoria,
            "imagenes": imagen_filepath  # Guardamos la ruta de la imagen
        }

        # Crear el producto
        ProductosQuery.crear_producto(valores_productos)

        return respuesta_created("Producto creado con éxito")
    
    except Exception as e:
        return jsonify(str(e)), 400

@productos.route('/actualizar_productos', methods=['PUT'])
def actualizar_producto():
    try:
        # Obtener datos del cuerpo de la solicitud
        valores_productos = {
            "id_producto": request.json.get("id_producto"),
            "nombre": request.json.get("nombre"),
            "descripcion": request.json.get("descripcion"),
            "cantidad": request.json.get("cantidad"),
            "precio": request.json.get("precio"),
        }

        # Validar que los campos esenciales están presentes

        print(valores_productos)


        if not valores_productos["id_producto"]:
            return respuesta_fail("ID del producto es obligatorio.")
        
        ProductosQuery.actualizar_producto(valores_productos)


        return respuesta_success("Producto actualizado con éxito")
    except Exception as e:
        return jsonify(str(e)), 400

@productos.route('/cambiar_estado_productos', methods=['PUT'])
def cambiar_estado_producto():
    try:
        valores_productos = {
            "id_producto": request.json.get("id_producto"),
            "estado": request.json.get("estado"),
        }
        validacion = cambiar_estado_productos(valores_productos)
        if validacion:
            return respuesta_fail(validacion)
            
        ProductosQuery.cambiar_estado_producto(valores_productos)
        return respuesta_success("Estado del producto actualizado con éxito")
    except Exception as e:
        return jsonify(str(e)), 400
