import React, { useEffect, useRef, useState } from "react";
import { Data } from "../types/productos";
import BreadCumbs from "../ui/breadcumbs";
import { Icon } from "@iconify/react";
import Loading from "../ui/loading";
import ProductosHooks from "../hooks/productos";
import { motion } from "framer-motion";
import { Response } from "../types/response";


interface UpdateProductos {
  id_producto: number;
  descripcion: string | undefined;
  nombre: string | undefined;
  precio: number | bigint;
  cantidad: number | bigint;
}




const traerCategorias = async () => {
  const response = await fetch("http://127.0.0.1:5000/categorias")
  const data = await response.json()
  console.log(data)
}



export default function Productos({ name }: { name: string }) {
  const [
    isBig,
    setIsBig,
    dataProductos,
    setDataProductos,
    isOpen,
    setIsOpen,
    handleSubmitCreate,
    inputRefNombre,
    inputRefDescripcion,
    inputRefID_Categoria,
    inputRefImagenes,
    inputRefPrecio,
    inputRefCantidad,

  ] = ProductosHooks();



  const [selectOption, setSelectOption] = useState<string | number>("")

  const [dataCategorias, setDataCategorias] = useState<Response>()

  const traerCategorias = async () => {
    const response = await fetch("http://127.0.0.1:5000/categorias")
    const data = await response.json()
    if (data) {
      console.log(data)
      setDataCategorias(data)
    }
  }




  const handleClickUpdate = (object: UpdateProductos) => {
    fetch("http://127.0.0.1:5000/actualizar_productos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productos")
      .then((response) => response.json())
      .then((pedidos) => setDataProductos(pedidos));
  }, []);

  // Traer los datos para ver las categorias disponibles ....... cdfdfdffdf
  useEffect(() => {
    traerCategorias()
  }, [isOpen])


  if (!dataProductos) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
           <div className=" fixed w-full h-full grid place-items-center ">
          <div>dsfsf</div>
        </div>
          <motion.div
            className="bg-base-100 w-lg h-fit p-6 rounded-xl"
            whileInView={{ scale: 1 }}
            initial={{ scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="justify-end flex">
              <button
                className="btn btn-circle btn-sm btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <h1 className="font-bold text-xl">Crear {name}</h1>
            <form
              className="w-full"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                const datosFomularios = new FormData()
                console.log(datosFomularios)
                if (
                  inputRefCantidad.current?.value &&
                  inputRefDescripcion.current?.value &&
                  inputRefPrecio.current?.value &&
                  inputRefNombre.current?.value &&
                  inputRefImagenes.current?.files

                ) {
                  datosFomularios.append("nombre", inputRefNombre.current.value)
                  datosFomularios.append("cantidad", inputRefCantidad.current.value)
                  datosFomularios.append("descripcion", inputRefDescripcion.current.value)
                  datosFomularios.append("precio", inputRefPrecio.current.value)
                  datosFomularios.append("id_categoria", selectOption)
                  const imagen = inputRefImagenes.current.files[0]
                  console.log(imagen)

                  if (imagen) {
                    datosFomularios.append("imagenes", imagen)
                  }
                  console.log("Campos rellenados correctamente")
                }

                // Codigo aqui de las partes del FETCH 

                fetch("http://127.0.0.1:5000/ingresar_productos", {
                  method: "POST",
                  body: datosFomularios, // Pasar FormData en el cuerpo de la solicitud
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Producto creado:", data);
                  })
                  .catch((error) => {
                    console.error("Error al crear producto:", error);
                  });

                console.log(datosFomularios)

              }}
            >
              <div className="flex gap-2 flex-col">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend" >Nombre</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Nombre"
                    defaultValue={"Prueba react"}
                    ref={inputRefNombre}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Descripcion</legend>
                  <input
                    defaultValue={"Prueba REACT"}
                    type="text"
                    className="input w-full"
                    placeholder="Descripcion"
                    ref={inputRefDescripcion}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Cantidad</legend>
                  <input
                    defaultValue={"Prueba REACT"}
                    type="number"
                    className="input w-full"
                    placeholder="Cantidad"
                    ref={inputRefCantidad}
                  />
                </fieldset>
                <label for="categorias" className="fieldset fieldset-legend">Categorias disponibles ⬇️ </label>
                <select name="categorias" id="categorias" value={selectOption} className="btn w-full" >

                  {dataCategorias?.data.map((miniCategoria) => (
                    <option value={`${miniCategoria.id_categoria}`} className="btn" onClick={() => {
                      setSelectOption(miniCategoria.id_categoria)
                    }}>{miniCategoria.nombre}</option>

                  ))}
                </select>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Precio</legend>
                  <input
                    defaultValue={"Prueba REACT"}
                    type="number"
                    className="input w-full"
                    placeholder="Precio"
                    ref={inputRefPrecio}
                  />
                </fieldset>


                <div className="flex items-center justify-center w-full">
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm "><span className="font-semibold">Click para Cargar Imagen</span> or drag and drop</p>
                      <p className="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" ref={inputRefImagenes} />
                  </label>
                </div>

                <input
                  type="submit"
                  className="w-full btn btn-neutral"
                  value={"Guardar"}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      <main className="gap-2 md:px-8">
        <BreadCumbs Rutas={Rutas} />
        <h3 className="font-bold text-xl">{name}</h3>
        <div className="flex justify-end w-full gap-2">
          <button
            className="btn btn-neutral btn-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            Crear {name}
          </button>
          <button
            className="btn-sm btn"
            onClick={() => setIsBig(!isBig)}
          >
            {isBig ? "Maximizar" : "Minimizar"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className={`table ${isBig ? "table-sm" : "table-xs"}`}>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th className="flex items-center">
                  <Icon icon="lucide:dollar-sign" width="14" height="14" />
                  Precio
                </th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {dataProductos?.data.map((item, index) => (
                <Table
                  key={index}
                  index={index}
                  Item={item}
                  handleUpdateProducto={handleClickUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const Table = ({
  Item,
  index,
  handleUpdateProducto,
}: {
  Item: Data;
  index: number;
  handleUpdateProducto: (object: UpdateProductos) => void;

}) => {

  const [isOpenDeletePopover,setIsOpenDeletePopover] = useState<boolean>(false)
  const inputRefNombreUpdate = useRef<HTMLInputElement>(null)
  const inputRefCantidadUpdate = useRef<HTMLInputElement>(null)
  const inputRefPrecioUpdate = useRef<HTMLInputElement>(null)
  const inputRefImagenesUpdate = useRef<HTMLInputElement>(null)
  const inputRefDescripcionUpdate = useRef<HTMLInputElement>(null)


  return (
    <tr>
      <th>{index + 1}</th>
      <td className="font-bold uppercase">{Item.nombre}</td>
      <td>{Item.descripcion}</td>
      <td>{Item.cantidad}</td>
      <td className="font-bold"> ${Item.precio}</td>
      <td className="font-bold gap-2 flex w-full justify-end">
        <button
          className="btn btn-soft btn-info btn-sm"
          onClick={() =>
            //@ts-ignore
            document.getElementById(`my_modal_${index}`)?.showModal()
          }
        >
          Actualizar
        </button>
        <dialog id={`my_modal_${index}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg uppercase">{Item.nombre}</h3>
            <p className="py-4">{Item.descripcion}</p>
            <form
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                if (inputRefCantidadUpdate && inputRefDescripcionUpdate && inputRefImagenesUpdate && inputRefNombreUpdate && inputRefPrecioUpdate) {

                  console.log(inputRefDescripcionUpdate.current?.value, inputRefCantidadUpdate, inputRefNombreUpdate, inputRefPrecioUpdate)

                  handleUpdateProducto({
                    id_producto: Item.id_producto,
                    nombre: inputRefNombreUpdate.current?.value,
                    descripcion: inputRefDescripcionUpdate.current?.value,
                    precio: Number(inputRefPrecioUpdate.current?.value),
                    cantidad: Number(inputRefCantidadUpdate.current?.value),
                  });
                }
              }}
            >
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Descripcion"
                />
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Cantidad"
                />
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Precio"
                />
                <div className="flex items-center justify-center w-full">
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm "><span className="font-semibold">Click para Cargar Imagen</span> or drag and drop</p>
                      <p className="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>

                <input type="submit" className="btn w-full btn-neutral" />
              </div>
            </form>
          </div>
        </dialog>


        
       

        <button className="btn btn-soft btn-error btn-sm" onClick={
          () => {
            fetch("http://127.0.0.1:5000/cambiar_estado_productos", {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({id_producto: Item.id_producto , estado: 2})
            })
          }}  >Eliminar</button>

          
      </td>
    </tr>
  );
};

const Rutas = [
  {
    nombre: "Tabla",
    to: "tablas",
  },
  {
    nombre: "Productos",
    to: "categoria",
  },
];
