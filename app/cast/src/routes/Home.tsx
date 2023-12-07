import { useCallback, useContext, useEffect, useMemo } from "react";
import useUser from "../hooks/useUser";
import { apiGetPosts, getNormal, getTest } from "../api";
import AuthContext from "../contexts/AuthContenxt";
import SignupForm from "../components/Signup";
import SigninForm from "../components/Signin";

const Home = () => {
  const userData = useUser();
  const { handleLogin, handleLogout } = useContext(AuthContext);
  const record = useCallback(async () => {
    await apiGetPosts();
  }, []);

  useEffect(() => {
    record();
  }, []);

  return (
    <div>
      {JSON.stringify(userData)}
      <div>
        <SignupForm />
        <SigninForm />
        <button
          onClick={() => {
            handleLogout();
          }}
        >
          logout
        </button>
        <div>
          <button
            onClick={() => {
              getTest();
            }}
          >
            API Test
          </button>
          <button
            onClick={() => {
              getNormal();
            }}
          >
            API Normal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
