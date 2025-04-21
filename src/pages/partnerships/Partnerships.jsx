import React from "react";
import "./Partnerships.scss";

const Partnerships = () => {
  return (
    <div className="partnerships-page">
      <div className="container">
        <div className="partnerships-header">
          <h1>Partnership Policy</h1>
          {/* <div className="partnerships-image">
            <img src="/img/partnerships.jpg" alt="Tupublish Partnerships" />
          </div> */}
        </div>
        
        <div className="partnerships-content">
          <div className="welcome-section">
            <p className="intro">Tupublish welcomes partnerships with:</p>
            <ul>
              <li>
                <span className="icon">🌍</span>
                <span className="text">NGOs promoting digital inclusion</span>
              </li>
              <li>
                <span className="icon">💼</span>
                <span className="text">Businesses seeking freelance talent in Africa</span>
              </li>
              <li>
                <span className="icon">🎓</span>
                <span className="text">Educational institutions training the workforce of the future</span>
              </li>
            </ul>
          </div>
          
          <div className="offers-section">
            <h2>We Offer:</h2>
            <ul>
              <li>
                <span className="icon">🤝</span>
                <span className="text">Co-branded freelance initiatives</span>
              </li>
              <li>
                <span className="icon">🔄</span>
                <span className="text">Affiliate & referral opportunities</span>
              </li>
              <li>
                <span className="icon">⚙️</span>
                <span className="text">API access for business partners</span>
              </li>
            </ul>
          </div>
          
          <div className="contact-section">
            <p>Interested? Email us at:</p>
            <a href="mailto:partners@tupublish.com" className="email-link">
              partners@tupublish.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships; 