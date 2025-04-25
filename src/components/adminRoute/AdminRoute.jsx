import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Loader from "../loader/Loader";

const AdminRoute = ({ children }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await newRequest.get("/auth/me");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  
  if (error || !data) {
    return <Navigate to="/login" />;
  }

  if (!data.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute; 