from utils.save import save_changes
from models.categorias import Categorias
from models.historial_cambios_categorias import HistorialCambiosCategoria

activo = 1
inactivo = 2
class CategoriasQuery:
    
    @staticmethod
    def obtener_categorias():
        return Categorias.query.filter_by(estado=activo).all()
    
    @staticmethod
    def crear_categoria(valores_categorias):
        categoria = Categorias(nombre=valores_categorias["nombre"], descripcion=valores_categorias["descripcion"], estado=activo)
        save_changes(categoria)
        registro = HistorialCambiosCategoria(id_categoria=categoria.id_categoria, nombre=valores_categorias["nombre"], descripcion=valores_categorias["descripcion"], estado=activo) 
        save_changes(registro)

    @staticmethod
    def actualizar_categoria(valores_categorias):
        categoria = Categorias.query.filter_by(id_categoria=valores_categorias["id_categoria"]).first()
        if valores_categorias["nombre"]:
            categoria.nombre = valores_categorias["nombre"]
        if valores_categorias["descripcion"]:
            categoria.descripcion = valores_categorias["descripcion"]
        registro = HistorialCambiosCategoria(id_categoria=valores_categorias["id_categoria"], nombre=categoria.nombre, descripcion=categoria.descripcion, estado=categoria.estado)
        save_changes(registro)
    
    @staticmethod
    def cambiar_estado_categoria(valores_categorias):
        categoria = Categorias.query.filter_by(id_categoria=valores_categorias["id_categoria"]).first()
        registro = HistorialCambiosCategoria(id_categoria=valores_categorias["id_categoria"], nombre=categoria.nombre, descripcion=categoria.descripcion, estado=valores_categorias["estado"])
        if categoria.estado == activo:  
            categoria.estado = inactivo  
        elif categoria.estado == inactivo:  
            categoria.estado = activo
        save_changes(registro)
        
