import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import { Main, Pedidos, Productos, Categorias, NotFoundPage, Login } from "./routes/lazy-routes";
import Historial from "./routes/historial";
import Loading from "./ui/loading";
import { Suspense, useEffect, useState } from "react";
import { createContext } from "react";

// Contexto de autenticación
const TokenAuth = createContext(null);

export default function App() {
  const [isLog, setIsLog] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  
  

  // useEffect para manejar el estado de autenticación basado en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "null" && storedToken !== "") {
      setToken(storedToken);
      setIsLog(true);
    } else {
      setIsLog(false);
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Esta función se ejecuta cuando el usuario hace login
  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken); // Guardamos el token en localStorage
    setToken(newToken);
    setIsLog(true); // Actualizamos el estado para indicar que el usuario está logueado
  };

  // Si el token es válido, cargamos las rutas protegidas
  if (isLog && token) {
    return (
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout estaLogeado={true} />}>
              <Route index element={<Main modo="admin"  />} />
              <Route path="categorias" element={<Categorias token={token}  />} />
              <Route path="pedidos" element={<Pedidos token={token} />} />
              <Route path="productos" element={<Productos name="Productos"  token={token} />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFoundPage  />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    );
  }

  // Si el usuario no está logueado, redirige al Login
  return (
    <Login onLogin={handleLogin} />
  );
}
