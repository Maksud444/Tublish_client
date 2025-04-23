import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import { categoriesData } from "../../data/categories";

const Categories = () => {
  // Function to get the category value based on the category name
  const getCategoryValue = (categoryName) => {
    switch(categoryName) {
      case "Creative & Design": return "creative";
      case "Writing & Translation": return "writing";
      case "Web & Tech": return "web";
      case "Marketing & Sales": return "marketing";
      case "Video & Animation": return "video";
      case "Music & Audio": return "music";
      case "Business & Consulting": return "business";
      case "Education & Training": return "education";
      case "Legal & Compliance": return "legal";
      default: return categoryName.toLowerCase();
    }
  };

  return (
    <div className="categories-page">
      <div className="container">
        <div className="categories-header">
          <h1>Explore Categories</h1>
          <p>Find the perfect freelance service for your business</p>
        </div>
        
        <div className="categories-grid">
          {categoriesData.map((category, index) => (
            <div className="category-card" key={index}>
              <Link to={`/gigs?cat=${getCategoryValue(category.name)}`} className="category-header">
                <div className="icon-container">
                  <i className={category.icon}></i>
                </div>
                <h2>{category.name}</h2>
              </Link>
              <ul className="subcategories">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>
                    <span>{subcategory}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 