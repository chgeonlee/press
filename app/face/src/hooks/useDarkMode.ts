import { useContext } from 'react';
import ThemeContext from '../contexts/themeContext';
import { ThemeModeEnum } from '../constants';

export default function useDarkMode() {
    const ctx = useContext(ThemeContext);

    if (!ctx) {
        throw new Error('useDarkMode must be used within a ThemeContextProvider');
    }

    const { darkModeStatus, setDarkModeStatus } = ctx;
    const themeMode: ThemeModeEnum = darkModeStatus ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;

    return { themeMode, darkModeStatus, setDarkModeStatus };
}
