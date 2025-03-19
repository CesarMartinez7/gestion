
import React, { useRef } from "react";
import Red5GLogowhite from "../assets/red5gLogoWhite.png";
import Red5gLogoBlack from "../assets/red5gLogoBlack.png"
import useThemeStore from "../stores/theme-store";


export default function UserRegistrer() {
  const inputRefUserName = useRef<HTMLInputElement>(null);
  const inputRefUserPassword = useRef<HTMLInputElement>(null);

  const { theme} = useThemeStore()

  const handleClickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registro aqui .....");
  };

  return (
    <main className="grid place-content-center w-full h-full  ">
      <form onSubmit={handleClickLogin}>
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
            defaultValue={"adminred5g"}
            placeholder="adminred5g"
          />

          <label className="fieldset-label">Contraseña</label>
          <input
            type="password"
            className="input"
            ref={inputRefUserPassword}
            defaultValue={"adminred5g"}
            placeholder="Password"
          />

          <button className="btn btn-neutral mt-4">Iniciar Sesion</button>
        </fieldset>
      </form>
    </main>
  );
}
