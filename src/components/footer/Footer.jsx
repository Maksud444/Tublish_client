import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Creative & Design</span>
            <span>Writing & Translation</span>
            <span>Web & Tech</span>
            <span>Marketing & Sales</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Business & Consulting</span>
            <span>Education & Training</span>
            <span><Link to="/legal" className="footer-link">Legal & Compliance</Link></span>
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
