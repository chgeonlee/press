import { useEffect, useLayoutEffect, useState } from "react";
import { GlobalEventEnum } from "../../../../lib/constants";
import { UserDataContainer } from "../contexts/AuthContenxt";

const useUser = () => {
  const userData = UserDataContainer.instance;
  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    const handler = () => {
      setData(userData.attribute);
    };

    window.addEventListener(
      "re" + GlobalEventEnum.CHANGED_USER_CONFIG,
      handler
    );

    handler();

    return () => {
      window.removeEventListener(
        "re" + GlobalEventEnum.CHANGED_USER_CONFIG,
        handler
      );
    };
  }, []);

  return data;
};

export default useUser;
