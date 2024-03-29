import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Users from "./routes/Users";
import Home from "./routes/Home";
import Room from "./routes/Room";
import Device from "./routes/Device";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "room/:id",
        element: <Room />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
  {
    path: "/device",
    element: <Device />,
  },
]);

export default router;
