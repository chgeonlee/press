/**
 * Router 정의
 */

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/Root";
import Home from "./routes/Home";
import WideLayout from "./layout/Wide";
import CompactLayout from "./layout/Compact";
import Signin from "./routes/Signin";

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
  {
    path: "/accounts",
    element: <CompactLayout />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
    ],
  },
  // {
  //   path: "/test",
  //   element: <WideLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <Home />,
  //     },
  //   ],
  // },
]);

export default router;
