export interface Response {
    data: Data[]
    message: string
    status: number
    success: boolean

}


export interface Data {
    cantidad: number
    descripcion: string
    id_categoria: number
    id_producto: number
    imagenes: null | undefined
    nombre: string
    precio: bigint
}