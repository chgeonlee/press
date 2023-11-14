import { FaMoon, FaUserCircle } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import SelfLogo from "./icon/self/logo";
import SelfMenu from "./icon/self/menu";
import useDarkMode from "../hooks/useDarkMode";
import { IconButton } from "./button/IconButton";
import Section from "./Section";
import MapSearchInput from "./search/MapSearchInput";

const FIXED_ICON_SIZE = 24;

const Header = () => {
  const { darkModeStatus, setDarkModeStatus } = useDarkMode();

  return (
    <div className="header-wrapper">
      <Section>
        <div className="header">
          <SelfLogo />
          <MapSearchInput />
          <div className="setting">
            {/* <IconButton
              icon={<FaMoon size={18} />}
              fnClick={() => setDarkModeStatus(!darkModeStatus)}
            /> */}
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
      </Section>
    </div>
  );
};

export default Header;
