import { useEffect, useState, useRef } from "react";
import { Response } from "../types/response";
import { Data } from "../types/response";

export default function Categorias() {
  const [data, setData] = useState<Response>();
  const inputRefDescripcion = useRef<HTMLInputElement>(null);
  const inputRefNombre = useRef<HTMLInputElement>(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);


  const handleClickDelete = ({id_categoria, estado } : {id_categoria: number, estado: number}) => {
    fetch("http://127.0.0.1:5000/cambiar_estado_categorias", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",  // Asegúrate de que el servidor sepa que el cuerpo es JSON
      },
      body: JSON.stringify({
        estado: estado,
        id_categoria: id_categoria
      }),
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }

  // Función para actualizar las categorías
  const handleUpdateCategoria = (object: Data) => {
    fetch("http://127.0.0.1:5000/actualizar_categorias", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",  // Asegúrate de que el servidor sepa que el cuerpo es JSON
      },
      body: JSON.stringify({
        nombre: object.nombre,
        descripcion: object.descripcion,
        id_categoria: object.id_categoria,
      }),
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  };

  // Petición para cargar las categorías
  useEffect(() => {
    fetch("http://127.0.0.1:5000/categorias")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Si tenemos data, renderizamos
  if (data) {
    return (
      <main className="flex flex-col gap-2">
        <div className="flex justify-end">
          <button className="btn">Crear Categoria</button>
        </div>
        <div className="flex gap-2 flex-col">
          {data.data.map((item, index) => (
            <div key={index} className="flex flex-row rounded-md p-3 border  justify-between">
              <div>
                <p className="font-semibold text-xl uppercase">{item.nombre}</p>
                <p className="font-light text-xs">{item.descripcion}</p>
              </div>
              <div className="flex flex-row gap-2">
                <div>
                  <button className="btn btn-neutral" onClick={() => {
                   handleClickDelete({id_categoria: item.id_categoria, estado: 2}) 
                  }} >Eliminar</button>
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={() => setSelectedCategoryIndex(index)}
                  >
                    Actualizar
                  </button>

                  {/* Modal para actualizar la categoría */}
                  {selectedCategoryIndex !== null && (
                    <dialog open className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => setSelectedCategoryIndex(null)}
                          >
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
                              if (
                                inputRefDescripcion.current?.value &&
                                inputRefNombre.current?.value
                              ) {
                                handleUpdateCategoria({
                                  descripcion: inputRefDescripcion.current?.value,
                                  id_categoria: item.id_categoria,
                                  nombre: inputRefNombre.current?.value,
                                });
                                setSelectedCategoryIndex(null); // Cierra el modal después de actualizar
                              }
                            }}
                          >
                            <input
                              ref={inputRefNombre}
                              type="text"
                              defaultValue={item.nombre}
                              className="input w-full"
                            />
                            <input
                              ref={inputRefDescripcion}
                              type="text"
                              defaultValue={item.descripcion}
                              className="input w-full"
                            />
                            <button className="btn btn-neutral">Enviar</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}
