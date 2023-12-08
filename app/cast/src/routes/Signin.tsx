import { useCallback, useContext, useEffect, useMemo } from "react";
import useUser from "../hooks/useUser";
import { apiGetPosts, getNormal, getTest } from "../api";
import AuthContext from "../contexts/AuthContenxt";
import SignupForm from "../components/Signup";
import SigninForm from "../components/Signin";
import SelfLogo from "../components/icon/self/logo";
import Text, { TextSizeEnum, TextWeightEnum } from "../components/Text";

const Signin = () => {
  const userData = useUser();
  const { handleLogin, handleLogout } = useContext(AuthContext);
  const record = useCallback(async () => {
    await apiGetPosts();
  }, []);

  useEffect(() => {
    record();
  }, []);

  return (
    <div className="signin">
      <div className="logo">
        <SelfLogo />
      </div>
      <SigninForm />
      <div
        style={{
          borderBottom: "1px solid #d9d9e9",
          width: "100%",
          margin: "12px 0",
        }}
      />
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Text size={TextSizeEnum.SM}>계정이 없으신가요?</Text>
        <div style={{ color: "#3333aa" }}>
          <Text size={TextSizeEnum.SM} weight={TextWeightEnum.BOLDER}>
            가입하기
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Signin;
