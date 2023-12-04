import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import { AuthContextProvider } from "./contexts/AuthContenxt";

const children = (
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

const container = document.getElementById("root");
createRoot(container as Element).render(children);
