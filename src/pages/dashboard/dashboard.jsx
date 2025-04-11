import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import newRequest from "../../utils/newRequest.js";
import "./dashboard.scss";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
      <h1>{user.isSeller ? "Seller Dashboard" : "Buyer Dashboard"}</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Country:</strong> {user.country}
          </p>
          <p>
            <strong>Description:</strong> {user.desc}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      {user.isSeller ? (
        <div>
          <h2>Seller Features</h2>
          {/* Link to Add New Gig page */}
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
          {/* Link to View My Gigs page */}
          <Link to="/mygigs">
            <button>View My Gigs</button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>Buyer Features</h2>
          <Link to="/orders">
          <button>View Orders</button>
          </Link>

          <Link to="/gigs">
          <button>Browse Gigs</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;