import { Link } from "react-router-dom";

const routers = [
  { name: "Pedidos", route: "pedidos" },
  { name: "Categorias", route: "categorias" },
  { name: "Historial", route: "historial" },
];

export default function Main({modo = "Invitado"} : {modo : string}) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold mb-3">
        <strong className="text-red-500 ">Gestión 5G modo {modo}</strong> eficiente y rápida 🚀
      </h1>
      <p className="text-md  mb-3">
        Administra pedidos, categorías e historial con facilidad.
      </p>
      <div className="flex flex-wrap gap-4">
        
      </div>
    </div>
  );
}
