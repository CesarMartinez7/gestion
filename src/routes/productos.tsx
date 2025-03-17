import { useState, useEffect } from "react";
import { Response } from "../types/productos";
import CategoriaHooks from "../hooks/categoria";
import { Data } from "../types/productos";
import BreadCumbs from "../ui/breadcumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loading from "../ui/loading";
import { data } from "react-router-dom";

export default function ProductosHooks({ name }: { name: string }) {
  const [] = CategoriaHooks();

  const [dataProductos, setDataProductos] = useState<Response>();
  const [isBig, setIsBig] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productos")
      .then((response) => response.json())
      .then((pedidos) => setDataProductos(pedidos));
  }, []);

  if (dataProductos) {
    return (
      <div className="p-4">
        <main className="gap-2 px-8">
          <BreadCumbs Rutas={Rutas} />
          <h3 className="font-bold text-xl">{name}</h3>
          <div className="flex justify-end w-full gap-2">
            <button className="btn btn-neutral btn-sm">Crear {name}</button>
            <button className="btn-sm btn" onClick={() => setIsBig(!isBig)}>
              {isBig ? "Maximizar" : "Minimizar"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className={`table ${isBig ? "table-sm" : "table-xs"}`}>
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th className="flex items-center">
                    {" "}
                    <Icon
                      icon="lucide:dollar-sign"
                      width="14"
                      height="14"
                    />{" "}
                    Precio
                  </th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {dataProductos?.data.map((item, index) => (
                  <Table index={index} Item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }
  return <Loading/>
}

const Table = ({ Item, index }: { Item: Data; index: number }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td className="font-bold uppercase">{Item.nombre}</td>
      <td>{Item.descripcion}</td>
      <td>{Item.cantidad}</td>
      <td className="font-bold"> $ {Item.precio}</td>
      <td className="font-bold gap-2 flex w-full justify-end">
        <button className="btn btn-soft btn-info btn-sm">Actualizar</button>
        <button className="btn btn-soft btn-error btn-sm">Eliminar</button>
      </td>
    </tr>
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
