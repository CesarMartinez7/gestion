
import Navbar from "./ui/navbar";
import SiderBar from "./ui/sidebar";
import Footer from "./ui/footer";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <SiderBar />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
