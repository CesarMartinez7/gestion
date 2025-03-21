import { Link } from "react-router-dom";

const routers = [
  { name: "Pedidos", route: "pedidos" },
  { name: "Categorias", route: "categorias" },
  { name: "Historial", route: "historial" },
];

export default function Main({modo = "Invitado"} : {modo : string}) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-extrabold mb-3">
        <strong className="text-red-500">Gestión 5G modo {modo}</strong> eficiente y rápida 🚀
      </h1>
      <p className="text-lg  mb-3">
        Administra pedidos, categorías e historial con facilidad.
      </p>
      <div className="flex flex-wrap gap-4">
        {routers.map((route) => (
          <Link
            key={route.route}
            className="btn btn-soft btn-error btn-sm text-lg px-6 py-3 "
            to={`/${route.route}`}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
