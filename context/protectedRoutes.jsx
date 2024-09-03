import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "./auth.context";

const useAuth = () => useContext(AuthContext);

const ProtectedRoute = () => {
  const useAuth = () => useContext(AuthContext);
  const { isLoggedIn } = useAuth;
};
