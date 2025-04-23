import React from "react";
import "./TrustSafety.scss";

const TrustSafety = () => {
  return (
    <div className="trust-safety-page">
      <div className="container">
        <h1>Trust & Safety</h1>
        
        <div className="trust-content">
          <p className="intro">
            At Tupublish, your safety and success are our top priorities. We are committed to creating a secure, reliable, and trustworthy freelancing marketplace for African professionals and global clients.
          </p>
          
          <div className="divider"></div>
          
          <section className="trust-section">
            <h2>Our Commitment</h2>
            <ul>
              <li>
                <strong>Verified Profiles:</strong>
                <p>We verify freelancer and client accounts to help ensure authenticity and reduce fraud.</p>
              </li>
              <li>
                <strong>Secure Payments:</strong>
                <p>All transactions are processed through secure and encrypted systems. Payments are only released when both parties are satisfied.</p>
              </li>
              <li>
                <strong>Data Protection:</strong>
                <p>We adhere to international data privacy standards. Your personal and financial information is always protected.</p>
              </li>
              <li>
                <strong>Dispute Resolution:</strong>
                <p>If issues arise, our dedicated support team is available to mediate and resolve disputes fairly.</p>
              </li>
              <li>
                <strong>Accountability:</strong>
                <p>Ratings, reviews, and performance history help maintain platform quality and foster trust between users.</p>
              </li>
            </ul>
          </section>
          
          <section className="trust-section">
            <h2>Safety Guidelines</h2>
            
            <div className="guidelines">
              <div className="guideline-column">
                <h3>For Freelancers</h3>
                <ul>
                  <li>Avoid working outside the platform to protect your earnings.</li>
                  <li>Never share sensitive personal data (like banking details or passwords).</li>
                  <li>Report suspicious job postings or users immediately.</li>
                </ul>
              </div>
              
              <div className="guideline-column">
                <h3>For Clients</h3>
                <ul>
                  <li>Hire verified freelancers and review their profiles before offering work.</li>
                  <li>Use project milestones and clear communication to manage expectations.</li>
                  <li>Contact support for any signs of fraud or misrepresentation.</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="trust-section">
            <h2>Reporting a Problem</h2>
            <p>If you encounter any suspicious activity, harassment, or violation of our terms:</p>
            
            <div className="report-options">
              <div className="report-item">
                <strong>Email:</strong> safety@tupublish.com
              </div>
              <div className="report-item">
                <strong>Live Chat:</strong> Available Mon–Fri, 9 AM – 6 PM (GMT+0)
              </div>
              <div className="report-item">
                <strong>Emergency Report Form:</strong> Submit an Issue
              </div>
            </div>
          </section>
          
          <p className="tagline">
            Your safety is our responsibility — and your trust is our mission.<br />
            Together, we're building Africa's most trusted freelancing platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSafety; 