import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.scss";
import { 
  FaChartLine, 
  FaUsers, 
  FaBriefcase, 
  FaShoppingCart, 
  FaStar, 
  FaArrowLeft 
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="admin-sidebar">
      <div className="logo">
        <Link to="/">
          <h2>Tupublish</h2>
          <span>Admin</span>
        </Link>
      </div>
      
      <ul className="menu">
        <li className={isActive("/admin")}>
          <Link to="/admin">
            <FaChartLine />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={isActive("/admin/users")}>
          <Link to="/admin/users">
            <FaUsers />
            <span>Users</span>
          </Link>
        </li>
        <li className={isActive("/admin/gigs")}>
          <Link to="/admin/gigs">
            <FaBriefcase />
            <span>Gigs</span>
          </Link>
        </li>
        <li className={isActive("/admin/orders")}>
          <Link to="/admin/orders">
            <FaShoppingCart />
            <span>Orders</span>
          </Link>
        </li>
        <li className={isActive("/admin/reviews")}>
          <Link to="/admin/reviews">
            <FaStar />
            <span>Reviews</span>
          </Link>
        </li>
      </ul>
      
      <div className="admin-footer">
        <Link to="/" className="back-to-site">
          <FaArrowLeft />
          <span>Back to Site</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar; 