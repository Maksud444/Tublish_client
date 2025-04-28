// src/components/CategoryGrid/CategoryGrid.jsx

import React from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../data/categories";
import "./CategoryGrid.scss";

const CategoryGrid = () => {
  const getCategoryValue = (categoryName) => {
    switch (categoryName) {
      case "Creative & Design": return "creative-design";
      case "Writing & Translation": return "writing-translation";
      case "Web & Tech": return "web-tech";
      case "Marketing & Sales": return "marketing-sales";
      case "Video & Animation": return "video-animation";
      case "Music & Audio": return "music-audio";
      case "Business & Consulting": return "business-consulting";
      case "Education & Training": return "education-training";
      case "Legal & Compliance": return "legal-compliance";
      default: return categoryName.toLowerCase().replace(/\s+/g, "-");
    }
  };

  return (
    <div className="category-section">
      <div className="container">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categoryGrid">
          {categoriesData.map((category, index) => (
            <div className="category-wrapper" key={index}>
              <Link
                to={`/gigs?cat=${getCategoryValue(category.name)}`}
                className="category-link"
              >
                <div className="categoryCard">
                  <div className="card-content">
                    <div className="icon-container">
                      <i className={category.icon}></i>
                    </div>
                    <span className="category-name">{category.name}</span>
                  </div>
                </div>
              </Link>

              {/* Subcategories */}
              <div className="subcategory-dropdown">
                <ul>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        className="subcategory-link"
                        to={`/gigs?cat=${getCategoryValue(category.name)}&subcategory=${subcategory
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {subcategory}
                      </Link>
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
