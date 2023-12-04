import { useContext, useEffect } from "react";
import useUser from "../hooks/useUser";
import { getNormal, getTest } from "../api";
import AuthContext from "../contexts/AuthContenxt";

const Home = () => {
  const userData = useUser();
  const { handleLogin, handleLogout } = useContext(AuthContext);

  return (
    <div>
      {JSON.stringify(userData)}
      <div>
        <button
          onClick={() => {
            handleLogin("cgcg7108@naver.com", "cndrjs85!!");
          }}
        >
          login cgcg7108@naver.com
        </button>
        <button
          onClick={() => {
            handleLogin("chgeon.lee@gmail.com", "cndrjs85!!");
          }}
        >
          login chgeon.lee@gmail.com
        </button>
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
