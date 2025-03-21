import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Data } from "../types/productos";
import BreadCumbs from "../ui/breadcumbs";
import { Icon } from "@iconify/react";
import Loading from "../ui/loading";
import ProductosHooks from "../hooks/productos";
import { motion } from "framer-motion";
import { Response } from "../types/response";
import NotData from "../ui/notdata";


interface UpdateProductos {
  id_producto: number;
  descripcion: string | undefined;
  nombre: string | undefined;
  precio: number | bigint;
  cantidad: number | bigint;
}



export default function Productos({ name, token }: { name: string, token: string }) {
  const { inputRefCantidad, inputRefDescripcion, inputRefImagenes, inputRefNombre, isBig, isOpen, setIsOpen, setDataProductos, setIsBig, dataProductos, inputRefPrecio } = ProductosHooks();

  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const [responseIsOk, setResponseIsOk] = useState<boolean>(false);
  const [responseIsError, setResponseIsError] = useState<boolean>(false)

  const [selectOption, setSelectOption] = useState<string>("63")

  const [dataCategorias, setDataCategorias] = useState<Response>()

  const traerCategorias = async () => {
    const response = await fetch("http://127.0.0.1:5000/categorias",{
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (data) {
      console.log(data)
      setDataCategorias(data)
    }
  }

  // Codigo para actualizar la parte de code

  const handleClickUpdate = (object: UpdateProductos) => {
    const updatedObject = { ...object };

    // Si algún campo es undefined o null,  lo limpio
    if (updatedObject.descripcion === undefined) updatedObject.descripcion = "";
    if (updatedObject.nombre === undefined) updatedObject.nombre = "";
    if (updatedObject.precio === undefined) updatedObject.precio = 0;
    if (updatedObject.cantidad === undefined) updatedObject.cantidad = 0;

    fetch("http://127.0.0.1:5000/actualizar_productos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(updatedObject),
    }).then((response) => console.dir(response));

    setIsSubmit(!isSubmit);
  };


  // Fetch de la interfaz productos fetch total

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productos",{
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((pedidos) => setDataProductos(pedidos));
  }, [isSubmit]);

  // Traer Categorias cuando se abra el isOpen o la modal DSF

  useEffect(() => {
    traerCategorias()
  }, [isOpen, isSubmit])



  useEffect(() => {
    if (responseIsOk) {
      setTimeout(() => {
        setResponseIsOk(false);
      }, 5000); // Desaparece después de 3 segundos
    }
  }, [responseIsOk]);


  useEffect(() => {
    if (responseIsError) {
      setTimeout(() => {
        setResponseIsError(false);
      }, 5000); // Desaparecer después de 3 segundos
    }
  }, [responseIsError]);


  if (!dataProductos) {
    return <Loading />;
  }

  return (
    <div className="p-4 w-full">


      {responseIsOk && (
        <motion.div className="chat chat-end absolute right-2.5">
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} className="chat-bubble chat-bubble-success font-bold" exit={{ opacity: 0, scale: 0 }}>
            Producto Creado con éxito ✅
          </motion.div>
        </motion.div>
      )}


      {responseIsError && (
        <motion.div className="chat chat-end absolute right-2.5">
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} className="chat-bubble chat-bubble-error font-bold" exit={{ opacity: 0, scale: 0 }}>
            Hubo un error en la creacion del Producto ❌
          </motion.div>
        </motion.div>
      )}


      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div >
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
            <h1 className="font-bold text-2xl">Crear {name}</h1>
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
                  headers: {
                    "Authorization": `Bearer ${token}`
                  },
                  body: datosFomularios, // Pasar FormData en el cuerpo de la solicitud
                })
                  .then((response) => {
                    if (response.ok) {
                      setResponseIsOk(true); // Muestra el mensaje de éxito
                      setIsSubmit(!isSubmit); // Actualiza la data de pedidos
                    } else {
                      setIsSubmit(!isSubmit)
                      setResponseIsError(true)
                      console.log(response.json())
                    }
                  })
                  .then(() => {
                    setIsSubmit(!isSubmit)
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
                    className="input-sm input w-full"
                    placeholder="Nombre"

                    ref={inputRefNombre}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Descripcion</legend>
                  <input

                    type="text"
                    className="input-sm input w-full"
                    placeholder="Descripcion"
                    ref={inputRefDescripcion}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Cantidad</legend>
                  <input

                    type="number"
                    className="input-sm input w-full"
                    placeholder="Cantidad"
                    ref={inputRefCantidad}
                  />
                </fieldset>
                <label htmlFor="categorias" className="fieldset fieldset-legend">Categorias disponibles ⬇️ </label>
                <select name="categorias" id="categorias" value={selectOption} className="btn w-full" >

                  {dataCategorias?.data.map((miniCategoria) => (
                    <option value={`${miniCategoria.id_categoria}`} key={miniCategoria.id_categoria} className="btn" onClick={() => {
                      setSelectOption(miniCategoria.id_categoria)
                    }}>{miniCategoria.nombre}</option>

                  ))}
                </select>
                <label className="input validator w-full">
                  <Icon icon="lucide:circle-dollar-sign" width="20" height="20" />
                  <input type="number" placeholder="1200" required ref={inputRefPrecio} />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>

                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-base-300  border-dashed rounded-lg cursor-pointer  ">
                    <div className="">
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

      <main className="gap-2 md:px-8  relative">
        <BreadCumbs Rutas={Rutas} />
        <h3 className="font-bold text-2xl"> {name}</h3>
        <p className="text-xs text-opacity-100">{` Registros disponibles`} : <span className="text-green-500 font-bold">{`${dataProductos.data.length}`}</span>   </p>
        <div className="flex justify-end w-full gap-2">
          <button
            className="btn btn-neutral btn-sm mb-2"
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

        {dataProductos.data.length === 0 ? (<NotData />) : (<div className="overflow-x-auto rounded-box border border-base-content/5 ">
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
            <tbody className="">
              {dataProductos.data.map((item, index) => (
                <Table
                  isSubmit={isSubmit}
                  setIsSubmit={setIsSubmit}
                  key={index}
                  index={index}
                  Item={item}
                  handleUpdateProducto={handleClickUpdate}
                />
              ))}
            </tbody></table> </div>)}
      </main>
    </div>
  );
}

