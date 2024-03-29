import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../styles/index.scss";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <div className="section">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
