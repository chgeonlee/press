import { useEffect, useLayoutEffect, useState } from "react";
import { GlobalEventEnum } from "../../../../lib/constants";
import { UserDataContainer } from "../contexts/AuthContenxt";

//user에 필요한것은 email, thumbnail
const mapper = (data) => {
  if (data == null || Object.keys(data).length == 0) return null;
  return {
    email: data.email,
    thumb: data.thumbnail,
  };
};

const useUser = () => {
  const userData = UserDataContainer.instance;
  const [data, setData] = useState(mapper(userData.attribute));

  useLayoutEffect(() => {
    const handler = () => {
      setData(mapper(userData.attribute));
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
