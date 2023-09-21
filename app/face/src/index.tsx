import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/index.scss';
import { ThemeContextProvider } from './contexts/themeContext';
import { ThemeProvider } from './providers/themeProvider';

const children = (
    <ThemeContextProvider>
        <ThemeProvider>
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </ThemeProvider>
    </ThemeContextProvider>
);

const container = document.getElementById('root');
createRoot(container as Element).render(children);
