import "../App.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../layout";
import { Main, Pedidos, Productos, Categorias, NotFoundPage, Login } from "../routes/lazy-routes";
import Historial from "../routes/historial";
import Loading from "../ui/loading";
import { Suspense } from "react";






export default function Admin() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main modo="Admin" />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="historial" element={<Historial />} />
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="productos" element={<Productos name="Productos" />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}