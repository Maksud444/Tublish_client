import React from "react";
import "./gigList.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import GigCard from "../gigCard/GigCard";
import Slider from "react-slick";
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GigList = () => {
  const { isLoading, error, data: gigs } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get("/gigs").then((res) => {
        return res.data;
      }),
  });

  // Custom arrow components
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-prev-arrow`} onClick={onClick}>
        <i className="arrow-icon">←</i>
      </div>
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-next-arrow`} onClick={onClick}>
        <i className="arrow-icon">→</i>
      </div>
    );
  };

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <section className="gig-list">
      <div className="container">
        <div className="gig-list-header">
          <h2>Latest Gigs</h2>
          <p>Quality Gigs. Talented Freelancers. Fast Results.</p>
        </div>

        {isLoading ? (
          <p className="loading">Loading gigs...</p>
        ) : error ? (
          <p className="error">Error loading gigs: {error.message}</p>
        ) : (
          <div className="slider-container">
            <Slider {...settings}>
              {gigs.map((gig) => (
                <div key={gig._id} className="gig-slide-item">
                  <GigCard item={gig} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default GigList;