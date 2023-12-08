import React, { useState, useContext, useRef } from "react";
import AuthContext from "../contexts/AuthContenxt";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineKey } from "react-icons/ai";
import { PlainButton } from "./button/PlainButton";
import Text, { TextSizeEnum } from "./Text";
import { useNavigate } from "react-router-dom";
const SigninForm = () => {
  const [errMsg, setErrMsg] = useState<string | null>();
  const { handleLogin, handleLogout } = useContext(AuthContext);
  const idRef = useRef<HTMLInputElement>();
  const pwRef = useRef<HTMLInputElement>();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에서 유효성 검사 등을 수행할 수 있습니다.

    // 회원가입 로직 호출
    const result = await handleLogin(idRef.current.value, pwRef.current.value);
    if (result == false) {
      setErrMsg("로그인에 실패하였습니다.");
    } else {
      navigate("/");
    }
    console.log(idRef.current.value, pwRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <div className="row-id">
        <div className="icon">
          <AiOutlineMail size={18} />
        </div>
        <input
          type="email"
          ref={idRef}
          placeholder="email"
          required
          onChange={() => {
            setErrMsg(null);
          }}
        />
      </div>
      <div className="row-pw">
        <div className="icon">
          <AiOutlineKey size={18} />
        </div>
        <input ref={pwRef} type="password" placeholder="password" required />
      </div>
      {errMsg && (
        <div
          style={{
            color: "#993333",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text size={TextSizeEnum.MD}>{errMsg}</Text>
        </div>
      )}
      <button className="button" type="submit">
        <Text size={TextSizeEnum.MD}>로그인</Text>
      </button>
    </form>
  );
};

export default SigninForm;
