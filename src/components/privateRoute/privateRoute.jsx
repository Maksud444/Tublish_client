import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // If no user is logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the children (protected component)
  return children;
};

export default PrivateRoute;