import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./AdminDashboard.scss";
import Loader from "../../components/loader/Loader";
import { FaUsers, FaBriefcase, FaShoppingCart, FaDollarSign, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await newRequest.get("/admin/dashboard");
      return res.data;
    },
  });

  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (error) return <div className="error">Error loading dashboard data!</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-subtitle">Platform overview and statistics</p>
      </div>
      
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-value">{data.stats.totalUsers || 0}</p>
            <p className="stat-label">Registered accounts</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon gigs">
            <FaBriefcase />
          </div>
          <div className="stat-info">
            <h3>Total Gigs</h3>
            <p className="stat-value">{data.stats.totalGigs || 0}</p>
            <p className="stat-label">Available services</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{data.stats.totalOrders || 0}</p>
            <p className="stat-label">Processed transactions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">${data.stats.revenue || 0}</p>
            <p className="stat-label">Gross earnings</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="section-card recent-orders">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button className="view-all-btn" onClick={() => navigate("/admin/orders")}>View All</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Buyer</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders && data.recentOrders.length > 0 ? (
                  data.recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.title}</td>
                      <td>{order.buyerName || "Unknown"}</td>
                      <td>${order.price}</td>
                      <td>
                        <span className={`status-badge ${order.isCompleted ? "completed" : "pending"}`}>
                          {order.isCompleted ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="section-card top-gigs">
          <div className="section-header">
            <h2>Top Selling Gigs</h2>
            <button className="view-all-btn" onClick={() => navigate("/admin/gigs")}>View All</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Seller</th>
                  <th>Sales</th>
                </tr>
              </thead>
              <tbody>
                {data.topGigs && data.topGigs.length > 0 ? (
                  data.topGigs.map((gig) => (
                    <tr key={gig._id}>
                      <td>{gig.title}</td>
                      <td>{gig.cat}</td>
                      <td>${gig.price}</td>
                      <td>{gig.sellerName || "Unknown"}</td>
                      <td>{gig.sales}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">No gigs data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="performance-metrics">
        <h2>Performance Metrics</h2>
        <div className="metrics-cards">
          <div className="metric-card">
            <div className="metric-icon">
              <FaUsers />
            </div>
            <div className="metric-info">
              <h3>Total Sellers</h3>
              <p className="metric-value">{data.stats.totalSellers || 0}</p>
              <p className="metric-label">Active providers</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">
              <FaShoppingCart />
            </div>
            <div className="metric-info">
              <h3>Completed Orders</h3>
              <p className="metric-value">{data.stats.completedOrders || 0}</p>
              <p className="metric-label">Successful transactions</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">
              <FaChartLine />
            </div>
            <div className="metric-info">
              <h3>Conversion Rate</h3>
              <p className="metric-value">
                {data.stats.totalOrders && data.stats.completedOrders
                  ? Math.round((data.stats.completedOrders / data.stats.totalOrders) * 100)
                  : 0}%
              </p>
              <p className="metric-label">Order completion rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 