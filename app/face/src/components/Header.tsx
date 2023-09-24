import { FaMoon, FaUserCircle } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import SelfLogo from "./icon/self/logo";
import SelfMenu from "./icon/self/menu";
import useDarkMode from "../hooks/useDarkMode";
import classNames from "classnames";
import { IconButton } from "./button/IconButton";

const useStyles = createUseStyles((theme: any) => ({
  container: {
    borderBottom: `1px solid ${theme.border}`,
  },
}));
const FIXED_ICON_SIZE = 24;

const Header = () => {
  const classes = useStyles();
  const { darkModeStatus, setDarkModeStatus } = useDarkMode();

  return (
    <div className={classNames(classes.container, "header")}>
      <SelfLogo />
      <div className="setting">
        <IconButton
          icon={<FaMoon size={18} />}
          onClick={() => setDarkModeStatus(!darkModeStatus)}
        />
        <IconButton
          icon={<SelfMenu size={FIXED_ICON_SIZE} />}
          onClick={() => {
            confirm("미구현");
          }}
        />
        <IconButton
          icon={<FaUserCircle size={FIXED_ICON_SIZE} />}
          onClick={() => {
            confirm("미구현");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
