import {useState,useEffect } from "react"
import { Response } from "../types/productos";


export default function ProductosHooks () { 

    const [dataProductos] = useState<Response>()

    useEffect(() => {
        fetch("http://127.0.0.1:5000/productos")
          .then((reponse) => reponse.json())
          .then((pedidos) => console.log(pedidos));
      });
    return(
        <main  >
            <div className="bg-amber-200">  
                {dataProductos?.data.map((item) => (
                    <div>
                        <h3>{item.nombre}</h3>

                    </div>
                ))}
            </div>
        </main>
    )
}