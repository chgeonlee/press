import useUser from "../hooks/useUser";
import { IconButton } from "./button/IconButton";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SelfLogo from "./icon/self/logo";
import Text, { TextSizeEnum, TextWeightEnum } from "./Text";

const Header = () => {
  const userData = useUser();
  const isLoggedIn = userData != null;
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo">
        <SelfLogo />
      </div>
      <div className="tail">
        <div className="user">
          {isLoggedIn ? (
            <div className="logged">
              {!userData.thumb ? (
                <img
                  src={
                    "data:image/jpeg;base64,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"
                  }
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="name-panel">
                  <Text size={TextSizeEnum.LG} weight={TextWeightEnum.BOLD}>
                    {(userData.email as string).charAt(0)}
                  </Text>
                </div>
              )}
            </div>
          ) : (
            <IconButton
              icon={<FaUserCircle size={32} />}
              fnClick={() => {
                navigate("/accounts/login");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
