import React from "react";
import { ThemeProvider as StyledThemeProvider } from "react-jss";
import useDarkMode from "../hooks/useDarkMode";
import press from "@/lib";
import { ThemeModeEnum } from "../constants";

const lightTheme = {
  background: press.palette.white,
  card: press.palette.grey,
  text: press.palette.black,
  border: press.palette.grey,
  edge: press.palette.steel,
};

const darkTheme = {
  background: press.palette.black,
  card: press.palette.snow,
  text: press.palette.white,
  border: press.palette.steel,
  edge: press.palette.white,
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode } = useDarkMode();
  const theme = themeMode === ThemeModeEnum.DARK ? darkTheme : lightTheme;

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
