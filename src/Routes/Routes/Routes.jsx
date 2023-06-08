import { createBrowserRouter } from "react-router-dom";

import LogIn from "../../Pages/LogIn/LogIn";
import Home from "../../Pages/Home/Home/Home";
import Error from "../../Pages/Error/Error";
import Certification from "../../Pages/Certification/Certification";
import MainLayout from "../../Layout/MainLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import DashboardLayout from "../../Layout/DashboardLayout";
import Profile from "../../Pages/Dashboard/Admin/Profile/Profile";
import AddEmployee from "../../Pages/Dashboard/Admin/AddEmployee/AddEmployee";

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
  {
    path: "/dashboard",
    errorElement: <Error />,
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addEmployee",
        element: (
          <PrivateRoute>
            <AddEmployee />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
