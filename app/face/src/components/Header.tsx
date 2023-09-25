import { FaMoon, FaUserCircle } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import SelfLogo from "./icon/self/logo";
import SelfMenu from "./icon/self/menu";
import useDarkMode from "../hooks/useDarkMode";
import classNames from "classnames";
import { IconButton } from "./button/IconButton";
import press from "@/lib";
import { PlaceEnum } from "../../../../lib/style";

const useStyles = createUseStyles((theme: any) => ({
  container: press.style.spec().edge(1, theme.border, PlaceEnum.BOTTOM),
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
          fnClick={() => setDarkModeStatus(!darkModeStatus)}
        />
        <IconButton
          icon={<SelfMenu size={FIXED_ICON_SIZE} />}
          fnClick={() => {
            confirm("미구현");
          }}
        />
        <IconButton
          icon={<FaUserCircle size={FIXED_ICON_SIZE} />}
          fnClick={() => {
            confirm("미구현");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
