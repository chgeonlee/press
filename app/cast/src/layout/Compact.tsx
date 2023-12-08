import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../styles/index.scss";

const CompactLayout = () => {
  return (
    <div className="compact-layout">
      <div className="section">
        <Outlet />
      </div>
    </div>
  );
};

export default CompactLayout;
