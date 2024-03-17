import React from "react";

import { Navigate, Outlet } from "react-router-dom";

// TODO - Add automatic redirection from login/register if user logged in already
const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("accessToken");

  return localStorageToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
