import React from "react";
import "./CategoryGrid.scss";

const categories = [
  { label: "Programming & Tech", icon: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech-thin.56382a2.svg" },
  { label: "Graphics & Design", icon: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg" },
  { label: "Digital Marketing", icon: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg" },
  { label: "Writing & Translation", icon: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg" },
  { label: "Video & Animation", icon: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg" },
  { label: "Music & Audio", icon: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg" },
  { label: "Business", icon: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg" },
];

const CategoryGrid = () => {
  return (
    <div className="category-section">
      <div className="container">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categoryGrid">
          {categories.map((cat, index) => (
            <div className="categoryCard" key={index}>
              <div className="card-content">
                <img src={cat.icon} alt={cat.label} />
                <span>{cat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
