/**
 * Router 정의
 */

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/Root";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
