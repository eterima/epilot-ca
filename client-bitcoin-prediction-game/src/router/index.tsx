import React from "react";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import { Game } from "../pages/game/Game";

export const customRouter = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoutes />,
    children: [{ path: "/", element: <Game /> }],
  },
]);
