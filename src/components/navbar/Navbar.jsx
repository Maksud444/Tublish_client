import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaFirstOrder,
  FaHouseUser,
  FaRocketchat,
  FaTools,
  FaExchangeAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = localStorage.getItem("currentUser") 
    ? JSON.parse(localStorage.getItem("currentUser")).user 
    : null;

  const isActive = () => setActive(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
console.log(currentUser);
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link"><span className="text">Tupublish</span></Link>
        </div>
        <Link className="allGig" to="/gigs">
            <span className="text">All Gigs</span>
          </Link>
        <div className="links">
          {currentUser ? (
            <div className="user" onClick={() => setMenuOpen(!menuOpen)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="user" />
              {menuOpen && (
                <div className="dropdown">
                  <div className="dropdown-header">
                    <img src={currentUser.img || "/img/noavatar.jpg"} alt="user" />
                    <div>
                      <p>Hello</p>
                      <strong>{currentUser.username}</strong>
                    </div>
                  </div>
                  <hr />
                  <Link to="/orders" className="dropdown-link">
                    <FaFirstOrder /> Orders
                  </Link>
                  <Link to="/messages" className="dropdown-link">
                    <FaRocketchat /> Messages
                  </Link>
                  <Link to="/dashboard" className="dropdown-link">
                    <FaHouseUser /> Dashboard
                  </Link>
                 
                  {currentUser.isSeller && (
                    <Link to="/add" className="dropdown-link">
                      <FaTools /> Add Gigs
                    </Link>
                  )}
                  <hr />
                  <div className="dropdown-link logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link to="/register" className="link"><button>JOIN</button></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
