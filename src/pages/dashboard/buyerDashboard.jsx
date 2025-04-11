import React from "react";

const BuyerDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <h1>Buyer Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
      <p>Country: {user.country}</p>
      <p>Description: {user.desc}</p>
      {/* Add buyer-specific features here */}
    </div>
  );
};

export default BuyerDashboard;