import { useEffect, useState, useRef } from "react";
import Loading from "../ui/loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  handleUpdateCategoria,
  handleClickDelete,
  handleClickCreate,
} from "../utils/method-categorias";
import CategoriaHooks from "../hooks/categoria";
import { Response } from "../types/response";
import BreadCumbs from "../ui/breadcumbs";

const Table = ({
  Data,
  handleModalOpen,
  isBig
}: {
  Data: Response;
  handleModalOpen: Function;
  isBig: boolean
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table ${isBig ? "table-sm" : "table-xs"}`}>
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {Data.data.map((item, index) => (
            <tr key={item.id_categoria}>
              <th>{index + 1}</th>
              <td className="font-semibold">{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td className="flex gap-2  justify-end">
                <div>
                  <button
                    className="btn btn-soft btn-info btn-sm"
                    onClick={() => handleModalOpen(index)}
                  >
                    Actualizar
                  </button>
                </div>
                <div>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-error btn-soft btn-sm"
                    onClick={() =>
                      //@ts-ignore
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Eliminar{" "}
                    <Icon
                      icon="fluent-color:dismiss-circle-16"
                      width="20"
                      height="20"
                    />
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">Estas Seguro?</h3>
                      <p className="py-4">
                        Estas seguro de eliminar <strong>{item.nombre}</strong>{" "}
                        ? ⚠️
                      </p>
                      <div className="flex gap-4 ">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn top-2">Cancelar</button>
                        </form>
                        <button
                          className="btn "
                          onClick={() => {
                            handleClickDelete({id_categoria: item.id_categoria,estado: 2})
                          }}
                        >
                          Eliminar ⚠️
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
              </td>
            </tr>
          ))}
          {/* row 2 */}
        </tbody>
      </table>
    </div>
  );
};

export default function Categorias() {
  const [
    data,
    setData,
    isChangeSubmit,
    setIsChangeSubmit,
    isModalOpen,
    setIsModalOpen,
    selectedCategory,
    setSelectedCategory,
    inputRefDescripcion,
    inputRefNombre,
    isBig,
    setIsBig
  ] = CategoriaHooks();

  const [isOpenPopoverCreate, setIsOpenCreatePopover] =
    useState<boolean>(false);

  const inputCreateCategoriaElementDescripcion = useRef<HTMLInputElement>(null);
  const inputCreateCategoriaElementNombre = useRef<HTMLInputElement>(null);

  // Petición para cargar las categorías
  useEffect(() => {
    fetch("http://127.0.0.1:5000/categorias")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [isChangeSubmit]);

  const handleModalOpen = (index: number) => {
    setSelectedCategory(data?.data[index] || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // If i have data, come here, si no tenemos entonces se va al loading componente XD
  if (data) {
    return (
      <main className="flex flex-col gap-2 px-8">
        <BreadCumbs Rutas={Rutas} />
        <h1 className="text-xl font-bold">Categorías</h1>
        {isOpenPopoverCreate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
            <div className="w-full max-w-lg bg-base-100 shadow-2xl p-6 rounded-xl relative">
              {/* Botón de cierre */}
              <button
                className="absolute top-4 right-4 text-md cursor-pointer btn btn-circle btn-ghost btn-xs"
                onClick={() => setIsOpenCreatePopover(false)}
              >
                ✕
              </button>

              {/* Título */}
              <h1 className="text-2xl text-center font-bold mb-6">
                Crear Categoría
              </h1>

              {/* Formulario */}
              <form
                method="post"
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    inputCreateCategoriaElementDescripcion.current?.value &&
                    inputCreateCategoriaElementNombre.current?.value
                  )
                    handleClickCreate({
                      descripcion:
                        inputCreateCategoriaElementDescripcion.current.value,
                      nombre: inputCreateCategoriaElementNombre.current.value,
                    });
                  setIsChangeSubmit(!isChangeSubmit);
                }}
              >
                <label htmlFor="nombre" className="text-sm">
                  Nombre
                </label>
                <input
                  ref={inputCreateCategoriaElementNombre}
                  id="nombre"
                  type="text"
                  className="input w-full"
                  placeholder="Tecnologías"
                  required
                />

                <label htmlFor="descripcion" className="font-medium text-sm">
                  Descripción
                </label>
                <input
                  ref={inputCreateCategoriaElementDescripcion}
                  id="descripcion"
                  type="text"
                  className="input w-full"
                  placeholder="Tecnología de última generación."
                  required
                />

                <input
                  type="submit"
                  className="btn btn-neutral mt-2"
                  value="Crear Categoría"
                />
              </form>
            </div>
          </div>
        )}

        {/* Botonn para abrir la modal */}
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm btn-neutral"
            onClick={() => setIsOpenCreatePopover(!isOpenPopoverCreate)}
          >
            Crear Categoría
          </button>
          <button className="btn btn-sm" onClick={() => setIsBig(!isBig)} > {isBig ? "Minimizar" : "Maximizar"} </button>
        </div>

        {/* Modal */}
        {isModalOpen && selectedCategory && (
          <dialog open className="modal ">
            <div className="modal-box">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    inputRefDescripcion.current?.value &&
                    inputRefNombre.current?.value
                  ) {
                    handleUpdateCategoria({
                      descripcion: inputRefDescripcion.current.value,
                      id_categoria: selectedCategory.id_categoria,
                      nombre: inputRefNombre.current.value,
                    });
                  }
                  handleModalClose();
                  setIsChangeSubmit(!isChangeSubmit);
                }}
              >
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <div className="grid grid-cols-1 gap-3">
                  <h3 className="font-bold text-lg uppercase">
                    {selectedCategory.nombre}
                  </h3>
                  <p className="text-sm">{selectedCategory.descripcion}</p>

                  <input
                    ref={inputRefNombre}
                    type="text"
                    defaultValue={selectedCategory.nombre}
                    className="input w-full"
                  />
                  <input
                    ref={inputRefDescripcion}
                    type="text"
                    defaultValue={selectedCategory.descripcion}
                    className="input w-full"
                  />
                  <button className="btn btn-neutral">Enviar</button>
                </div>
              </form>
            </div>
          </dialog>
        )}
        <Table Data={data} handleModalOpen={handleModalOpen} isBig={isBig} />
      </main>
    );
  }
  
  return <Loading />;
}

const Rutas = [
  {
    nombre: "Tabla",
    to: "tablas",
  },
  {
    nombre: "Categoria",
    to: "categoria",
  },
];
