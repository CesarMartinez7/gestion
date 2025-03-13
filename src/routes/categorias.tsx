import { useEffect, useState } from "react";
import { Response } from "../types/response";
import { Data } from "../types/response";

export default function Categorias() {
  const [data, setData] = useState<Response>();

  const handleDeleteCategoria = (object: Data) => {
    fetch("http://127.0.0.1:5000/categorias", {
      method: "POST",
      body: JSON.stringify({
        nombre: object.nombre,  
        descripcion: object.descripcion,
        id_categoria: object.id_categoria,
      }),
    }).then(    );
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/categorias")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (data) {
    return (
      <>
        <div className="flex gap-2 flex-col">
          {data.data.map((item, index) => (
            <div className="flex flex-row rounded-md p-3 border border-zinc-200 justify-between">
              <div>
                <p className="font-semibold text-xl">{item.nombre}</p>
                <p>{item.descripcion}</p>
              </div>
              <div></div>
              <div className="flex flex-row gap-2">
                <div>
                  <button className="btn btn-neutral">Eliminar</button>
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Actualizar
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕{" "}
                        </button>
                      </form>
                      <h3 className="font-bold text-lg uppercase">
                        {item.nombre}
                      </h3>
                      <p className="py-4">{item.descripcion}</p>
                      <div>
                        <form
                          className="flex flex-col gap-2"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleDeleteCategoria(item)
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Descripcion"
                            className="input w-full"
                          />
                          <input
                            type="text"
                            placeholder="Nombre"
                            className="input w-full"
                          />
                          <button className="btn btn-neutral">Enviar</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
