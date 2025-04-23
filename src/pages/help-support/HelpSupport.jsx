import React from "react";
import "./HelpSupport.scss";
import { Link } from "react-router-dom";

const HelpSupport = () => {
  return (
    <div className="help-support-page">
      <div className="container">
        <h1>Help & Support</h1>
        
        <div className="help-content">
          <p className="intro">
            Welcome to Tupublish Support. We're here to ensure your freelancing experience is smooth, secure, and successful. Whether you're a freelancer, client, or just exploring, find answers and assistance below.
          </p>
          
          <div className="divider"></div>
          
          <section className="help-section">
            <h2>Popular Help Topics</h2>
            
            <div className="help-topics">
              <div className="topic-column">
                <h3>For Freelancers</h3>
                <ul>
                  <li>How to Create a Profile</li>
                  <li>How to Get Jobs on Tupublish</li>
                  <li>How to Withdraw Earnings</li>
                  <li>How to Set Your Rates</li>
                </ul>
              </div>
              
              <div className="topic-column">
                <h3>For Clients</h3>
                <ul>
                  <li>How to Post a Job</li>
                  <li>How to Hire a Freelancer</li>
                  <li>Managing Projects and Payments</li>
                </ul>
              </div>
              
              <div className="topic-column">
                <h3>Payments & Security</h3>
                <ul>
                  <li>Accepted Payment Methods</li>
                  <li>Refunds & Disputes</li>
                  <li>Protecting Your Account</li>
                </ul>
              </div>
              
              <div className="topic-column">
                <h3>Policies</h3>
                <ul>
                  <li><Link to="/terms">Terms of Use</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/intellectual-property">Intellectual Property Claims</Link></li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="help-section">
            <h2>Still Need Help?</h2>
            <p>Our support team is ready to assist you.</p>
            
            <div className="contact-options">
              <div className="contact-item">
                <strong>Email Support:</strong> support@tupublish.com
              </div>
              <div className="contact-item">
                <strong>Live Chat:</strong> Available Mon–Fri, 9 AM – 6 PM (GMT+0)
              </div>
              <div className="contact-item">
                <strong>Help Center:</strong> Browse FAQs
              </div>
            </div>
          </section>
          
          <div className="divider"></div>
          
          <section className="help-section">
            <h2>Community Help</h2>
            <ul>
              <li>Join our Facebook Community to connect with other users</li>
              <li>Follow us on Twitter and LinkedIn for updates and tips</li>
              <li>Explore our Blog for freelancing tips, success stories, and platform updates</li>
            </ul>
          </section>
          
          <p className="tagline">
            Tupublish – Africa's Freelancing Platform<br />
            Helping you grow, earn, and connect from anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport; 