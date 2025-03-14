import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main } from "./routes/lazy-routes";
import Navbar from "./ui/navbar";
import Categorias from "./routes/categorias";
import Historial from "./routes/historial";
import Loading from "./ui/loading";
import PedidosComp from "./routes/pedidos";
import Productos from "./routes/productos";
import SiderBar from "./ui/sidebar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <SiderBar/>
      <Routes>
        <Route path="loading" element={<Loading/>} />
          <Route path="/" element={<Main/>} />
          <Route path="/categorias" element={<Categorias/>} />
          <Route path="historial" element={<Historial/>}/>
          <Route path="/pedidos" element={<PedidosComp/>} />
          <Route path="/productos" element={<Productos/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
