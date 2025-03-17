import React, { useEffect, useState, useRef } from "react";
import { Data } from "../types/productos";
import BreadCumbs from "../ui/breadcumbs";
import { Icon } from "@iconify/react";
import Loading from "../ui/loading";
import ProductosHooks from "../hooks/productos";
import { motion } from "framer-motion";

interface UpdateProductos {
  id_producto: number;
  descripcion: string;
  nombre: string;
  precio: number | bigint;
  cantidad: number | bigint;
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
          <motion.div
            className="bg-base-100 w-lg h-fit p-6 rounded-xl"
            whileInView={{ scale: 1 }}
            initial={{ scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="justify-end flex">
              <button
                className="btn btn-circle btn-sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <h1 className="font-bold text-xl">Crear Productos</h1>
            <form
              className="w-full"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();

                if (
                  inputRefCantidad.current?.value &&
                  inputRefDescripcion.current?.value &&
                  inputRefID_Categoria.current?.value &&
                  inputRefPrecio.current?.value &&
                  inputRefNombre.current?.value &&
                  inputRefImagenes.current?.value
                ) {
                  handleSubmitCreate({
                    nombre: inputRefNombre.current.value,
                    descripcion: inputRefDescripcion.current.value,
                    cantidad: inputRefCantidad.current.value,
                    precio: inputRefPrecio.current.value,
                    id_categoria: inputRefID_Categoria.current.value,
                  });
                }
              }}
            >
              <div className="flex gap-2 flex-col">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Nombre</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Nombre"
                    ref={inputRefNombre}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Descripcion</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Descripcion"
                    ref={inputRefDescripcion}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Cantidad</legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Cantidad"
                    ref={inputRefCantidad}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Precio</legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Precio"
                    ref={inputRefPrecio}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Imagen</legend>
                  <input
                    type="file"
                    className="file w-full"
                    placeholder="Type here"
                    ref={inputRefImagenes}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Id Categoria</legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="ID Categoria"
                    ref={inputRefID_Categoria}
                  />
                </fieldset>
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

      <main className="gap-2 px-8">
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
                handleUpdateProducto({
                  id_producto: Item.id_producto,
                  nombre: Item.nombre,
                  descripcion: Item.descripcion,
                  precio: Item.precio,
                  cantidad: Item.cantidad,
                });
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
                <input type="file" className="w-full" placeholder="Archivo" />
                <input type="submit" className="btn w-full btn-neutral" />
              </div>
            </form>
          </div>
        </dialog>
        <button className="btn btn-soft btn-error btn-sm">Eliminar</button>
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
