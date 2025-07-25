import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    navigate(`/gigs?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/gigs?search=${encodeURIComponent(input)}`);
  };
  
  return (
    <div className="featured">
      <div className="overlay">
        <div className="container">
          <h1 className="title">Freelancing marketplace for Africa</h1>
          <form className="searchBox" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for any service..."
              className="searchInput"
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="searchButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="searchIcon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </button>
          </form>
          <div className="popular">
            <div className="popular-buttons">
            <button onClick={() => handleSearch("website development")}>website development →</button>
            <button onClick={() => handleSearch("logo design")}>logo design →</button>
            <button onClick={() => handleSearch("video editing")}>video editing →</button>
            <button onClick={() => handleSearch("architecture & interior design")}>architecture & interior design →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
