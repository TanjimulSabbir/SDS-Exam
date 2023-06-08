import { createBrowserRouter } from "react-router-dom";

import LogIn from "../../Pages/LogIn/LogIn";
import Home from "../../Pages/Home/Home/Home";
import Error from "../../Pages/Error/Error";
import Certification from "../../Pages/Certification/Certification";
import MainLayout from "../../Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/certifications",
        element: <Certification />,
      },
    ],
  },
]);
