import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="w-full   flex items-center justify-center flex-col">
      <h1 className="text-6xl mb-12">
        Lorem ipsum dolor, sit amet consectetur adipisicing.
      </h1>
      <div className="flex flex-row gap-2">
        
        {routers.map((route) => (
          <Link className="btn" to={`/${route.route}`}>
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
];
