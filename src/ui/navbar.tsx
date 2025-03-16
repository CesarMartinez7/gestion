import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Red5GLogo from "../assets/red5glogo1.png"

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="flex-1">
        <Link to={"/"}>
          <img src={Red5GLogo} alt="" width={60} height={30} />
        </Link>
      </div>
      <div className="flex gap-3.5">
        <button className="btn btn-ghost btn-circle" title="Set themes jaja">
          <Icon icon="lucide:sun-medium" width="24" height="24" />
        </button>
        <button title="User Registrer" className="btn btn-ghost btn-circle">
          <Icon icon="lucide:user" width="24" height="24" />
        </button>
      </div>
    </div>
  );
}

export const routers = [
  {
    name: "Pedidos",
    route: "pedidos",
    icon: "box",
  },
  {
    name: "Categorias",
    route: "categorias",
    icon: "grid-2x2-check",
  },
  {
    name: "Historial",
    route: "historial",
    subpath: ["categorias", "pedidos", "producto"],
    icon: "history",
  },
  {
    name: "Productos",
    route: "productos",
    icon: "tags",
  },
];



