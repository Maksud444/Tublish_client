import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard.jsx";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const menuRef = useRef();

  const { search } = useLocation();
  const queryString = search || "?"; // Ensure there's at least a "?" in the query string
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort, minRef.current?.value, maxRef.current?.value],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${queryString}&min=${minRef.current?.value || 0}&max=${maxRef.current?.value || 10000}&sort=${sort}`
        )
        .then((res) => res.data),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, refetch]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr &gt; Graphics & Design &gt;</span>
        <h1>AI Artists</h1>
        <p className="subtitle">
          Explore the boundaries of art and technology with Liver&apos;s AI artists
        </p>
        
        <div className="filter-section">
          <div className="filter-menu">
            <div className="budget-filter">
              <span className="filter-label">Budget</span>
              <div className="input-group">
                <input ref={minRef} type="number" placeholder="min" />
                <input ref={maxRef} type="number" placeholder="max" />
                <button onClick={apply} className="apply-btn">Apply</button>
              </div>
            </div>
            
            <div className="sort-filter" ref={menuRef}>
              <div className="sort-header" onClick={() => setOpen(!open)}>
                <span className="filter-label">Sort by</span>
                <span className="sort-value">{sort === "sales" ? "Best Selling" : "Newest"}</span>
                <img src="/img/down.png" alt="" className="dropdown-icon" />
              </div>
              
              {open && (
                <div className="sort-dropdown">
                  {sort === "sales" ? (
                    <span onClick={() => reSort("createdAt")}>Newest</span>
                  ) : (
                    <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="results-section">
          {isLoading ? (
            <div className="loading">Loading gigs...</div>
          ) : error ? (
            <div className="error">Something went wrong! {error.message}</div>
          ) : data && data.length === 0 ? (
            <div className="no-results">No gigs found. Try different filters.</div>
          ) : (
            <div className="gig-cards">
              {data?.map((gig) => (
                <GigCard key={gig._id} item={gig} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;