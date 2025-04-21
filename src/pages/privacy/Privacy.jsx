import React from "react";
import "./Privacy.scss";

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="effective-date">Effective Date: April 22, 2025</p>
        
        <div className="privacy-intro">
          <p>
            Tupublish ("we", "our", or "us") is committed to protecting your privacy. 
            This Privacy Policy outlines how we collect, use, and protect your personal information.
          </p>
        </div>
        
        <div className="privacy-section">
          <h2>What We Collect:</h2>
          <ul>
            <li>Personal details (e.g., name, email, country)</li>
            <li>Profile content and portfolios</li>
            <li>Payment and transaction info</li>
            <li>Usage data and cookies</li>
          </ul>
        </div>
        
        <div className="privacy-section">
          <h2>How We Use It:</h2>
          <ul>
            <li>To provide platform services</li>
            <li>Improve user experience and platform functionality</li>
            <li>Send notifications and promotional materials (with consent)</li>
            <li>Ensure secure transactions</li>
          </ul>
        </div>
        
        <div className="privacy-section">
          <h2>Data Sharing:</h2>
          <ul>
            <li>With payment providers and essential service providers</li>
            <li>Only as legally required (e.g., for fraud prevention or law enforcement)</li>
          </ul>
        </div>
        
        <div className="privacy-section">
          <h2>Your Rights:</h2>
          <ul>
            <li>Access, correct, or delete your data</li>
            <li>Opt-out of marketing</li>
          </ul>
        </div>
        
        <div className="privacy-footer">
          <p>
            We comply with applicable data protection laws in Africa and globally. 
            For concerns, contact: <a href="mailto:support@tupublish.com">support@tupublish.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 