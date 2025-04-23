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
            <Link to="/about" className="footer-link">
              <span>About Us</span>
            </Link>
            <span>How it Works</span>
            <span><Link to="/partnerships" className="footer-link">Partnerships</Link></span>
            <span>Careers</span>
            <Link to="/press" className="footer-link">
              <span>Press</span>
            </Link>
            <span><Link to="/privacy" className="footer-link">Privacy Policy</Link></span>
            <Link to="/terms" className="footer-link">
              <span>Terms of Service</span>
            </Link>
            <Link to="/intellectual-property" className="footer-link">
              <span>Intellectual Property Claims</span>
            </Link>
            <Link to="/investor-relations" className="footer-link">
              <span>Investor Relations</span>
            </Link>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <Link to="/help-support" className="footer-link">
              <span>Help & Support</span>
            </Link>
            <Link to="/trust-safety" className="footer-link">
              <span>Trust & Safety</span>
            </Link>
            <Link to="/selling" className="footer-link">
              <span>Selling on Tupublish</span>
            </Link>
            <Link to="/buying" className="footer-link">
              <span>Buying on Tupublish</span>
            </Link>
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
              <a href="https://x.com/tupublish182636?s=11" target="_blank" rel="noopener noreferrer">
                <img src="/img/twitter.png" alt="Twitter/X" />
              </a>
              <a href="https://www.facebook.com/share/15HUXbxek5/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <img src="/img/facebook.png" alt="Facebook" />
              </a>
              <a href="https://www.linkedin.com/company/tupublish/" target="_blank" rel="noopener noreferrer">
                <img src="/img/linkedin.png" alt="LinkedIn" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/img/pinterest.png" alt="Pinterest" />
              </a>
              <a href="https://www.instagram.com/tupublish?igsh=MXhsbHk1Zm1kaDh2NA==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer">
                <img src="/img/instagram.png" alt="Instagram" />
              </a>
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
