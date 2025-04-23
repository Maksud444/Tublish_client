import React from "react";
import "./Buying.scss";
import { Link } from "react-router-dom";

const Buying = () => {
  return (
    <div className="buying-page">
      <div className="container">
        <h1>Buying on Tupublish</h1>
        
        <div className="buying-content">
          <p className="intro">
            Tupublish gives you access to talented African freelancers ready to help you grow your business, complete tasks, and bring your ideas to life. Whether you need a logo, a website, content writing, or marketing support — you'll find skilled professionals across multiple categories.
          </p>
          
          <div className="divider"></div>
          
          <section className="buying-section">
            <h2>How to Get Started as a Buyer</h2>
            
            <ol className="steps-list">
              <li>
                <h3>Create an Account</h3>
                <p>Sign up for free and create a client profile. You'll gain access to thousands of verified freelancers across Africa.</p>
              </li>
              
              <li>
                <h3>Post a Job or Browse Services</h3>
                <p>You can either:</p>
                <ul>
                  <li>Post a custom job and receive proposals from interested freelancers</li>
                  <li>Or browse available services (gigs) by category and hire instantly</li>
                </ul>
              </li>
              
              <li>
                <h3>Review Freelancers</h3>
                <p>View freelancer profiles, portfolios, ratings, and client reviews. Select the right person based on skill, pricing, and availability.</p>
              </li>
              
              <li>
                <h3>Communicate Clearly</h3>
                <p>Use Tupublish's built-in messaging to discuss project details, set deadlines, and define expectations.</p>
              </li>
              
              <li>
                <h3>Make Secure Payments</h3>
                <p>Fund your project safely through Tupublish. Payment is held in escrow and released only when the work is delivered to your satisfaction.</p>
              </li>
              
              <li>
                <h3>Receive & Review Work</h3>
                <p>Approve the final delivery, request revisions if needed, and rate the freelancer to help build trust on the platform.</p>
              </li>
            </ol>
          </section>
          
          <div className="divider"></div>
          
          <section className="buying-section">
            <h2>Why Buy on Tupublish?</h2>
            <ul className="benefits-list">
              <li>Access Africa's top freelance talent</li>
              <li>Safe, secure, and transparent payments</li>
              <li>Professional services at competitive rates</li>
              <li>Easy communication and built-in project tracking</li>
              <li>Trusted by clients across sectors and countries</li>
            </ul>
          </section>
          
          <div className="divider"></div>
          
          <div className="cta-section">
            <p>Bring your ideas to life — hire skilled freelancers today.</p>
            <Link to="/register" className="cta-button">Visit www.tupublish.com and start your project now.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buying; 