import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
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
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <Link to="/categories" className="footer-link">
              <span>All Categories</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Creative & Design")}`} className="footer-link">
              <span>Creative & Design</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Writing & Translation")}`} className="footer-link">
              <span>Writing & Translation</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Web & Tech")}`} className="footer-link">
              <span>Web & Tech</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Marketing & Sales")}`} className="footer-link">
              <span>Marketing & Sales</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Video & Animation")}`} className="footer-link">
              <span>Video & Animation</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Music & Audio")}`} className="footer-link">
              <span>Music & Audio</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Business & Consulting")}`} className="footer-link">
              <span>Business & Consulting</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Education & Training")}`} className="footer-link">
              <span>Education & Training</span>
            </Link>
            <Link to={`/gigs?cat=${getCategoryValue("Legal & Compliance")}`} className="footer-link">
              <span>Legal & Compliance</span>
            </Link>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>About Us</span>
            <span>How it Works</span>
            <span><Link to="/partnerships" className="footer-link">Partnerships</Link></span>
            <span>Careers</span>
            <span>Press</span>
            <span><Link to="/privacy" className="footer-link">Privacy Policy</Link></span>
            <Link to="/terms" className="footer-link">
            <span>Terms of Service</span>
            </Link>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Tupublish</span>
            <span>Buying on Tupublish</span>
          </div>
          <div className="item">
       <h2>Explore</h2>
       <Link to="/gigs" className="fooGig">
       <span > ALL GIGS</span>
         </Link>
       </div>
          <div className="item">
            <h2>Our Products</h2>
            <Link to="https://paytusker.com" className="fooGig">
            <span>paytusker</span>
            </Link>
            <Link to="https://lawhelpzone.com" className="fooGig">
            <span>lawhelpzone</span>
            </Link>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Tupublish</h2>
            <span>© Tupublish International Ltd. 2025</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="right-link">
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
