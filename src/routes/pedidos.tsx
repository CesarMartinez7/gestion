import { useState, useEffect } from "react";
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
    return <h1>Activo</h1>
  } else if (opciones === Opciones.INACTIVO) {
    return <h1>Inactivo</h1>
  }else if (opciones === Opciones.CANCELADO) {
    return <h1>Cancelado</h1>
  } else if (opciones === Opciones.ENTREGADO) {
    return <h1>Entregado</h1>
  } else if (opciones === Opciones.PENDIENTE) {
    return <h1>Pendiente</h1>
  } else if (opciones === Opciones.EN_PROCESO) {
    return <h1>En proceso </h1>
  }


}





export default function PedidosComp() {
  const [data, setData] = useState<Pedidos>();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/pedidos")
      .then((reponse) => reponse.json())
      .then((pedidos) => 
      {
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
        <h3 className="font-bold text-xl">Pedidos</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-sm">
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
              <ItemTable item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ItemTable = ({ item, index }: { item: Data, index: number }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td><FormaterComponente opciones={item.estado} /></td>
      <td>{item.cantidad}</td>
      <td>{item.fecha}</td>
      <td>{item.id_producto}</td>


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
