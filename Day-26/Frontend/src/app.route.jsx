import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Potected from "./features/auth/components/Potected";
import Home from './features/home/pages/Home'

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Potected>
        <Home />
      </Potected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
