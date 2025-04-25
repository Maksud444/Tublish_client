import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./AdminReviews.scss";
import Loader from "../../components/loader/Loader";
import { FaTrash, FaEye, FaExternalLinkAlt, FaStar, FaQuestionCircle } from "react-icons/fa";

const AdminReviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["adminReviews"],
    queryFn: async () => {
      const res = await newRequest.get("/admin/reviews");
      console.log("Review data:", res.data); // Debug log to see what's coming from API
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId) => {
      return newRequest.delete(`/admin/reviews/${reviewId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminReviews"]);
      setSelectedReview(null);
      setShowDeleteConfirm(false);
    },
  });

  const handleDeleteReview = (e, reviewId) => {
    e.stopPropagation();
    setSelectedReview(data.find(review => review._id === reviewId));
    setShowDeleteConfirm(true);
  };

  const confirmDeleteReview = () => {
    if (selectedReview) {
      deleteMutation.mutate(selectedReview._id);
    }
  };

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array(rating).fill().map((_, i) => (
      <FaStar key={i} className="star-icon" />
    ));
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="error">Error loading reviews: {error.message}</div>;
  if (!data || data.length === 0) return <div className="no-data">No reviews found</div>;

  return (
    <div className="admin-reviews">
      <h1>Review Management</h1>
      
      <div className="reviews-container">
        <div className="reviews-list">
          <table>
            <thead>
              <tr>
                <th>Gig</th>
                <th>Reviewer</th>
              
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((review) => (
                <tr 
                  key={review._id} 
                  className={selectedReview?._id === review._id ? "selected" : ""}
                  onClick={() => setSelectedReview(review)}
                >
                  <td className="gig-title">
                    {review.gigTitle || <span className="unknown"><FaQuestionCircle /> Unknown Gig</span>}
                  </td>
                  <td className="user-info">
                    {review.userImg ? (
                      <img 
                        src={review.userImg} 
                        alt={review.username} 
                        className="user-avatar"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {(review.username || review.reviewerName || "U")[0].toUpperCase()}
                      </div>
                    )}
                    <span>{review.username || review.reviewerName || <span className="unknown">Unknown User</span>}</span>
                  </td>
                  <td className="user-info">
                    {review.sellerImg ? (
                      <img 
                        src={review.sellerImg} 
                        alt={review.sellerName} 
                        className="user-avatar"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {(review.sellerName || "S")[0].toUpperCase()}
                      </div>
                    )}
                    <span>{review.sellerName || <span className="unknown">Unknown Seller</span>}</span>
                  </td>
                  <td>
                    <div className="stars">
                      {review.star ? renderStars(review.star) : <span className="unknown">No rating</span>}
                    </div>
                  </td>
                  <td>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Unknown date"}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="view-btn"
                        onClick={() => setSelectedReview(review)}
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => handleDeleteReview(e, review._id)}
                        title="Delete review"
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
        
        {selectedReview && (
          <div className="review-details">
            <h3>Review Details</h3>
            
            <div className="user-profile">
              {selectedReview.userImg ? (
                <img 
                  src={selectedReview.userImg} 
                  alt={selectedReview.username} 
                  className="user-avatar"
                />
              ) : (
                <div className="avatar-placeholder">
                  {(selectedReview.username || selectedReview.reviewerName || "U")[0].toUpperCase()}
                </div>
              )}
              <div className="user-info">
                <h4>{selectedReview.username || selectedReview.reviewerName || "Unknown User"}</h4>
                <div className="stars">
                  {selectedReview.star ? renderStars(selectedReview.star) : <span>No rating</span>}
                </div>
              </div>
            </div>
            
            <div className="review-comment">
              <p>{selectedReview.desc || "No review description provided."}</p>
              <span className="review-date">
                {selectedReview.createdAt ? new Date(selectedReview.createdAt).toLocaleString() : "Unknown date"}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="label">Gig:</span>
              <span className="value">{selectedReview.gigTitle || "Unknown Gig"}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Seller:</span>
              <div className="user-info-small">
                {selectedReview.sellerImg ? (
                  <img 
                    src={selectedReview.sellerImg} 
                    alt={selectedReview.sellerName} 
                    className="user-avatar-small"
                  />
                ) : (
                  <div className="avatar-placeholder small">
                    {(selectedReview.sellerName || "S")[0].toUpperCase()}
                  </div>
                )}
                <span>{selectedReview.sellerName || "Unknown Seller"}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="label">Review ID:</span>
              <span className="value id-value">{selectedReview._id}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Gig ID:</span>
              <span className="value id-value">{selectedReview.gigId || "Unknown"}</span>
            </div>
            
            <div className="detail-actions">
              <button 
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <FaTrash /> Delete Review
              </button>
              {selectedReview.gigId && (
                <a 
                  href={`/gig/${selectedReview.gigId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-gig-btn"
                >
                  <FaExternalLinkAlt /> View Gig
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <p>This action cannot be undone and will affect the gig's rating.</p>
            
            <div className="review-preview">
              <div className="stars">
                {selectedReview?.star ? renderStars(selectedReview.star) : <span>No rating</span>}
              </div>
              <p>{selectedReview?.desc || "No description"}</p>
              <p className="review-by">
                By: {selectedReview?.username || selectedReview?.reviewerName || "Unknown User"}
              </p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={confirmDeleteReview}
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

export default AdminReviews; 