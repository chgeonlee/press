import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { IUserProps } from "../resources/user";
import resources from "../resources";

export interface IAuthContextProps {
  user: string;
  setUser?(...args: unknown[]): unknown;
  userData: Partial<IUserProps>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
  children: ReactNode;
}
export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const STR_FACE_AUTHUSERNAME = "face_authUsername";
  const [user, setUser] = useState<string>(
    localStorage.getItem(STR_FACE_AUTHUSERNAME) || "",
  );
  const [userData, setUserData] = useState<Partial<IUserProps>>({});

  useEffect(() => {
    localStorage.setItem(STR_FACE_AUTHUSERNAME, user);
  }, [user]);

  useEffect(() => {
    if (user !== "") {
      setUserData(resources.user.getUserWithName(user));
    } else {
      setUserData({});
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      userData,
    }),
    [user, userData],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
