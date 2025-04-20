import React from "react";
import Slider from "react-slick";
import "./Slide.scss";
// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = ({ children, slidesToShow = 4, arrowsScroll = 1 }) => {
  // Responsive settings for different screen sizes
  const responsive = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: arrowsScroll,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
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
  ];

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: arrowsScroll,
    initialSlide: 0,
    responsive: responsive,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <div className="slide">
      <div className="container">
        <Slider {...settings}>
          {React.Children.map(children, (child) => (
            <div className="slide-item">
              {child}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

// Custom arrow components
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      →
    </div>
  );
};

export default Slide;
