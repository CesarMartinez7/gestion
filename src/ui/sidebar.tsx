import { Link, Outlet } from "react-router-dom";
import { routers } from "./navbar";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SiderBar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Contenedor del contenido de la página */}
      <div className="drawer-content flex flex-col w-full min-h-svh">
        {/* Botón para abrir el sidebar en pantallas pequeñas */}
        
        {/* Aquí se renderiza la página actual */}
        <div className="md:p-4 h-full">
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
        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4">
          <ul className="menu bg-base-200 rounded-box w-56">
            <li>
              <a className="flex justify-between">
                <span className="flex gap-2">
                <Icon icon="lucide:database" width="20" height="20" /> Opciones
                </span>
               <Icon icon="lucide:chevron-down" width="24" height="24" />{" "}
              </a>
              <ul>
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
              </ul>
            </li>
          </ul>
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
