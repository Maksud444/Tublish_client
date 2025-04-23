import React from "react";
import "./Selling.scss";
import { Link } from "react-router-dom";

const Selling = () => {
  return (
    <div className="selling-page">
      <div className="container">
        <h1>Selling on Tupublish</h1>
        
        <div className="selling-content">
          <p className="intro">
            Tupublish is your gateway to the African freelance economy. Whether you're a graphic designer, writer, developer, marketer, or creative entrepreneur — Tupublish makes it easy to offer your services, get discovered, and get paid.
          </p>
          
          <div className="divider"></div>
          
          <section className="selling-section">
            <h2>How to Start Selling</h2>
            
            <ol className="steps-list">
              <li>
                <h3>Create an Account</h3>
                <p>Sign up for free and set up your freelancer profile. Add your bio, skills, languages, and a professional photo to build credibility.</p>
              </li>
              
              <li>
                <h3>List Your Services (Gigs)</h3>
                <p>Offer services in popular categories like:</p>
                <ul>
                  <li>Web & Tech</li>
                  <li>Design & Creativity</li>
                  <li>Writing & Translation</li>
                  <li>Marketing & Business</li>
                  <li>Education, Legal, and more</li>
                </ul>
                <p>Add clear descriptions, delivery timelines, and competitive pricing.</p>
              </li>
              
              <li>
                <h3>Get Discovered by Clients</h3>
                <p>Once live, your services will appear in search results. Use great titles, keywords, and portfolio examples to stand out.</p>
              </li>
              
              <li>
                <h3>Communicate Professionally</h3>
                <p>Respond promptly to messages, clarify project requirements, and maintain a good client relationship throughout.</p>
              </li>
              
              <li>
                <h3>Deliver Quality Work On Time</h3>
                <p>Submit work by the deadline. Revisions are part of the process — be open and professional.</p>
              </li>
              
              <li>
                <h3>Earn & Grow</h3>
                <p>Get paid securely via Tupublish. Positive reviews will help you attract more clients and charge higher rates over time.</p>
              </li>
            </ol>
          </section>
          
          <div className="divider"></div>
          
          <section className="selling-section">
            <h2>Why Sell on Tupublish?</h2>
            <ul className="benefits-list">
              <li>No sign-up or listing fees</li>
              <li>Access to clients across Africa and beyond</li>
              <li>Secure payments & dispute resolution</li>
              <li>Community support and growth tools</li>
              <li>Build a personal brand and earn on your own terms</li>
            </ul>
          </section>
          
          <div className="divider"></div>
          
          <div className="cta-section">
            <p>Start selling today and turn your skills into income.</p>
            <Link to="/register" className="cta-button">Join now at www.tupublish.com</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selling; 