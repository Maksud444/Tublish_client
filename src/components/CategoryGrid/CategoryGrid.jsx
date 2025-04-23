import React from "react";
import "./CategoryGrid.scss";
import { Link } from "react-router-dom";
import { categoriesData } from "../../data/categories";

const CategoryGrid = () => {
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
    <div className="category-section">
      <div className="container">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categoryGrid">
          {categoriesData.map((category, index) => (
            <div className="category-wrapper" key={index}>
              <Link to={`/gigs?cat=${getCategoryValue(category.name)}`} className="category-link">
                <div className="categoryCard">
                  <div className="card-content">
                    <div className="icon-container">
                      <i className={category.icon}></i>
                    </div>
                    <span className="category-name">{category.name}</span>
                  </div>
                </div>
              </Link>
              
              <div className="subcategory-dropdown">
                <ul>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <span>{subcategory}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/categories" className="view-all-btn">
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