const Table = ({
  Item,
  index,
  handleUpdateProducto,
  setIsSubmit,
  isSubmit
}: {
  Item: Data;
  index: number;
  handleUpdateProducto: (object: UpdateProductos) => void;
  setIsSubmit: React.Dispatch<SetStateAction<boolean>>;
  isSubmit: boolean

}) => {


  const inputRefNombreUpdate = useRef<HTMLInputElement>(null)
  const inputRefCantidadUpdate = useRef<HTMLInputElement>(null)
  const inputRefPrecioUpdate = useRef<HTMLInputElement>(null)
 
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
            <p className="py-2">{Item.descripcion}</p>
            <form
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                if (inputRefCantidadUpdate.current?.value && inputRefDescripcionUpdate.current?.value && inputRefNombreUpdate.current?.value && inputRefPrecioUpdate.current?.value) {
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
                  defaultValue={Item.nombre}
                  ref={inputRefNombreUpdate}
                  type="text"
                  className="input w-full"
                  placeholder="Nombre"
                />
                <input
                  defaultValue={Item.descripcion}
                  ref={inputRefDescripcionUpdate}
                  type="text"
                  className="input w-full"
                  placeholder="Descripcion"
                />
                <input
                  defaultValue={Item.cantidad}
                  ref={inputRefCantidadUpdate}
                  type="number"
                  className="input w-full"
                  placeholder="Cantidad"
                />
                <input
                  defaultValue={Item.precio}
                  ref={inputRefPrecioUpdate}
                  type="number"
                  className="input w-full"
                  placeholder="Precio"
                />
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
              body: JSON.stringify({ id_producto: Item.id_producto, estado: 2 })
            }).then((response) => {
              if (response.ok) {
                setIsSubmit(!isSubmit)
              }
            }).then((code) => console.log(`Este es la respuesta llamada code${code}`))

          }}>Eliminar</button>

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
