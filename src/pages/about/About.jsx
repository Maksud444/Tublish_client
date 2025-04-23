import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <div className="container">
          <h1>About Tupublish</h1>
          <p>Connecting talent with opportunity across Africa and beyond</p>
        </div>
      </div>

      <div className="about-section">
        <div className="container">
          <div className="about-intro">
            <h2>Who We Are</h2>
            <p>
              Tupublish is an emerging freelancing and digital marketplace platform designed to connect skilled individuals with clients seeking a variety of services. Founded in 2021 and headquartered in Aurora, Colorado, Tupublish focuses on empowering freelancers and entrepreneurs, particularly within African and Indian communities, by providing opportunities for career development and self-improvement.
            </p>
          </div>

          <div className="about-offerings">
            <h2>What Tupublish Offers</h2>
            <p>
              Tupublish serves as a hub for freelancers across diverse categories, including:
            </p>
            <div className="categories-grid">
              <div className="category-item">
                <i className="fa-solid fa-paintbrush"></i>
                <span>Creative & Design</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-pen-nib"></i>
                <span>Writing & Translation</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-code"></i>
                <span>Web & Tech</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-bullhorn"></i>
                <span>Marketing & Sales</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-video"></i>
                <span>Video & Animation</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-music"></i>
                <span>Music & Audio</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-briefcase"></i>
                <span>Business & Consulting</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-graduation-cap"></i>
                <span>Education & Training</span>
              </div>
              <div className="category-item">
                <i className="fa-solid fa-scale-balanced"></i>
                <span>Legal & Finance</span>
              </div>
            </div>
            <p>
              Freelancers can create personalized profiles, showcase their portfolios, and offer services to a global clientele. The platform emphasizes flexibility, allowing individuals to work remotely and at their own pace, thereby promoting a work-from-home culture.
            </p>
          </div>

          <div className="about-mission">
            <h2>Mission and Vision</h2>
            <p>
              Tupublish aims to foster a supportive environment that encourages self-growth and professional development. By connecting freelancers with clients, the platform seeks to facilitate meaningful collaborations that benefit both parties. It also aspires to be a space where companies can easily find and recruit talented individuals for various projects.
            </p>
          </div>

          <div className="about-community">
            <h2>Community Engagement</h2>
            <p>
              The platform is actively involved in community-building initiatives, focusing on youth development, women's empowerment, and entrepreneurship. It provides resources and opportunities for individuals to enhance their skills and achieve their professional goals.
            </p>
          </div>

          <div className="how-it-works">
            <h2>How It Works</h2>
            <p>
              Tupublish connects freelancers and clients across Africa and beyond through a seamless digital platform. Whether you're offering services or looking to hire talent, here's how it works:
            </p>
            
            <div className="user-flows">
              <div className="flow-column">
                <h3>For Freelancers</h3>
                <ol>
                  <li>
                    <strong>Sign Up & Create a Profile</strong>
                    <p>Join Tupublish for free. Set up your profile, highlight your skills, add a portfolio, and list the services you offer.</p>
                  </li>
                  <li>
                    <strong>Get Discovered</strong>
                    <p>Clients search for talent based on categories, skills, and ratings. Your profile helps you stand out.</p>
                  </li>
                  <li>
                    <strong>Receive Job Offers or Apply for Projects</strong>
                    <p>You can receive direct offers from clients or apply for posted gigs and projects that match your expertise.</p>
                  </li>
                  <li>
                    <strong>Deliver Quality Work</strong>
                    <p>Communicate with clients, meet deadlines, and deliver high-quality work to build your reputation and earn repeat business.</p>
                  </li>
                  <li>
                    <strong>Get Paid Securely</strong>
                    <p>Receive payments through secure payment methods. Tupublish ensures safe transactions for both freelancers and clients.</p>
                  </li>
                </ol>
              </div>
              
              <div className="flow-column">
                <h3>For Clients</h3>
                <ol>
                  <li>
                    <strong>Post a Job or Browse Freelancers</strong>
                    <p>Describe the work you need done, or browse top-rated freelancers by category and skill.</p>
                  </li>
                  <li>
                    <strong>Connect & Hire</strong>
                    <p>Review freelancer profiles, ratings, and proposals. Choose the best fit for your project and agree on timelines and pricing.</p>
                  </li>
                  <li>
                    <strong>Collaborate & Manage Work</strong>
                    <p>Use the built-in dashboard to communicate, share files, and track progress in real time.</p>
                  </li>
                  <li>
                    <strong>Pay Securely</strong>
                    <p>Only pay when the work is completed to your satisfaction. Tupublish offers secure payment options for peace of mind.</p>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="join-cta">
              <p>Join thousands of freelancers and businesses growing together on Africa's own freelancing marketplace.</p>
              <a href="/register" className="cta-button">Start now at Tupublish.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 