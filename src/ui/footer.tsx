
import Red5GLogo from "../assets/red5gLogoWhite.png"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function Footer(){
	return(
		<footer className="footer md:px-16 sm:footer-horizontal text-white  bg-black items-center p-4">
		<aside className="grid-flow-col items-center">
		  <img src={Red5GLogo} alt="" className="w-16" />
		  <p> {new Date().getFullYear()} -  Red 5G. Todos los derechos reservados - Cra. 53 # 80 - 198 | Atlántica Torre Empresarial | Piso 9 | Barranquilla, Colombia</p>
		</aside>
		<nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
		  <a>
		  <Icon icon="lucide:twitter" width="24" height="24" />
		  </a>
		  <a>
		  <Icon icon="lucide:youtube" width="24" height="24" />
		  </a>
		  <a>
		  <Icon icon="lucide:facebook" width="24" height="24" />
		  </a>
		</nav>
	  </footer>
)
}
