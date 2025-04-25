import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./AdminGigs.scss";
import Loader from "../../components/loader/Loader";
import { FaTrash, FaEye, FaExternalLinkAlt, FaStar } from "react-icons/fa";

const AdminGigs = () => {
  const [selectedGig, setSelectedGig] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["adminGigs"],
    queryFn: async () => {
      const res = await newRequest.get("/admin/gigs");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (gigId) => {
      return newRequest.delete(`/admin/gigs/${gigId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminGigs"]);
      setSelectedGig(null);
      setShowDeleteConfirm(false);
    },
  });

  const handleDeleteGig = (e, gigId) => {
    e.stopPropagation();
    setSelectedGig(data.find(gig => gig._id === gigId));
    setShowDeleteConfirm(true);
  };

  const confirmDeleteGig = () => {
    if (selectedGig) {
      deleteMutation.mutate(selectedGig._id);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="error">Error loading gigs!</div>;

  return (
    <div className="admin-gigs">
      <h1>Gig Management</h1>
      
      <div className="gigs-container">
        <div className="gigs-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Seller</th>
                <th>Rating</th>
                <th>Sales</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr 
                  key={gig._id} 
                  className={selectedGig?._id === gig._id ? "selected" : ""}
                  onClick={() => setSelectedGig(gig)}
                >
                  <td className="gig-title">
                    <div className="gig-title-with-image">
                      <img src={gig.cover} alt={gig.title} className="gig-thumbnail" />
                      <span>{gig.title.length > 30 ? `${gig.title.substring(0, 30)}...` : gig.title}</span>
                    </div>
                  </td>
                  <td>{gig.cat}</td>
                  <td>${gig.price}</td>
                  <td>{gig.username || gig.sellerName || "Unknown"}</td>
                  <td className="rating">
                    {gig.starNumber > 0 ? (
                      <span>
                        <FaStar className="star-icon" />
                        {(gig.totalStars / gig.starNumber).toFixed(1)}
                      </span>
                    ) : (
                      "No ratings"
                    )}
                  </td>
                  <td>{gig.sales}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="view-btn"
                        onClick={() => setSelectedGig(gig)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => handleDeleteGig(e, gig._id)}
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
        
        {selectedGig && (
          <div className="gig-details">
            <h3>Gig Details</h3>
            
            <div className="gig-images">
              <img 
                src={selectedGig.cover} 
                alt="Gig Cover" 
                className="cover-image"
              />
              <div className="image-gallery">
                {selectedGig.images?.map((img, index) => (
                  <img key={index} src={img} alt={`Gig image ${index + 1}`} />
                ))}
              </div>
            </div>
            
            <div className="detail-item">
              <span className="label">Title:</span>
              <span className="value">{selectedGig.title}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Category:</span>
              <span className="value">{selectedGig.cat}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Price:</span>
              <span className="value">${selectedGig.price}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Seller:</span>
              <span className="value">{selectedGig.username || selectedGig.sellerName || "Unknown"}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Rating:</span>
              <span className="value rating">
                {selectedGig.starNumber > 0 ? (
                  <>
                    <FaStar className="star-icon" />
                    {(selectedGig.totalStars / selectedGig.starNumber).toFixed(1)} 
                    <span className="rating-count">({selectedGig.starNumber} reviews)</span>
                  </>
                ) : (
                  "No ratings yet"
                )}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="label">Sales:</span>
              <span className="value">{selectedGig.sales}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Description:</span>
              <p className="value desc">{selectedGig.desc}</p>
            </div>
            
            <div className="detail-item">
              <span className="label">Short Description:</span>
              <p className="value">{selectedGig.shortDesc}</p>
            </div>
            
            <div className="detail-item">
              <span className="label">Delivery Time:</span>
              <span className="value">{selectedGig.deliveryTime} days</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Revision Number:</span>
              <span className="value">{selectedGig.revisionNumber}</span>
            </div>
            
            <div className="detail-item">
              <span className="label">Features:</span>
              <ul className="features-list">
                {selectedGig.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="detail-actions">
              <button 
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <FaTrash /> Delete Gig
              </button>
              <a 
                href={`/gig/${selectedGig._id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-site-btn"
              >
                <FaExternalLinkAlt /> View on Site
              </a>
            </div>
          </div>
        )}
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this gig?</p>
            <p>Title: {selectedGig?.title}</p>
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
                onClick={confirmDeleteGig}
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

export default AdminGigs; 