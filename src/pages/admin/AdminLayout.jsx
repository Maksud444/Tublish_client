import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import "./Admin.scss";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout; 