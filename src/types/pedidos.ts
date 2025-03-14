export interface Pedidos {
    data: Data[]
    message: string
    status: number
    success: boolean
  }
  
  export interface Data{
    fecha_pedido: string
    precio_unitario: number
    total: string
    cantidad: number
    estado: number
    fecha: string
    id_pedido: number
    id_producto: number
  }
  