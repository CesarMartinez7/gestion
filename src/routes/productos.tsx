import { useState, useEffect } from "react";
import { Response } from "../types/productos";
import CategoriaHooks from "../hooks/categoria";
import { Data } from "../types/productos";
import BreadCumbs from "../ui/breadcumbs";

export default function ProductosHooks() {
  const [] = CategoriaHooks();

  const [dataProductos, setDataProductos] = useState<Response>();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productos")
      .then((reponse) => reponse.json())
      .then((pedidos) => setDataProductos(pedidos));
  }, []);
  return (
    <div className="p-4">
    <main className="gap-2 px-8">
      <BreadCumbs Rutas={Rutas} />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          {dataProductos?.data.map((item, index) => (
            <Table index={index} Item={item} />
          ))}
        </table>
      </div>
    </main>
    </div>
  );
}

const Table = ({ Item, index }: { Item: Data; index: number }) => {
  return (
    <tbody>
      <tr>
        <th>{index + 1}</th>
        <td>{Item.nombre}</td>
        <td>{Item.descripcion}</td>
        <td>Blue</td>
      </tr>
    </tbody>
  );
};


// Rutas del BreadCumbs
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
