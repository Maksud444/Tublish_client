import React from "react";
import "./Terms.scss";

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <h1>Terms of Use</h1>
        <p className="last-updated">Last Updated: April 22, 2025</p>
        
        <div className="terms-intro">
          <p>By using Tupublish, you agree to the following:</p>
        </div>
        
        <div className="terms-section">
          <h2>1. Account Responsibility</h2>
          <ul>
            <li>Users must be 18+ or of legal working age in their country</li>
            <li>Keep credentials confidential and report misuse</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2>2. Service Use</h2>
          <ul>
            <li>Freelancers and clients must communicate and transact in good faith</li>
            <li>No spam, harassment, illegal content, or discriminatory behavior is allowed</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2>3. Payment Terms</h2>
          <ul>
            <li>Payments are processed via approved gateways</li>
            <li>Tupublish may charge service fees for transactions</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2>4. Intellectual Property</h2>
          <ul>
            <li>Users retain rights to their original content</li>
            <li>Tupublish may showcase selected portfolios for promotional purposes</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2>5. Termination</h2>
          <p>We reserve the right to suspend or delete accounts that violate these terms.</p>
        </div>
        
        <div className="terms-section">
          <h2>6. Dispute Resolution</h2>
          <ul>
            <li>Disputes should be resolved through our internal system first</li>
            <li>If unresolved, mediation or arbitration may follow</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Terms; 