import { Data } from "../types/response";

export interface CreateHandleClickProps {
    nombre: string;
    descripcion: string;
}


export const handleUpdateCategoria = (object: Data) => {
    fetch("http://127.0.0.1:5000/actualizar_categorias", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: object.nombre,
        descripcion: object.descripcion,
        id_categoria: object.id_categoria
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));

  };


export const handleClickDelete = ({
    id_categoria,
    estado,
  }: {
    id_categoria: number;
    estado: number;
  }) => {
    fetch("http://127.0.0.1:5000/cambiar_estado_categorias", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: estado,
        id_categoria: id_categoria,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  };



export const handleClickCreate = (data: CreateHandleClickProps) => {
    fetch("http://127.0.0.1:5000/ingresar_categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.nombre,
        descripcion: data.descripcion,
      }),
    })
      .then((response) => console.log(response.json()))
      .then((data) => console.log(data));
};
