import { useEffect, useState } from "react";
import press from "@/lib";
import { GlobalEventEnum } from "../../../../lib/constants";
const useUser = () => {
  const [user, setUser] = useState(press.user.state);

  useEffect(() => {
    const handler = () => {
      setUser(() => {
        if (press.user.state == null) return null;
        console.log("...", press.user.state);
        return { ...press.user.state };
      });
    };

    window.addEventListener("re" + GlobalEventEnum.CHANGED_USER_STATE, handler);

    return () => {
      window.addEventListener(
        "re" + GlobalEventEnum.CHANGED_USER_STATE,
        handler
      );
    };
  }, []);

  return {
    isLoggedIn: user !== null,
    userData: user,
    userName: user?.userName,
    userPics: user?.thumbnail,
  };
};

export default useUser;
