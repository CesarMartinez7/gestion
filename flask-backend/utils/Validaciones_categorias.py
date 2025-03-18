from utils import Validaciones
from models.categorias import Categorias

def validaciones_ingresar_categorias(valores_categorias):

    if not valores_categorias["nombre"]:
        return "El nombre de la categoría no puede estar vacío."
    
    if Validaciones.es_solo_numeros(valores_categorias["nombre"]):
        return "El nombre de la categoría no puede ser solo números."
    
    if Validaciones.es_solo_numeros(valores_categorias["descripcion"]):
        return "La descripción de la categoría no puede ser solo números."
    
    if not Validaciones.es_solo_letras(valores_categorias["nombre"]):
        return "El nombre de la categoría solo puede contener letras."

    if Validaciones.tiene_caracteres_especiales(valores_categorias["nombre"]):
        return "El nombre de la categoría no puede contener caracteres especiales."

    if not Validaciones.limite_caracteres(valores_categorias["nombre"], 30):
        return "El nombre de la categoría no puede tener más de 30 caracteres."
    
    if not Validaciones.limite_caracteres(valores_categorias["descripcion"], 255):
        return "La descripción no puede tener más de 255 caracteres."
    return None
    
def validaciones_actualizar_categorias(valores_categorias):

    if not valores_categorias["nombre"] and not valores_categorias["descripcion"]:
        return "El ID y el nombre de la categoría son obligatorios."
    
    if not Validaciones.es_solo_numeros(valores_categorias["id_categoria"]):
        return "El ID de la categoría debe ser un número."
    
    if Validaciones.es_solo_numeros(valores_categorias["nombre"]):
        return "El nombre de la categoría no puede ser solo números."
    
    if Validaciones.es_solo_numeros(valores_categorias["descripcion"]):
        return "La descripción de la categoría no puede ser solo números."
    
    if valores_categorias["nombre"]:
        if not Validaciones.es_solo_letras(valores_categorias["nombre"]):
            return "El nombre solo puede contener letras."
        
        if Validaciones.tiene_caracteres_especiales(valores_categorias["nombre"]):
            return "El nombre no puede contener caracteres especiales."
        
        if not Validaciones.limite_caracteres(valores_categorias["nombre"], 30):
            return "El nombre no puede tener más de 30 caracteres."
        
    if valores_categorias["descripcion"]:
        if not Validaciones.limite_caracteres(valores_categorias["descripcion"], 255):
            return "La descripción no puede tener más de 255 caracteres."
    return None

def validaciones_cambiar_estado_categorias(valores_categorias):

    if "id_categoria" not in valores_categorias or "estado" not in valores_categorias:
        return "El ID y el estado de la categoría son obligatorios."

    if not Validaciones.es_solo_numeros(valores_categorias["id_categoria"]):
        return "El ID de la categoría debe ser un número."

    if not Validaciones.es_solo_numeros(valores_categorias["estado"]):
        return "El estado de la categoría debe ser solo números, 1:Activo, 2:Inactivo."
    
    if validacion_de_estado(valores_categorias) == False:
        return "El estado de la categoría ya está en el estado, No es necesario realizar cambios."
    return None

def si_existe_categoria(valores_categorias):

    existe = Categorias.query.filter_by(nombre=valores_categorias["nombre"]).first()
    if existe: 
        return True
    return None

def si_existe_categoria_por_id(valores_categorias):
    existe = Categorias.query.filter_by(id_categoria=valores_categorias["id_categoria"]).first()
    if existe:
        return True
    return None


def validacion_de_estado(valores_categorias):
    categoria = Categorias.query.filter_by(id_categoria=valores_categorias["id_categoria"]).first()
    estado = int (valores_categorias["estado"])
    if estado == categoria.estado:
        return False
    return None