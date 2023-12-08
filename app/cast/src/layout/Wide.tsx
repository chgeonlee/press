import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../styles/index.scss";

const WideLayout = () => {
  return (
    <div className="wide-layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default WideLayout;
