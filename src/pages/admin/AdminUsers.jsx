import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./AdminUsers.scss";
import Loader from "../../components/loader/Loader";

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await newRequest.get("/admin/users");
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedUser) => {
      return newRequest.put(`/admin/users/${updatedUser._id}`, updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUsers"]);
      setIsEditing(false);
      setSelectedUser(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId) => {
      return newRequest.delete(`/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUsers"]);
      setSelectedUser(null);
    },
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(userId);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="error">Error loading users!</div>;

  return (
    <div className="admin-users">
      <h1>User Management</h1>
      
      <div className="users-container">
        <div className="users-list">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Country</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr 
                  key={user._id} 
                  className={selectedUser?._id === user._id ? "selected" : ""}
                  onClick={() => setSelectedUser(user)}
                >
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>
                    {user.isAdmin ? "Admin" : user.isSeller ? "Seller" : "Buyer"}
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="view-btn"
                        onClick={() => setSelectedUser(user)}
                      >
                        View
                      </button>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {isEditing ? (
          <div className="user-edit">
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username || ""} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email || ""} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Country</label>
                <input 
                  type="text" 
                  name="country" 
                  value={formData.country || ""} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    name="isSeller" 
                    checked={formData.isSeller || false} 
                    onChange={handleChange}
                  />
                  Seller
                </label>
              </div>
              
              <div className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    name="isAdmin" 
                    checked={formData.isAdmin || false} 
                    onChange={handleChange}
                  />
                  Admin
                </label>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedUser(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : selectedUser ? (
          <div className="user-details">
            <h3>User Details</h3>
            <div className="detail-item">
              <span className="label">ID:</span>
              <span className="value">{selectedUser._id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Username:</span>
              <span className="value">{selectedUser.username}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{selectedUser.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Country:</span>
              <span className="value">{selectedUser.country}</span>
            </div>
            <div className="detail-item">
              <span className="label">Role:</span>
              <span className="value">
                {selectedUser.isAdmin ? "Admin" : selectedUser.isSeller ? "Seller" : "Buyer"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Joined:</span>
              <span className="value">
                {new Date(selectedUser.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="detail-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(selectedUser)}
              >
                Edit User
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(selectedUser._id)}
              >
                Delete User
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminUsers; 