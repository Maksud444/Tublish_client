import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import { categoriesData } from "../../data/categories";

const Categories = () => {
  const getCategoryValue = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="categories-page">
      <div className="container">
        <h1>Categories</h1>
        <div className="categories-grid">
          {categoriesData.map((category, index) => (
            <div className="category-card" key={index}>
              <h2>{category.name}</h2>
              <ul className="subcategories">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>
                    <Link 
                      to={`/gigs?cat=${getCategoryValue(category.name)}&subcat=${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                      className="subcategory-link"
                    >
                      {subcategory}
                    </Link>
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
