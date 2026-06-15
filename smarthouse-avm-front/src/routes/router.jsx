import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        index:true, 
        path: "/home",
        element: <Home />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);