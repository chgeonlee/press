import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContenxt";

const SignupForm = () => {
  const { handleSignup, handleConfirmSingup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isConfirmStep, setIsConfirmStep] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 유효성 검사 등을 수행할 수 있습니다.

    // 회원가입 로직 호출
    handleSignup(email, password);
    setIsConfirmStep(true);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // 여기에서 유효성 검사 등을 수행할 수 있습니다.

    // 회원가입 로직 호출
    handleConfirmSingup(email, code);
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
        <button type="submit">회원가입</button>
      </form>
      {isConfirmStep && (
        <form onSubmit={handleSubmit2}>
          <label>
            code:
            <input
              type="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </label>
          <button type="submit">코드확인</button>
        </form>
      )}
    </React.Fragment>
  );
};

export default SignupForm;
