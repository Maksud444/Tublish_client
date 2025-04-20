import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Loader from "../../components/loader/Loader";

function MyGigs() {
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>My Gigs</h1>
          {currentUser?.isSeller && (
            <Link to="/add">
              <button style={{width: "200px"}}>Add New Gig</button>
            </Link>
          )}
        </div>
        
        {isLoading ? (
          <Loader text="Loading your gigs..." />
        ) : error ? (
          <div className="error">Error loading gigs: {error.message}</div>
        ) : data.length === 0 ? (
          <div className="no-gigs">
            <p>You don't have any gigs yet.</p>
            <Link to="/add" className="create-first">
              Create your first gig
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img className="image" src={gig.cover} alt="" />
                    </td>
                    <td>
                      <Link to={`/gig/${gig._id}`} className="gig-title">
                        {gig.title}
                      </Link>
                    </td>
                    <td>${gig.price}</td>
                    <td>{gig.sales || 0}</td>
                    <td>
                      <div className="actions">
                        {/* <Link to={`/edit-gig/${gig._id}`} className="edit-btn">
                          Edit
                        </Link> */}
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(gig._id)}
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
        )}
        
        <div className="mobile-gigs">
          {!isLoading && !error && data && data.map((gig) => (
            <div className="gig-card" key={gig._id}>
              <div className="gig-image">
                <img src={gig.cover} alt="" />
              </div>
              <div className="gig-info">
                <h3>
                  <Link to={`/gig/${gig._id}`}>{gig.title}</Link>
                </h3>
                <div className="gig-details">
                  <span className="price">${gig.price}</span>
                  <span className="sales">{gig.sales || 0} sales</span>
                </div>
                <div className="gig-actions">
                  {/* <Link to={`/edit-gig/${gig._id}`} className="edit-btn">
                    Edit
                  </Link> */}
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(gig._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyGigs;