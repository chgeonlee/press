import {
  createContext,
  useLayoutEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";

export interface IThemeContextProps {
  darkModeStatus: boolean;
  setDarkModeStatus: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
}

const ThemeContext = createContext<IThemeContextProps>(
  {} as IThemeContextProps,
);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const STR_DARKMODE_STATUS = "face_darkmode_status";
  const storedDarkModeValue = localStorage.getItem(STR_DARKMODE_STATUS);

  const [darkModeStatus, setDarkModeStatus] = useState(
    storedDarkModeValue ? storedDarkModeValue === "true" : false,
  );

  useLayoutEffect(() => {
    localStorage.setItem(STR_DARKMODE_STATUS, darkModeStatus.toString());
  }, [darkModeStatus]);

  const values: IThemeContextProps = useMemo(
    () => ({
      darkModeStatus,
      setDarkModeStatus,
    }),
    [darkModeStatus],
  );

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
