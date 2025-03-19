
// Limit nombres 30
// Limit Response 255


export interface Data {
	descripcion: string
	id_categoria: string
	nombre: string
}

// Status enum aqui

export interface Response {
	message: string
	status:  number
	data: Data[]
	success: boolean
}


