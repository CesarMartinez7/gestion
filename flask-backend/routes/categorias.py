from utils.auth import require_auth
from flask import Blueprint, request, jsonify
from Services.Categorias_queries import CategoriasQuery
from utils.respuestas import respuesta_success, respuesta_fail, respuesta_no_encontrado, respuesta_created, respuesta_conflicto
from utils.Validaciones_categorias import validaciones_ingresar_categorias, si_existe_categoria, validaciones_actualizar_categorias, si_existe_categoria_por_id, validaciones_cambiar_estado_categorias

categorias = Blueprint('categorias', __name__)


@categorias.route('/categorias', methods=['GET'])
@require_auth
def obtener_Categorias():
    categoria = CategoriasQuery.obtener_categorias()
    categorias_lista = [
        {
            'nombre': categoria.nombre,
            'descripcion': categoria.descripcion,
            'id_categoria': categoria.id_categoria,
            
        } for categoria in categoria
    ]
    return respuesta_success(categorias_lista)

@categorias.route('/ingresar_categorias', methods=['POST'])
@require_auth
def ingresar_categoria():
    try:
        valores_categorias = {
            "nombre": request.json["nombre"],
            "descripcion": request.json["descripcion"],
        }
        validacion = validaciones_ingresar_categorias(valores_categorias)
        if validacion :
            return respuesta_fail(validaciones_ingresar_categorias(valores_categorias))
        
        existe = si_existe_categoria(valores_categorias)
        if existe:
            return respuesta_conflicto("La categoría ya existe") 
        
        CategoriasQuery.crear_categoria(valores_categorias)
        return respuesta_created("Categoría creada con éxito")
    except Exception as e:
        return jsonify(str(e)), 400
@categorias.route('/actualizar_categorias', methods=['PUT'])	
@require_auth
def actualizar_categoria():
    try:
        valores_categorias = {
            "id_categoria": request.json["id_categoria"],
            "nombre": request.json["nombre"],
            "descripcion": request.json["descripcion"],
        }
        validacion = validaciones_actualizar_categorias(valores_categorias)
        if validacion:
            return respuesta_fail(validacion)
        
        existe = si_existe_categoria_por_id(valores_categorias)
        if not existe:
            return respuesta_no_encontrado("La categoría no existe")
        
        CategoriasQuery.actualizar_categoria(valores_categorias)

        return respuesta_success("Categoría actualizada con éxito")
    except Exception as e:
        return jsonify(str(e)), 400
    


@categorias.route('/cambiar_estado_categorias', methods=['PUT'])
@require_auth

# Cambiar estado de la categoria

def cambiar_estado_categoria():
    try:
        valores_categorias = {
            "id_categoria": request.json["id_categoria"],
            "estado": request.json["estado"],
        }
        validacion = validaciones_cambiar_estado_categorias(valores_categorias)
        if validacion:
            return respuesta_fail(validacion)
        
        existe = si_existe_categoria_por_id(valores_categorias)
        if not existe:
            return respuesta_no_encontrado("La categoría no existe")
        
        CategoriasQuery.cambiar_estado_categoria(valores_categorias)
        return respuesta_success("Estado cambiado con éxito")
    except Exception as e:
        return jsonify(str(e)), 400




