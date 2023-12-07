import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContenxt";

const SigninForm = () => {
  const { handleLogin, handleLogout } = useContext(AuthContext);
  const [email, setEmail] = useState("chgeon.lee@gmail.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 유효성 검사 등을 수행할 수 있습니다.

    // 회원가입 로직 호출
    handleLogin(email, password);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </React.Fragment>
  );
};

export default SigninForm;
