import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Logo</a>
      </div>
      <div className="flex gap-3.5">
		{routers.flatMap((route) => (
			<Link to={`/${route.route}`}>{route.name}</Link>
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
  