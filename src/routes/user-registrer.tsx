import React, { useRef, useState } from "react";
import Red5GLogowhite from "../assets/red5gLogoWhite.png";
import Red5gLogoBlack from "../assets/red5gLogoBlack.png";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../stores/theme-store";

interface ResponseToken {
  data: string;
  message: string;
  status: number;
  success: boolean;
}

export default function UserRegistrer() {
  const inputRefUserName = useRef<HTMLInputElement | null>(null);
  const inputRefUserPassword = useRef<HTMLInputElement | null>(null);

  const [isLogeado, setIsLogeado] = useState<boolean>(false);
  const [isBad, setIsBad] = useState<boolean>(false);


  const {theme,toggleTheme} = useThemeStore()
  

  const [token, setToken] = useState<string>("");

  

  const handleSubmitLogin = (e: React.FormEvent, username: string, password: string) => {
    e.preventDefault();
    console.log("Registro aquí...");

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          setIsBad(true);
          throw new Error("Credenciales incorrectas");
        }
        return response.json();
      })
      .then((data: ResponseToken) => {
        if (!data) {
          throw new Error("Ocurrió un error al obtener el token");
        }
        console.log(data.data, data);
        setToken(data.data);
        localStorage.setItem("token", data.data);
        setIsLogeado(true);
        location.href = "/"  // Redirige si la API es exitosa
      })
      .catch((error) => {
        console.error(error.message);  // Muestra el error en la consola
      });
  };

  return (
    <main className="grid place-content-center w-full h-screen">
      <form
        onSubmit={(e) => {
          if (inputRefUserName.current?.value && inputRefUserPassword.current?.value) {
            handleSubmitLogin(e, inputRefUserName.current?.value, inputRefUserPassword.current?.value);
          }
        }}
      >
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box shadow-xl ">
          <div className="flex items-center w-full justify-center">
            <img src={theme === "dark" ? Red5gLogoBlack : Red5GLogowhite} alt="Red5G Logo" className="w-[180px]" />
          </div>
          <legend className="fieldset-legend">Inicio de Sesión</legend>

          <label className="fieldset-label">Usuario</label>
          <input
            type="text"
            className={`input ${isBad ? "btn-error" : "btn-success"}`}
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
          <p className="text-red-500">{isBad ? "Verifica tu usuario o contraseña 🚀❌" : ""}</p>

          <button className="btn btn-neutral mt-4">Iniciar Sesión</button>
          <button className="btn btn-xs" onClick={() => localStorage.clear()}>
            Cerrar sesión
          </button>
        </fieldset>
      </form>
          <button onClick={toggleTheme}>Theme</button>
    </main>
  );
}
