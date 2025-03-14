import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={"/"}>
          <Icon icon="fluent-color:code-24" width="34" height="34" />
        </Link>
      </div>
      <div className="flex gap-3.5">
        {routers.flatMap((route) => (
          <Link className="btn btn-ghost" to={`/${route.route}`}>
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

const routers = [
  {
    name: "Pedidos",
    route: "pedidos",
  },
  {
    name: "Categorias",
    route: "categorias",
  },
  {
    name: "Historial",
    route: "historial",
    subpath: ["categorias", "pedidos", "producto"],
  },
  {
    name: "Productos",
    route: "productos",
  },
];
