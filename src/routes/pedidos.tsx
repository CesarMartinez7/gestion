import { useState, useEffect } from "react";
import { Pedidos } from "../types/pedidos";

export default function PedidosComp() {
  const [data, setData] = useState<Pedidos>();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/pedidos")
      .then((reponse) => reponse.json())
      .then((pedidos) => setData(pedidos));
  });

  return (
    <div className="flex flex-col gap-2">
      {data?.data.map((item) => (
        <div className="flex flex-row bg-base-200 rounded-md p-3 border-base-200 border justify-between">
          <div>
            <p>{item.cantidad}</p>
            <h3 className="font-semibold text-xl">{item.fecha}</h3>
            <p>{item.fecha_pedido}</p>
            <p>{item.id_pedido}</p>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
