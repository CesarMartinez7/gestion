import { Link, Outlet } from "react-router-dom";
import { routers } from "./navbar";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SiderBar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Contenedor del contenido de la página */}
      <div className="drawer-content flex flex-col w-full">
        {/* Botón para abrir el sidebar en pantallas pequeñas */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-sm drawer-button lg:hidden"
        >
          Barra Lateral
        </label>

        {/* Aquí se renderiza la página actual */}
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <a className="flex justify-between">
              Tablas <Icon icon="lucide:chevron-down" width="24" height="24" />{" "}
            </a>
          </li>
          {routers.map((route) => (
            <li key={route.route} className="text-xs ">
              <Link
                to={`/${route.route}`}
                className="ml-1.5 w-full justify-start "
              >
                <Icon icon={`lucide:${route.icon}`} width="16" height="16" />
                {route.name}

              </Link>
            </li>
          ))}
          <li>
            <a>
              {" "}
              <Icon icon="lucide:log-in" width="19" height="19" /> Cerrar Sesion{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
