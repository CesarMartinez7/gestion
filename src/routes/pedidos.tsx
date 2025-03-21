import { useState, useEffect, useRef } from "react";
import { Pedidos } from "../types/pedidos";
import { Data } from "../types/pedidos";
import BreadCumbs from "../ui/breadcumbs";
import { Response } from "../types/productos";
import { motion } from "motion/react"

enum Opciones {
  INACTIVO = 1,
  ACTIVO = 2,
  PENDIENTE = 3,
  EN_PROCESO = 4,
  ENTREGADO = 5,
  CANCELADO = 6
}

const FormaterComponente = ({ opciones }: { opciones: Opciones }) => {

  if (opciones === Opciones.ACTIVO) {
    return <h3 className="font-bold">Activo</h3>
  } else if (opciones === Opciones.INACTIVO) {
    return <h3 className="text-zinc-600 font-bold">Inactivo  {Opciones.ACTIVO} </h3>
  } else if (opciones === Opciones.CANCELADO) {
    return <h3 className="text-red-500 font-bold">Cancelado</h3>
  } else if (opciones === Opciones.ENTREGADO) {
    return <h3 className="text-green-500 font-bold">Entregado</h3>
  } else if (opciones === Opciones.PENDIENTE) {
    return <h3 className="text-yellow-500 font-bold">Pendiente  </h3>
  } else if (opciones === Opciones.EN_PROCESO) {
    return <h3 className="text-orange-500 font-bold">En proceso </h3>
  }

}

export default function PedidosComp({token} : {token: string}) {


  const [data, setData] = useState<Pedidos>();
  const [isBig, setIsBig] = useState<boolean>();
  const [dataProductos, setDataProductos] = useState<Response>();
  const [isChangeSubmit, seIsChangeSubmit] = useState<boolean>(false);

  // Manejo de errores en la creacin y elikinacion
  const [responseIsOk, setResponseIsOk] = useState<boolean>(false);
  const [responseIsError, setResponseIsError] = useState<boolean>(false)

  const inputRefCantidad = useRef<HTMLInputElement | null>(null);

  const [idSelect, setIdSelect] = useState<number>(1)

  // Traer los datos de popover de creacion productos

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productos",{
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((pedidos) => setDataProductos(pedidos));
  }, []);


  // Pedidos Fetch principal
  useEffect(() => {
    fetch("http://127.0.0.1:5000/pedidos", {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
      .then((reponse) => reponse.json())
      .then((pedidos) => {
        setData(pedidos);
      });
  }, [isChangeSubmit]);

  // Esto es lo que actualizará el estado de "responseIsOk" a false después de un tiempo (en 3 segundos)


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

  return (
    <div className="flex flex-col gap-2 px-8">
      {responseIsOk && (
        <motion.div className="chat chat-end absolute right-2.5">
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} className="chat-bubble chat-bubble-success font-bold" exit={{ opacity: 0, scale: 0 }}>
            Pedido Creado con éxito ✅
          </motion.div>
        </motion.div>
      )}


      {responseIsError && (
        <motion.div className="chat chat-end absolute right-2.5">
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} className="chat-bubble chat-bubble-error font-bold" exit={{ opacity: 0, scale: 0 }}>
            Hubo un error en la creacion del pedido ❌
          </motion.div>
        </motion.div>
      )}

      <div>
        <BreadCumbs Rutas={Rutas} />
      </div>
      <div>
        <h3 className="font-bold text-2xl">Pedidos</h3>
        <p className="text-xs text-opacity-100">
          {` Registros disponibles`} :{" "}
          <span className="text-green-500 font-bold">{`${data?.data.length}`}</span>{" "}
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <label htmlFor="my_modal_7" className="btn btn-sm btn-neutral">
          Crear pedidos
        </label>

        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Ejecutado creacion");

                if (inputRefCantidad && idSelect) {
                  fetch("http://127.0.0.1:5000/crear_pedido", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization" : `Bearer ${token}`
                    },
                    body: JSON.stringify({
                      id_producto: idSelect,
                      cantidad: inputRefCantidad.current?.value,
                    }),
                  })
                    .then((response) => {
                      if (response.ok) {
                        setResponseIsOk(true); // Muestra el mensaje de éxito
                        seIsChangeSubmit(!isChangeSubmit); // Actualiza la data de pedidos
                      } else {
                        seIsChangeSubmit(!isChangeSubmit)
                        setResponseIsError(true)
                        console.log(response.json())
                      }
                    })
                    .catch((error) => {
                      console.error("Error en la creación del pedido:", error);
                    });
                }
              }}
            >
              <h3 className="text-xl font-bold">Crear Pedidos 🚀!</h3>
              <p className="py-2 font-light text-sm">
                Formulario creacion de pedidos
              </p>
              <div className="gap-2 flex-col flex">
                <label htmlFor="pet-select" className="text-sm" >Selecciona tu producto</label>

                <select name="pets" id="pet-select" className="btn">
                  <option value="">Seleciona tu producto 🔽</option>
                  {dataProductos?.data.map((producto) => (
                    <option onClick={() => {
                      setIdSelect(producto.id_producto)
                      console.log(idSelect)
                    } } >{producto.nombre}</option>
                  ))}

                </select>

                <label  className="text-sm" >Cantidad</label>
                <label className="input w-full">
                  <input
                    type="number"
                    required
                    placeholder="Cantidad"
                    ref={inputRefCantidad}
                  />
                </label>
                <input
                  type="submit"
                  className="btn w-full btn-neutral"
                  value={"Crear Pedidos"}
                />
              </div>
            </form>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div>
        <button
          className="btn btn-sm"
          onClick={() => setIsBig(!isBig)}
        >{`${isBig ? `Minimizar` : "Maximizar"}`}</button>
      </div>
      <div className="overflow-x-auto  rounded-box border border-base-content/5">
        <table className={`table ${isBig ? "table-sm" : "table-xs"}`}>
          <thead>
            <tr>
              <th></th>
              <th>Estado</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <td>Id Producto</td>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item, index) => (
              <ItemTable item={item} index={index} key={item.id_pedido}  />
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="w-full justify-end  flex gap-4">
        <button className="btn btn-sm" onClick={() => {
          setNumberCount(numberCount - 10)
        }} >Pagina anterior</button>
        <button className="btn btn-sm" onClick={() => {
          setNumberCount(numberCount + 10)
        }} >Pagina siguiente</button>
      </div> */}
    </div>
  );
}


