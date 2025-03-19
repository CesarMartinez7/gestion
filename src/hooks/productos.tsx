import React, { RefObject, useRef, useState } from "react";
import { Response } from "../types/productos";




interface RetornoProductos2  {
    isBig: boolean
    dataProductos: Response | undefined
    inputRefNombre: RefObject<HTMLInputElement | null>
    setDataProductos: React.Dispatch<React.SetStateAction<Response | undefined>>
    inputRefDescripcion : RefObject<HTMLInputElement | null>
    inputRefPrecio : RefObject<HTMLInputElement | null>
    inputRefID_Categoria : RefObject<HTMLInputElement | null>
    inputRefImagenes : RefObject<HTMLInputElement | null>
    inputRefCantidad: RefObject<HTMLInputElement | null> 
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsBig: React.Dispatch<React.SetStateAction<boolean>>


}


export interface CreacionProducto {
    nombre: string;
    descripcion: string;
    cantidad: string;
    precio: string;
    id_categoria: string;
    imagenes: Blob;
}

export default function ProductosHooks(): RetornoProductos2 {
    // Referencias InputElements para el formulario
    const inputRefNombre = useRef<HTMLInputElement | null>(null);
    const inputRefDescripcion = useRef<HTMLInputElement | null>(null);
    const inputRefPrecio = useRef<HTMLInputElement | null>(null);
    const inputRefID_Categoria = useRef<HTMLInputElement | null>(null);
    const inputRefImagenes = useRef<HTMLInputElement >(null);
    const inputRefCantidad = useRef<HTMLInputElement | null>(null);

    const [dataProductos, setDataProductos] = useState<Response | undefined>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isBig, setIsBig] = useState<boolean>(false);

    
    return {isBig: isBig, dataProductos: dataProductos,setDataProductos: setDataProductos,inputRefDescripcion: inputRefDescripcion, setIsBig: setIsBig, isOpen: isOpen, setIsOpen: setIsOpen,inputRefCantidad: inputRefCantidad,inputRefImagenes: inputRefImagenes, inputRefPrecio: inputRefPrecio, inputRefID_Categoria: inputRefID_Categoria,inputRefNombre: inputRefNombre}
}
