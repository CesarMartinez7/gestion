import { useRef, useState } from "react";
import { Response } from "../types/productos";

type ReturnProductos = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    Response | undefined,
    React.Dispatch<React.SetStateAction<Response | undefined>>,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    (objectData: CreacionProducto) => void,  // Cambiar aquí
    React.RefObject<HTMLInputElement | null>,
    React.RefObject<HTMLInputElement | null>,
    React.RefObject<HTMLInputElement | null>,
    React.RefObject<HTMLInputElement | null>,
    React.RefObject<HTMLInputElement | null>,
    React.RefObject<HTMLInputElement | null>,
];


export interface CreacionProducto {
    nombre: string;
    descripcion: string;
    cantidad: number | bigint;
    precio: bigint | number;
    id_categoria: number;
    imagenes: string | null | undefined;
}

export default function ProductosHooks(): ReturnProductos {
    // Referencias InputElements para el formulario
    const inputRefNombre = useRef<HTMLInputElement | null>(null);
    const inputRefDescripcion = useRef<HTMLInputElement | null>(null);
    const inputRefPrecio = useRef<HTMLInputElement | null>(null);
    const inputRefID_Categoria = useRef<HTMLInputElement | null>(null);
    const inputRefImagenes = useRef<HTMLInputElement | null>(null);
    const inputRefCantidad = useRef<HTMLInputElement | null>(null);

    const [dataProductos, setDataProductos] = useState<Response | undefined>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isBig, setIsBig] = useState<boolean>(false);

    const handleSubmitCreate = (objectData: CreacionProducto) => {
        // Prepare the data to send in the body
        const formData = {
            nombre: objectData.nombre,
            descripcion: objectData.descripcion,
            cantidad: objectData.cantidad,
            precio: objectData.precio,
            id_categoria: objectData.id_categoria, // ensure the id_categoria is included
        };

        fetch("http://127.0.0.1:5000/ingresar_productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al crear el producto.");
                }
                return response.json();
            })
            .then((data) => {
                setDataProductos(data); // assuming the response returns product data
                setIsOpen(false); // Close form or modal after successful submission
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error (showing an alert, setting error state, etc.)
            });
    };

    return [
        isBig,
        setIsBig,
        dataProductos,
        setDataProductos,
        isOpen,
        setIsOpen,
        handleSubmitCreate,
        inputRefDescripcion,
        inputRefID_Categoria,
        inputRefNombre,
        inputRefImagenes,
        inputRefPrecio,
        inputRefCantidad,
    ];
}
