import { useState, useEffect } from "react";
import { Pedidos } from "../types/pedidos";
import { Data } from "../types/pedidos";
import BreadCumbs from "../ui/breadcumbs";

export default function PedidosComp() {
  const [data, setData] = useState<Pedidos>();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/pedidos")
      .then((reponse) => reponse.json())
      .then((pedidos) => setData(pedidos));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <BreadCumbs Rutas={Rutas}/>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Estado</th>
              <th>Job</th>
              <th>Cantidad</th>
              <th>Total</th>

            </tr>
          </thead>
          <tbody>
          {data?.data.map((item,index) => (
            <ItemTable item={item} index={index} />
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ItemTable = ({item,index} : {item: Data,index: number }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{item.estado}</td>
      <td>{item.precio_unitario}</td>
      <td>{item.cantidad}</td>
      <td>{item.total}</td>
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
