import React from "react";
import "./Legal.scss";

const Legal = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>Legal Compliance Statement</h1>
          <div className="legal-icon">
            <img src="/img/legal-compliance.svg" alt="Legal Compliance" />
          </div>
        </div>
        
        <div className="legal-content">
          <div className="compliance-intro">
            <p>
              Tupublish is a Pan-African digital platform operating in compliance with 
              relevant data protection, employment, and digital service laws, including:
            </p>
            <ul>
              <li>
                <strong>Nigeria:</strong> Data Protection Act (NDPA), Freelancing Guidelines (if applicable)
              </li>
              <li>
                <strong>South Africa:</strong> POPIA (Protection of Personal Information Act)
              </li>
              <li>
                <strong>International:</strong> GDPR principles where applicable for external users
              </li>
            </ul>
          </div>
          
          <div className="commitment-section">
            <h2>We are committed to:</h2>
            <div className="commitment-cards">
              <div className="commitment-card">
                <div className="icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>Transparency</h3>
                <p>in service delivery</p>
              </div>
              
              <div className="commitment-card">
                <div className="icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Ethical Standards</h3>
                <p>for freelancing</p>
              </div>
              
              <div className="commitment-card">
                <div className="icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Responsible Practices</h3>
                <p>for data handling</p>
              </div>
            </div>
          </div>
          
          <div className="review-statement">
            <p>
              We periodically review our compliance framework to ensure we align with emerging regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal; 