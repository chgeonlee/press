import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
import "./styles/index.scss";
import { ThemeContextProvider } from "./contexts/themeContext";
import { ThemeProvider } from "./providers/themeProvider";
import { AuthContextProvider } from "./contexts/authContext";
import { AWSCognitoProvider } from "./contexts/cognitoContext";

// const children = (
//   <AuthContextProvider>
//     <ThemeContextProvider>
//       <React.StrictMode>
//         <ThemeProvider>
//           <RouterProvider router={router} />
//         </ThemeProvider>
//       </React.StrictMode>
//     </ThemeContextProvider>
//   </AuthContextProvider>
// );

const children = (
  <AWSCognitoProvider>
    <ThemeContextProvider>
      <React.StrictMode>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </React.StrictMode>
    </ThemeContextProvider>
  </AWSCognitoProvider>
);

const container = document.getElementById("root");
createRoot(container as Element).render(children);
