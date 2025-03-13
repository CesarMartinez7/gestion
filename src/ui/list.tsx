
import { Categoria } from "../types/response"

export default function List(){
    
    return(
        <div className="flex flex-row rounded-md p-3 border border-zinc-900 justify-between">
            <div>
                <p className="font-semibold text-xl">Lorem ipsum dolor, sit amet.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, consequuntur?</p>
            </div>
            <div></div>
            <div className="flex flex-row gap-2">
                <div>
                        <button className="btn btn-neutral">Eliminar</button>
                </div>
                <div>
                    <button className="btn btn-primary">Actualizar</button>
                </div>
            </div>
        </div>
    )
}