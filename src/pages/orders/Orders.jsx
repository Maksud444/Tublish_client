import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import Loader from "../../components/loader/Loader";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    try {
      // Determine if current user is seller or buyer
      const isSeller = currentUser.isSeller;
      const to = isSeller ? order.buyerId : order.sellerId;
      
      // Create a new conversation (the controller will check if it already exists)
      const res = await newRequest.post(`/conversations/`, { to });
      
      // Navigate to message
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      console.error("Error starting conversation:", err.response?.data || err.message);
      alert("Could not start conversation. Please try again.");
    }
  };

  // Filter orders based on active tab
  const filteredOrders = data ? 
    activeTab === "all" ? data : 
    activeTab === "completed" ? data.filter(order => order.isCompleted) : 
    data.filter(order => !order.isCompleted) : 
    [];

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        
        <div className="tabs">
          <button 
            className={activeTab === "all" ? "active" : ""} 
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button 
            className={activeTab === "inProgress" ? "active" : ""} 
            onClick={() => setActiveTab("inProgress")}
          >
            In Progress
          </button>
          <button 
            className={activeTab === "completed" ? "active" : ""} 
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>

        {isLoading ? (
          <Loader text="Loading your orders..." />
        ) : error ? (
          <div className="error">Error loading orders: {error.message}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found in this category.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th className="hide-mobile">Status</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img className="image" src={order.img} alt="" />
                    </td>
                    <td className="title-cell">
                      <span>{order.title}</span>
                      <span className="show-mobile status-mobile">
                        {order.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </td>
                    <td>${order.price}</td>
                    <td className="hide-mobile">
                      <span className={`status ${order.isCompleted ? "completed" : "in-progress"}`}>
                        {order.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="contact-button"
                        onClick={() => handleContact(order)}
                      >
                        <img
                          className="message-icon"
                          src="./img/message.png"
                          alt=""
                        />
                        <span className="show-mobile">Contact</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;