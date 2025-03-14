import { useEffect, useState, useRef } from "react";
import { Reorder } from "motion/react";
import Loading from "../ui/loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  handleUpdateCategoria,
  handleClickDelete,
  handleClickCreate,
} from "../utils/method-categorias";
import CategoriaHooks from "../hooks/categoria";
import { Data } from "../types/response";
import { Response } from "../types/response";





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
  }, [isModalOpen]);

  const handleModalOpen = (index: number) => {
    setSelectedCategory(data?.data[index] || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Si tenemos sdffffdata, renderizamos
  if (data) {
    return (
      <main className="flex flex-col gap-2">
        {isOpenPopoverCreate && (
          <div className="w-full h-full absolute flex items-center justify-center bg-black/20 z-[999] ">
            <div className="w-xl shadow-2xl p-6 bg-base-100 rounded-xl X">
              <div
                aria-placeholder="Crear categoria"
                className="flex justify-end items-end"
              >
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpenCreatePopover(!isOpenPopoverCreate);
                  }}
                >
                  ✕
                </button>
              </div>

              <h1 className="text-2xl text-center font-bold mb-4.5">
                Crear categoria
              </h1>
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
                }}
              >
                <label htmlFor="Nombre">Nombre</label>
                <input
                  ref={inputCreateCategoriaElementNombre}
                  type="text"
                  className="input w-full"
                  placeholder="Tecnologias"
                />
                <label htmlFor="">Descripcion</label>
                <input
                  ref={inputCreateCategoriaElementDescripcion}
                  type="text"
                  className="input w-full"
                  placeholder="Tecnologia de ultima generacion."
                />
                <input
                  type="submit"
                  className="btn btn-neutral"
                  value={"Crear Categoria"}
                />
              </form>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="btn"
            onClick={() => setIsOpenCreatePopover(!isOpenPopoverCreate)}
          >
            Crear Categoria
          </button>
        </div>
        <Reorder.Group
          className="flex gap-2 flex-col p-6"
          axis="y"
          values={data.data}
          onReorder={setData}
        >
          {data.data.map((item, index) => (
            <Reorder.Item
              key={item.id_categoria}
              className="flex flex-row bg-base-200 rounded-md p-3 border-base-200 border justify-between"
            >
              <div>
                <p className="font-semibold text-xl uppercase">{item.nombre}</p>
                <p className="font-light text-xs">{item.descripcion}</p>
              </div>
              <div className="flex flex-row gap-2">
               
                <div>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      //@ts-ignore
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Eliminar <Icon icon="fluent-color:dismiss-circle-16" width="30" height="30" />
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
                        Estas seguro de eliminar <strong>{item.nombre}</strong> ? ⚠️
                      </p>
                      <div className="flex gap-4 ">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn top-2">Cancelar</button>
                        </form>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            handleClickDelete({
                              id_categoria: item.id_categoria,
                              estado: 2,
                            });
                          }}
                        >
                          Eliminar ⚠️
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={() => handleModalOpen(index)}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Modal */}
        {isModalOpen && selectedCategory && (
          <dialog open className="modal">
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
      </main>
    );
  }

  return <Loading />;
}
