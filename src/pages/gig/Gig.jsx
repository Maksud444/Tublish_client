import React, { useState } from "react";
import "./Gig.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import Reviews from "../../components/reviews/Reviews.jsx";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  const toggleDescription = () => {
    setShowFullDesc(!showFullDesc);
  };

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const handleContact = async () => {
    if (!currentUser) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    
    try {
      // Determine if current user is seller or buyer
      const isSeller = currentUser.isSeller;
      
      // If the current user is the seller of this gig, they can't contact themselves
      if (isSeller && userId === currentUser._id) {
        alert("You cannot contact yourself.");
        return;
      }
      
      const to = userId; // The gig owner's ID
      
      // Create a new conversation (the controller will check if it already exists)
      const res = await newRequest.post(`/conversations/`, { to });
      
      // Navigate to message
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      console.error("Error starting conversation:", err.response?.data || err.message);
      alert("Could not start conversation. Please try again.");
    }
  };

  return (
    <div className="gig">
      {isLoading ? (
        <div className="loading">Loading gig details...</div>
      ) : error ? (
        <div className="error">Something went wrong! {error.message}</div>
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              <Link to="/">Fiverr</Link> &gt; <Link to="/gigs">Graphics & Design</Link> &gt;
            </span>
            <h1>{data.title}</h1>
            
            {isLoadingUser ? (
              <div className="loading-user">Loading seller info...</div>
            ) : errorUser ? (
              <div className="error-user">Couldn't load seller info</div>
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt={dataUser.username}
                />
                <span className="username">{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      ?.map((item, i) => (
                        <img src="/img/star.png" alt="star" key={i} />
                      ))}
                    <span className="rating">{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="image-gallery">
              <div className="main-image">
                <img 
                  src={data.images && data.images.length > 0 
                    ? data.images[currentImage] 
                    : data.cover || "/img/noimage.jpg"} 
                  alt="Gig main" 
                />
              </div>
              {data.images && data.images.length > 1 && (
                <div className="thumbnails">
                  {data.images.map((img, i) => (
                    <div 
                      key={i} 
                      className={`thumbnail ${i === currentImage ? "active" : ""}`}
                      onClick={() => handleImageChange(i)}
                    >
                      <img src={img} alt={`Thumbnail ${i+1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          
            <h2>About This Gig</h2>
            <div className="description">
              <p className={showFullDesc ? "full" : "truncated"}>
                {data.desc}
              </p>
              {data.desc && data.desc.length > 300 && (
                <button className="read-more" onClick={toggleDescription}>
                  {showFullDesc ? "Show Less" : "Read More"}
                </button>
              )}
            </div>
            
            {isLoadingUser ? (
              <div className="loading-user">Loading seller info...</div>
            ) : errorUser ? (
              <div className="error-user">Couldn't load seller info</div>
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img 
                    src={dataUser.img || "/img/noavatar.jpg"} 
                    alt={dataUser.username} 
                  />
                  <div className="info">
                    <span className="username">{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          ?.map((item, i) => (
                            <img src="/img/star.png" alt="star" key={i} />
                          ))}
                        <span className="rating">
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className="contact-btn" onClick={handleContact}>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country || "Not specified"}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p className="seller-desc">{dataUser.desc || "No description provided."}</p>
                </div>
              </div>
            )}
            
            <Reviews gigId={id} />
          </div>
          
          <div className="right">
            <div className="price-card">
              <div className="price-header">
                <h3>{data.shortTitle}</h3>
                <h2>${data.price}</h2>
              </div>
              <p className="short-desc">{data.shortDesc}</p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="delivery time" />
                  <span>{data.deliveryDate} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="revisions" />
                  <span>{data.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                {data?.features?.map((feature) => (
                  <div className="item" key={feature}>
                    <img src="/img/greencheck.png" alt="included" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to={`${ currentUser && !currentUser?.isSeller ? `/pay/${id}` : `/`}`} className="checkout-link">
                <button className="checkout-btn">Continue</button>
              </Link>
            </div>
            
            <div className="contact-card">
              <p>Need something specific? Contact the seller directly.</p>
              <button className="contact-seller-btn" onClick={handleContact}>
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
