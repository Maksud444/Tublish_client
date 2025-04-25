import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./AdminOrders.scss";
import Loader from "../../components/loader/Loader";
import { FaTrash, FaEye, FaCheck, FaClock } from "react-icons/fa";

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const res = await newRequest.get("/admin/orders");
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, isCompleted }) => {
      return newRequest.put(`/admin/orders/${orderId}`, { isCompleted });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminOrders"]);
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId) => {
      return newRequest.delete(`/admin/orders/${orderId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminOrders"]);
      setSelectedOrder(null);
      setShowDeleteConfirm(false);
    },
  });

  const handleStatusChange = (orderId, isCompleted) => {
    updateStatusMutation.mutate({ orderId, isCompleted });
  };

  const handleDeleteOrder = (e, orderId) => {
    e.stopPropagation();
    setSelectedOrder(data.find(order => order._id === orderId));
    setShowDeleteConfirm(true);
  };

  const confirmDeleteOrder = () => {
    if (selectedOrder) {
      deleteOrderMutation.mutate(selectedOrder._id);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="error">Error loading orders!</div>;

  return (
    <div className="admin-orders">
      <h1>Order Management</h1>
      
      <div className="orders-container">
        <div className="orders-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Gig</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr 
                  key={order._id} 
                  className={selectedOrder?._id === order._id ? "selected" : ""}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>{order.buyerName || order.buyerId}</td>
                  <td>{order.sellerName || order.sellerId}</td>
                  <td>{order.title.substring(0, 20)}...</td>
                  <td>${order.price}</td>
                  <td>
                    <span className={`status ${order.isCompleted ? "completed" : "pending"}`}>
                      {order.isCompleted ? <FaCheck /> : <FaClock />}
                      {order.isCompleted ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="view-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => handleDeleteOrder(e, order._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedOrder && (
          <div className="order-details">
            <h3>Order Details</h3>
            <div className="detail-item">
              <span className="label">Order ID:</span>
              <span className="value">{selectedOrder._id}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Gig:</span>
              <span className="value">{selectedOrder.title}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Price:</span>
              <span className="value">${selectedOrder.price}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Buyer:</span>
              <span className="value">{selectedOrder.buyerName || selectedOrder.buyerId}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Seller:</span>
              <span className="value">{selectedOrder.sellerName || selectedOrder.sellerId}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Created:</span>
              <span className="value">
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="label">Status:</span>
              <div className="status-selector">
                <select 
                  value={selectedOrder.isCompleted ? "true" : "false"}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value === "true")}
                >
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="detail-actions">
              <button 
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Order
              </button>
            </div>
          </div>
        )}
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this order?</p>
            <p>Order ID: {selectedOrder?._id}</p>
            <p>This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={confirmDeleteOrder}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders; 