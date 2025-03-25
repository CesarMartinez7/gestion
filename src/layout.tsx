
import Navbar from "./ui/navbar";
import SiderBar from "./ui/sidebar";
import Footer from "./ui/footer";

const Layout = ({estaLogeado} : {estaLogeado: boolean}) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <SiderBar estaLogeado={estaLogeado} />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
