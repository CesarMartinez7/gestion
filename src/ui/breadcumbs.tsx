import { Link } from "react-router-dom";



export interface PathBreadCumbs {
    nombre?: string,
    icon?: string
    to?: string
}


export default function BreadCumbs({Rutas}: {Rutas: PathBreadCumbs[]}) {
  return (

    <div className="breadcrumbs text-xs">
      <ul>
        {Rutas.map((ruta,index) => (
            <li key={index + new Date().getFullYear()}>
                <Link to={`${ruta.to}`} >{ruta.nombre}</Link>
            </li>
        ))}
      </ul>
    </div>
  );
}
