import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import newRequest from "../../utils/newRequest.js";
import "./dashboard.scss";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await newRequest.get(`/users/${currentUser._id}`);
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.put(`/users/${currentUser._id}`, formData);
      setUser(res.data); // Update the user state with the new data
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>{user.isSeller ? "Seller Dashboard" : "Buyer Dashboard"}</h1>
        </div>
        
        <div className="dashboard-content">
          <div className="profile-section">
            <h2>Profile Information</h2>
            
            {isEditing ? (
              <form className="edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    id="desc"
                    name="desc"
                    value={formData.desc || ""}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save</button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(user); // Reset form data to current user data
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <span className="label">Username:</span>
                  <span className="value">{user.username}</span>
                </div>
                
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                
                <div className="info-item">
                  <span className="label">Country:</span>
                  <span className="value">{user.country || "Not specified"}</span>
                </div>
                
                <div className="info-item">
                  <span className="label">Description:</span>
                  <p className="value description">{user.desc || "No description provided."}</p>
                </div>
                
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          
          <div className="features-section">
            <h2>{user.isSeller ? "Seller Features" : "Buyer Features"}</h2>
            
            <div className="features-grid">
              {user.isSeller ? (
                <>
                  <Link to="/add" className="feature-card">
                    {/* <div className="icon">
                      <i className="fa fa-plus-circle"></i>
                    </div> */}
                    <h3>Add New Gig</h3>
                    <p>Create a new service to offer to potential buyers</p>
                  </Link>
                  
                  <Link to="/mygigs" className="feature-card">
                    {/* <div className="icon">
                      <i className="fa fa-list"></i>
                    </div> */}
                    <h3>View My Gigs</h3>
                    <p>Manage your existing services and check their performance</p>
                  </Link>
                  
                  <Link to="/orders" className="feature-card">
                    {/* <div className="icon">
                      <i className="fa fa-shopping-cart"></i>
                    </div> */}
                    <h3>View Orders</h3>
                    <p>Check and manage orders from your customers</p>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/orders" className="feature-card">
                    {/* <div className="icon">
                      <i className="fa fa-shopping-cart"></i>
                    </div> */}
                    <h3>View Orders</h3>
                    <p>Check the status of your purchases</p>
                  </Link>
                  
                  <Link to="/gigs" className="feature-card">
                    {/* <div className="icon">
                      <i className="fa fa-search"></i>
                    </div> */}
                    <h3>Browse Gigs</h3>
                    <p>Find services that match your needs</p>
                  </Link>
                  
                  <Link to="/messages" className="feature-card">
                    {/* <div className="icon">
                      <i className="fa fa-envelope"></i>
                    </div> */}
                    <h3>Messages</h3>
                    <p>Communicate with sellers about your orders</p>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;