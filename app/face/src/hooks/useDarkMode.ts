import { useContext } from "react";
import ThemeContext from "../contexts/themeContext";
import { ThemeModeEnum } from "../constants";

export default function useDarkMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a ThemeContextProvider");
  }

  const { darkModeStatus, setDarkModeStatus } = context;
  const themeMode: ThemeModeEnum = darkModeStatus
    ? ThemeModeEnum.DARK
    : ThemeModeEnum.LIGHT;

  return { themeMode, darkModeStatus, setDarkModeStatus };
}
