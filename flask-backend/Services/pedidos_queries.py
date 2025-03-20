from models.pedidos import Pedidos
from utils.save import save_changes
from models.productos import Productos
from models.historia_cambios_pedidos import HistorialCambiosPedidos


# 1 : Inactivo
# 2 : Activo
pendiente = 3
en_proceso = 4
entregado = 5
cancelado = 6

estado_nombres = {
    3: "pendiente",
    4: "en_proceso",
    5: "entregado",
    6: "cancelado"
}

class PedidosQuery:
    @staticmethod
    def obtener_pedidos():
        return Pedidos.query.all()
    
    @staticmethod
    def crear_pedido(valores_pedidos):
        pedido = Pedidos(
            id_producto=valores_pedidos["id_producto"],
            cantidad=valores_pedidos["cantidad"],
        )
        producto = Productos.query.filter_by(id_producto=pedido.id_producto).first()
        if not producto:
            return "El producto no existe"
        insertar = Pedidos(id_producto=pedido.id_producto, cantidad=pedido.cantidad,precio_unitario=producto.precio) 
        save_changes(insertar)
        return insertar

    @staticmethod
    def historial_crear_pedidos(insertar):
        registro = HistorialCambiosPedidos(id_pedido=insertar.id_pedido, cantidad=insertar.cantidad, precio_unitario=insertar.precio_unitario, estado=insertar.estado, fecha_pedido=insertar.fecha_pedido, )
        save_changes(registro)      
         
    @staticmethod
    def cambiar_estado_pedido(valores_pedidos):
        pedido = Pedidos.query.filter_by(id_pedido=valores_pedidos["id_pedido"]).first()

        if not pedido:
            return "El pedido no existe"

        estado_actual = int(pedido.estado)  
        nuevo_estado = int(valores_pedidos["estado"])  

        transiciones_validas = {
            pendiente: [en_proceso, cancelado],
            en_proceso: [entregado, cancelado],
            entregado: [],
            cancelado: []
        }

        if nuevo_estado not in transiciones_validas.get(estado_actual, []):
            estado_actual_nombre = estado_nombres.get(estado_actual, estado_actual)
            nuevo_estado_nombre = estado_nombres.get(nuevo_estado, nuevo_estado)
            return f"No se puede cambiar el estado de {estado_actual_nombre} a {nuevo_estado_nombre}. Orden permitido: PENDIENTE -> EN PROCESO -> ENTREGADO/CANCELADO."
        print(pedido.cantidad)
        pedido.estado = nuevo_estado  
        registro = HistorialCambiosPedidos(id_pedido=pedido.id_pedido, cantidad=pedido.cantidad, precio_unitario=pedido.precio_unitario, estado=pedido.estado)
        save_changes(registro)
        return None

