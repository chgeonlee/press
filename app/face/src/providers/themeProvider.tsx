import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'react-jss';
import useDarkMode from '../hooks/useDarkMode';
import press from '@/lib/press';
import { ThemeModeEnum } from '../constants';

const lightTheme = {
    background: press.palette.white,
    text: press.palette.black,
};

const darkTheme = {
    background: press.palette.black,
    text: press.palette.white,
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { themeMode } = useDarkMode();

    const theme = themeMode === ThemeModeEnum.DARK ? darkTheme : lightTheme;

    return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
