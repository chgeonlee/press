import { createRoot } from 'react-dom/client';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const children = (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

const container = document.getElementById('root');
createRoot(container as Element).render(children);