const ItemTable = ({ item, index }: { item: Data, index: number}) => {


  // Estados de actualizar o para ver las modales
 
  const [isOpenEliminar] = useState(false)
  const [isPopoverChangeEstado, setIsPopoverChangeEstado] = useState<boolean>(false)

 

  return (
    <tr>
      <th>{index + 1}</th>
      <td><FormaterComponente opciones={item.estado} /></td>
      <td>{item.cantidad}</td>
      <td>{item.fecha}</td>
      <td>{item.id_producto}</td>

      {/* // Modales Hechas con react */}

      {isPopoverChangeEstado ? (
        <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-black/5 z-[999]  ">
          <div className="bg-base-100 p-4 w-xl rounded-md" >
            <div className="flex justify-end w-full">
              <button className="btn btn-ghost btn-circle" onClick={() => setIsPopoverChangeEstado(false)} >x</button>
            </div>
            <h3 className="text-xl" >Pedidos </h3>
            <form className="flex gap-2 flex-col">
              <input type="text" placeholder="Xsmall" className="input input-sm w-full" />
              <input type="text" placeholder="Xsmall" className="input input-sm w-full" />
              <input type="text" placeholder="Xsmall" className="input input-sm w-full" />
              <input type="text" placeholder="Xsmall" className="input input-sm w-full" />
            </form>
          </div>
        </div>

      ) : null}


      <div className="w-full h-full bg-black">
      </div>
      <div className="w-full h-full bg-black">
      </div>


      <div className={`${isOpenEliminar ? "block" : "hidden"} w-full h-full fixed bg-black/50 `}>
        <div>Elimimar open</div>
      </div>
      {/* <div className={`${isOpenActualizar ? "block" : "hidden"}  w-full h-full fixed bg-black/30 shadow-lg inset-0 z-[999] flex justify-center  items-center`} >
        <div className="w-xl bg-base-100 p-4 rounded-md">
          <button className="cursor-pointer" onClick={() => setIsOpenActualizar(false)} >X</button>
          <h3 className="text-xl font-bold">Actualizar </h3>
          <form className="flex flex-col gap-2">
            <input type="text" className="input w-full" />
            <input type="text" className="input w-full" />
            <input type="text" className="input w-full" />
            <input type="submit" className="btn btn-neutral" value={"Actualizar Pedido"} />
          </form>
        </div>
      </div> */}
      {/* <td className="flex gap-2 w-full justify-end">
        <button className={`btn btn-soft ${isBig ? "btn-sm" : "btn-xs"}  btn-info`} onClick={() => {
          setIsOpenActualizar(true)
        }} >Actualizar</button>
        <button className={`btn btn-soft ${isBig ? "btn-sm" : "btn-xs"}  btn-error`} onClick={() => {
          console.log("dsfsjfd")
        }} > Eliminar  </button>
         <button className={`btn btn-soft ${isBig ? "btn-sm" : "btn-xs"}  btn-success`} onClick={() => {
          setIsPopoverChangeEstado(!isPopoverChangeEstado)
          setIsOpenActualizar(true)
        }} >Cambiar Estado</button> 
      </td> */}
    </tr>
  );
};


const Rutas = [
  {
    nombre: "Tabla",
    to: "tablas",
  },
  {
    nombre: "Pedidos",
    to: "pedidos",
  },
];
