import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { Main } from "./routes/lazy-routes";
import Categorias from "./routes/categorias";
import Historial from "./routes/historial";
import Loading from "./ui/loading";
import PedidosComp from "./routes/pedidos";
import Productos from "./routes/productos";
import UserRegistrer from "./routes/user-registrer";
import NotFoundPage from "./routes/notfound";
import { Suspense } from "react";


function App() {
  return (
    <Suspense fallback={<Loading/>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="historial" element={<Historial />} />
          <Route path="pedidos" element={<PedidosComp />} />
          <Route path="productos" element={<Productos name="Productos" />} />
          <Route path="login" element={<UserRegistrer/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
        <Route path="loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
