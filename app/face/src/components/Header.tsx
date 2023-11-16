import { FaUserCircle } from "react-icons/fa";
import SelfLogo from "./icon/self/logo";
import SelfMenu from "./icon/self/menu";
import { IconButton } from "./button/IconButton";
import Section from "./Section";
import MapSearchInput from "./search/MapSearchInput";
import useViewport, { ViewportEnum } from "../hooks/useViewport";

const FIXED_ICON_SIZE = 24;

const Header = () => {
  const viewport = useViewport();

  return (
    <div className="header-wrapper">
      <Section>
        <div className="header">
          <SelfLogo />
          {viewport != ViewportEnum.MOBILE && <MapSearchInput />}
          <div className="setting">
            {/* <IconButton
              icon={<FaMoon size={18} />}
              fnClick={() => setDarkModeStatus(!darkModeStatus)}
            /> */}
            <div>
              <IconButton
                icon={<SelfMenu size={FIXED_ICON_SIZE} />}
                fnClick={() => {
                  confirm("미구현");
                }}
              />
            </div>
            <div>
              <IconButton
                icon={<FaUserCircle size={FIXED_ICON_SIZE} />}
                fnClick={() => {
                  confirm("미구현");
                }}
              />
            </div>
          </div>
        </div>
        {viewport == ViewportEnum.MOBILE && (
          <div style={{ marginBottom: 12, width: "100%" }}>
            <MapSearchInput />
          </div>
        )}
      </Section>
    </div>
  );
};

export default Header;
