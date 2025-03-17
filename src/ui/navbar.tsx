import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Red5GLogoWhite from "../assets/red5gLogoWhite.png"
import Red5GLogoBlack from "../assets/red5gLogoBlack.png"
import useThemeStore from "../stores/theme-store";

export default function Navbar() {

  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className="navbar shadow-sm px-10">
      <div className="flex-1">
        <Link to={"/"}>
          <img src={theme === "dark" ? Red5GLogoBlack : Red5GLogoWhite} alt="Red5G Logo" width={60} height={30} />
        </Link>
      </div>
      <div className="flex gap-3.5">
        <button className="btn btn-ghost btn-circle" onClick={() => {
          const htmlEtiqueta = document.getElementById("html")
          console.log(htmlEtiqueta)
          toggleTheme()
          htmlEtiqueta?.setAttribute("data-theme", theme)
        }} title="Set themes jaja">
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
    name: "Categorías",
    route: "categorias",
    icon: "grid-2x2-check",
  },
  {
    name: "Productos",
    route: "productos",
    icon: "tags",
  },
  {
    name: "Pedidos",
    route: "pedidos",
    icon: "box",
  }
];



