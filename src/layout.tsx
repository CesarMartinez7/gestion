import { Outlet } from "react-router-dom";

import Navbar from "./ui/navbar";
import SiderBar from "./ui/sidebar";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <SiderBar />
      </div>
    </div>
  );
};

export default Layout;
