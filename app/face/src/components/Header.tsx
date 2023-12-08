import { FaUserCircle } from "react-icons/fa";
import SelfLogo from "./icon/self/logo";
import SelfMenu from "./icon/self/menu";
import { IconButton } from "./button/IconButton";
import Section from "./Section";
import MapSearchInput from "./search/MapSearchInput";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import useUser from "../hooks/useUser";
import AWSCognitoContext from "../contexts/cognitoContext";
import { useContext } from "react";

const FIXED_ICON_SIZE = 40;

const Header = () => {
  const viewport = useViewport();
  const { isLoggedIn, userPics } = useUser();
  const { login, logout } = useContext(AWSCognitoContext);

  return (
    <div className="header-wrapper">
      <Section>
        <div className="header">
          <SelfLogo />
          {viewport != ViewportEnum.MOBILE && <MapSearchInput />}
          <div className="setting">
            {/* <IconButton
              icon={<SelfMenu size={FIXED_ICON_SIZE} />}
              fnClick={() => {
                confirm("미구현");
              }}
            /> */}
            <div>
              {isLoggedIn == false ? (
                <IconButton
                  icon={<FaUserCircle size={32} />}
                  fnClick={() => {
                    login("chgeon.lee@gmail.com", "");
                  }}
                />
              ) : (
                <div onClick={() => logout()}>
                  <img
                    src={userPics}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 24,
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {viewport == ViewportEnum.MOBILE && (
          <div className="header-input">
            <MapSearchInput />
          </div>
        )}
      </Section>
    </div>
  );
};

export default Header;
