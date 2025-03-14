import {useState,useEffect } from "react"
import { Icon } from "@iconify/react/dist/iconify.js";
import { Response } from "../types/productos";


export default function ProductosHooks () { 

    const [dataProductos,setDataProductos] = useState<Response>()

    useEffect(() => {
        fetch("http://127.0.0.1:5000/productos")
          .then((reponse) => reponse.json())
          .then((pedidos) => setDataProductos(pedidos));
      },[]);
    return(
        <main  >
            <div className="flex flex-col gap-2">  
                {dataProductos?.data.map((item) => (
                    <div className="flex flex-row bg-base-200 rounded-md p-3 border-base-200 border justify-between">
                        <div>   
                        <h3 className="uppercase">{item.nombre}</h3>
                        <p className="text-xs uppercase">{item.descripcion}</p>
                        <p className="text-sm">Precio: {item.precio}</p>
                        </div>
                        <div className="flex gap-2 ">
                            <button className="btn btn-primary">Eliminar <Icon icon="fluent-color:dismiss-circle-20" width="20" height="20" /> </button><button className="btn">Actualizar</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}