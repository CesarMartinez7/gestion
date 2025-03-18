from flask import jsonify

def respuesta_success(data=None, message="Operación exitosa", status=200):
    response = {
        "success": True,
        "message": message,
        "data": data,
        "status": status
    }
    return jsonify(response), status

def respuesta_created(data=None, message="Creado con éxito"):
    return respuesta_success(data, message, 201)

def respuesta_fail(message="Error en la solicitud", status=400):
    response = {
        
        "message": message,
        "statusCode": status,
        "success": False
    }
    return jsonify(response), status

def respuesta_no_encontrado(message="Recurso no encontrado"):
    return respuesta_fail(message, status=404)

def respuesta_no_autorizado(message="No autorizado"):
    return respuesta_fail(message, status=401)

def respuesta_error_servidor(message="Error interno del servidor"):
    return respuesta_fail(message, status=500)

def respuesta_conflicto(message="Conflicto en la solicitud"):
    return respuesta_fail(message, status=409)
