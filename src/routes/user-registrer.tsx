
import React, { useRef, useState } from "react";
import Red5GLogowhite from "../assets/red5gLogoWhite.png";
import Red5gLogoBlack from "../assets/red5gLogoBlack.png"
import useThemeStore from "../stores/theme-store";


interface ResponseToken {
  data: string
  message: string,
  status: number
  success: boolean
}



export default function UserRegistrer() {
  const inputRefUserName = useRef<HTMLInputElement | null>(null);
  const inputRefUserPassword = useRef<HTMLInputElement | null>(null);

  const [isLogeado, setIsLogeado] = useState<boolean>(false)

  // let token = ""

  const [token, setToken] = useState<string>("")

  const { theme } = useThemeStore()

  const handleSubmitLogin = (e: React.FormEvent, username: string, password: string) => {
    e.preventDefault();
    console.log("Registro aqui .....");
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    }).then((ite) => ite.json()).then((data: ResponseToken) => {
      if (!data) {
        throw new Error("Ocurrio un error en la peticion del token")
      }
      console.log(data.data, data)
      setToken(data.data)
      localStorage.setItem("token", data.data)
      window.alert(token)
    })
  };

  return (
    <main className="grid place-content-center w-full h-screen">
      <form onSubmit={(e) => {
        if (inputRefUserName.current?.value && inputRefUserPassword.current?.value) {
          handleSubmitLogin(e, inputRefUserName.current?.value, inputRefUserPassword.current?.value)
        }
      }}>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box shadow-xl ">
          <div className="flex items-center w-full  justify-center">
            <img src={theme === "dark" ? Red5gLogoBlack : Red5GLogowhite} alt="Red5G Logo" className="w-[180px]" />

          </div>
          <legend className="fieldset-legend">Inicio de Sesion</legend>

          <label className="fieldset-label">Usuario</label>
          <input
            type="text"
            className="input"
            ref={inputRefUserName}
            defaultValue={"admin"}
            placeholder="adminred5g"
          />

          <label className="fieldset-label">Contraseña</label>
          <input
            type="password"
            className="input"
            ref={inputRefUserPassword}
            defaultValue={"admin"}
            placeholder="Password"
          />

          <button className="btn btn-neutral mt-4">Iniciar Sesion</button>
          <button className="btn btn-xs" >Cerrar sesion</button>
        </fieldset>
      </form>
    </main>
  );
}
