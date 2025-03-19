import React, { useState, useEffect } from "react";
import { Pedidos } from "../types/pedidos";
import { Data } from "../types/pedidos";
import BreadCumbs from "../ui/breadcumbs";


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
    return <h3 className="text-zinc-600 font-bold">Inactivo</h3>
  } else if (opciones === Opciones.CANCELADO) {
    return <h3 className="text-red-500 font-bold">Cancelado</h3>
  } else if (opciones === Opciones.ENTREGADO) {
    return <h3 className="text-green-500 font-bold">Entregado</h3>
  } else if (opciones === Opciones.PENDIENTE) {
    return <h3 className="text-yellow-500 font-bold">Pendiente</h3>
  } else if (opciones === Opciones.EN_PROCESO) {
    return <h3 className="text-orange-500 font-bold">En proceso </h3>
  }


}

export default function PedidosComp() {

  const [data, setData] = useState<Pedidos>();
  const [isBig, setIsBig] = useState<boolean>()

  useEffect(() => {
    fetch("http://127.0.0.1:5000/pedidos")
      .then((reponse) => reponse.json())
      .then((pedidos) => {
        setData(pedidos)
        console.log(data)
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 px-8">
      <div>
        <BreadCumbs Rutas={Rutas} />
      </div>
      <div>
        <h3 className="font-bold text-2xl">Pedidos</h3>
        <p className="text-xs text-opacity-100">{` Registros disponibles`} : <span className="text-green-500 font-bold">{`${data?.data.length}`}</span> </p>
      </div>
      <div className="flex justify-end gap-2">
        {/* The button to open modal */}
        <label htmlFor="my_modal_7" className="btn btn-sm btn-neutral">Crear pedidos </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <form onSubmit={(e) => {
              e.preventDefault()
            }}>
            <h3 className="text-xl font-bold">Crear Pedidos 🚀!</h3>
            <p className="py-4">This modal works with a hidden checkbox!</p>
            <div className="gap-2 flex-col flex">
              <input type="text" className="input w-full" />
              <input type="text" className="input w-full" />
              <input type="text" className="input w-full" />
              <input type="submit" className="btn w-full btn-neutral" value={"Crear Pedidos"} />

            </div>
            </form>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
        <button className="btn btn-sm" onClick={() => setIsBig(!isBig)}>  {isBig ? `Minimizar` : "Maximizar"} </button>
      </div>
      <div className="overflow-x-auto">
        <table className={`table ${isBig ? "table-sm" : "table-xs"} `}>
          <thead>
            <tr>
              <th></th>
              <th>Estado</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <td>Id Producto</td>
              <td>Opciones</td>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item, index) => (
              <ItemTable item={item} index={index} key={item.id_pedido} isBig={isBig} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ItemTable = ({ item, index, isBig }: { item: Data, index: number, isBig: boolean | undefined }) => {
  const [isOpenActualizar, setIsOpenActualizar] = useState(false)
  const [isOpenEliminar, setIsOpenEliminar] = useState(false)

  const handleClickEliminar = () => {

  }

  const handleClickActualizar = () => {
    fetch("http://127.0.0.1:5000/pedidos").then((response) => console.log(response.json()))
  }


  return (
    <tr>
      <th>{index + 1}</th>
      <td><FormaterComponente opciones={item.estado} /></td>
      <td>{item.cantidad}</td>
      <td>{item.fecha}</td>
      <td>{item.id_producto}</td>
      <div className={`${isOpenEliminar ? "block" : "hidden"} w-full h-full fixed bg-black/50 `}>
        <div>Elimimar open</div>
      </div>
      <div className={`${isOpenActualizar ? "block" : "hidden"} w-full h-full fixed bg-black/50`} >
        <div>Actualizar open</div>
      </div>
      <td className="flex gap-2 w-full justify-end">
        <button className={`btn btn-soft ${isBig ? "btn-sm" : "btn-xs"}  btn-info`} onClick={() => {
          setIsOpenActualizar(true)
        }} >Actualizar</button>
        <button className={`btn btn-soft ${isBig ? "btn-sm" : "btn-xs"}  btn-error`} onClick={() => {
          setIsOpenEliminar(true)
        }} >Eliminar</button>
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
    nombre: "Pedidos",
    to: "pedidos",
  },
];
