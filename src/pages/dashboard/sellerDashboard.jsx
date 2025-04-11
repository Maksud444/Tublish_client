import React from "react";

const SellerDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <h1>Seller Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
      <p>Country: {user.country}</p>
      <p>Description: {user.desc}</p>
      {/* Add seller-specific features here */}
      <button>Add New Gig</button>
      <button>View My Gigs</button>
    </div>
  );
};

export default SellerDashboard;