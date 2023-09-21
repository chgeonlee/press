import { FaUserCircle } from "react-icons/fa";
import SelfLogo from "./icon/self/logo";
import SelfMenu from "./icon/self/menu";
import useDarkMode from "../hooks/useDarkMode";
import { createUseStyles } from "react-jss";

const Header = () => {

    
    const { darkModeStatus, setDarkModeStatus } = useDarkMode();

    return (<div className="header"> 
        <SelfLogo />
        <div className="setting">
            <div><button onClick={() => setDarkModeStatus(!darkModeStatus)}>click me</button></div>
            <SelfMenu size={26} />
            <FaUserCircle size={26} />
        </div>
     </div>)
}

export default Header;