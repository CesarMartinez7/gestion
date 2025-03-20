import { useEffect, useState, useRef, SetStateAction } from "react";
import Loading from "../ui/loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import CategoriaHooks from "../hooks/categoria";
import { Response } from "../types/response";
import BreadCumbs from "../ui/breadcumbs";
import NotData from "../ui/notdata";
import { useAsyncError } from "react-router-dom";
import { motion } from "motion/react"









const Table = ({
  Data,
  handleModalOpen,
  isBig,
  isChangeSubmit,
  setIsChangeSubmit
  
}: {
  Data: Response;
  handleModalOpen: Function;
  isBig: boolean;
  isChangeSubmit: boolean;
  setIsChangeSubmit: React.Dispatch<SetStateAction<boolean>>
}) => {

  if(Data.data.length === 0){
    return <NotData/>
  }
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5">
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
              <td className="font-semibold uppercase">{item.nombre}</td>
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
                      document.getElementById(`my_modal_${index}`).showModal()
                    }
                  >
                    Eliminar{" "}
                    <Icon
                      icon="fluent-color:dismiss-circle-16"
                      width="20"
                      height="20"
                    />
                  </button>
                  <dialog id={`my_modal_${index}`} className="modal">
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
                          className="btn btn-error "
                          onClick={() => {
                            fetch("http://127.0.0.1:5000/cambiar_estado_categorias", {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                estado: 2,
                                id_categoria: item.id_categoria,
                              }),
                            })
                              .then((response) => {
                                if(response.ok){
                                  setIsChangeSubmit(!isChangeSubmit)
                                }
                              })
                              .then((json) => console.log(json))
                              .catch((err) => console.error(err));

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

  const [responseIsError,setResponseIsError] = useState<boolean>(false)
  const [responseIsOk,setResponseIsOk] = useState<boolean>(false)

  const inputCreateCategoriaElementDescripcion = useRef<HTMLInputElement | null>(null);
  const inputCreateCategoriaElementNombre = useRef<HTMLInputElement | null>(null);

  // Petición para cargar las categorías
  useEffect(() => {
    fetch("http://127.0.0.1:5000/categorias")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [isChangeSubmit]);  // Dependemos de isChasngeSubmit



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




  const handleModalOpen = (index: number) => {
    setSelectedCategory(data?.data[index] || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Si tenemos datos, renderizamos
  if (data) {
    return (
      <main className="flex flex-col gap-2 px-8">


{responseIsOk && (
        <motion.div className="chat chat-end absolute right-2.5">
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} className="chat-bubble chat-bubble-success font-bold" exit={{ opacity: 0, scale: 0 }}>
            Categoria Creado con éxito ✅
          </motion.div>
        </motion.div>
      )}

      
    {responseIsError && (
        <motion.div className="chat chat-end absolute right-2.5">
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} className="chat-bubble chat-bubble-error font-bold" exit={{ opacity: 0, scale: 0 }}>
            Hubo un error en la creacion de la categoria ❌
          </motion.div>
        </motion.div>
      )}


        <BreadCumbs Rutas={Rutas} />
        <h1 className="text-2xl font-bold">Categorías</h1>
        <p className="text-xs text-opacity-100">{` Registros disponibles`} : <span className="text-green-500 font-bold">{`${data.data.length}`}</span> </p>
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
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    inputCreateCategoriaElementDescripcion.current?.value &&
                    inputCreateCategoriaElementNombre.current?.value
                  ){
                    
                    fetch("http://127.0.0.1:5000/ingresar_categorias", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        nombre: inputCreateCategoriaElementNombre.current.value,
                        descripcion: inputCreateCategoriaElementDescripcion.current.value,
                      }),
                    })
                      .then((response) => {
                        if(response.ok){
                          setIsChangeSubmit(!isChangeSubmit)
                          setResponseIsOk(true)
                        }else{
                          setResponseIsError(true)
                        }
                      })
                      .then((data) => console.log(data)).catch((response) => console.log("error", response))                   
                  }
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

        {/* Botón para abrir la modal */}
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

                    fetch("http://127.0.0.1:5000/actualizar_categorias", {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        nombre: inputRefNombre.current.value,
                        descripcion: inputRefDescripcion.current.value,
                        id_categoria: selectedCategory.id_categoria
                      }),
                    })
                      .then((response) => {
                        if(response.ok) {
                          setIsChangeSubmit(!isChangeSubmit)
                        } 
                      })
                      .then((json) => console.log(json))
                      .catch((err) => console.log(err));
                  }
                  handleModalClose();
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
        <Table Data={data} handleModalOpen={handleModalOpen} isBig={isBig} isChangeSubmit={isChangeSubmit} setIsChangeSubmit={setIsChangeSubmit} />
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
