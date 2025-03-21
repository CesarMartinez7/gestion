from flask import Blueprint, request, jsonify
from Services.pedidos_queries import PedidosQuery
from utils.respuestas import respuesta_fail, respuesta_success
from utils.Validaciones_pedidos import validacion_de_actualizar_estado_pedidos, validacion_de_ingresar_pedidos
from utils.auth import require_auth

pedidos = Blueprint('pedidos', __name__)

@pedidos.route('/pedidos', methods=['GET'])
@require_auth
def obtener_pedidos():
    pedidos = PedidosQuery.obtener_pedidos()
    pedidos_lista = [
        {
            'id_pedido': p.id_pedido,
            'id_producto': p.id_producto,
            'cantidad': p.cantidad,
            'estado': p.estado,
            'fecha': p.fecha_pedido
        } for p in pedidos
    ]
    return respuesta_success(pedidos_lista)

@pedidos.route('/cambiar_estado_pedidos', methods=['PUT'])
@require_auth
def cambiar_estado_pedido():
    try:
        valores_pedidos = {
            "id_pedido": request.json["id_pedido"],
            "estado": request.json["estado"]
        }
        
        validacion = validacion_de_actualizar_estado_pedidos(valores_pedidos)
        if validacion:
            return respuesta_fail(validacion)

        error = PedidosQuery.cambiar_estado_pedido(valores_pedidos)
        if error:
            return respuesta_fail(error)	

        return respuesta_success("Estado del pedido actualizado con éxito")
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@pedidos.route('/crear_pedido', methods=['POST'])
@require_auth
def crear_pedido():
    try:
        valores_pedidos = {
            "id_producto": request.json["id_producto"],
            "cantidad": request.json["cantidad"],
        }
        validacion = validacion_de_ingresar_pedidos(valores_pedidos)
        if validacion:
            return respuesta_fail(validacion)
        
        insertar = PedidosQuery.crear_pedido(valores_pedidos)
        PedidosQuery.historial_crear_pedidos(insertar)
        return respuesta_success("Pedido creado con éxito")
    except Exception as e:
        return jsonify({"error": str(e)}), 400
