import React from "react";
import "./InvestorRelations.scss";

const InvestorRelations = () => {
  return (
    <div className="investor-relations-page">
      <div className="container">
        <h1>Welcome to Tupublish Investor Relations</h1>
        
        <div className="ir-content">
          <p className="intro">
            Tupublish is Africa's dedicated freelancing marketplace — connecting skilled freelancers with clients around the world. We are committed to unlocking the continent's creative and technical potential through digital work, remote collaboration, and entrepreneurial empowerment.
          </p>
          
          <section className="ir-section">
            <h2>Why Invest in Tupublish?</h2>
            <ul>
              <li>
                <strong>Massive Market Opportunity</strong>
                <p>Africa's freelance economy is rapidly expanding. With over 250 million young people entering the workforce, the demand for digital work platforms is skyrocketing.</p>
              </li>
              <li>
                <strong>Scalable Platform Model</strong>
                <p>Tupublish is a tech-driven marketplace designed for high-volume, low-friction transactions — built to scale across borders.</p>
              </li>
              <li>
                <strong>Social Impact + Profit</strong>
                <p>We merge business with impact by reducing unemployment and enabling self-employment in emerging markets.</p>
              </li>
              <li>
                <strong>Founder-Led Growth</strong>
                <p>Led by visionary founder Tapiwa Gondo, Tupublish combines grassroots understanding with global execution.</p>
              </li>
            </ul>
          </section>
          
          <div className="divider"></div>
          
          <section className="ir-section">
            <h2>Our Growth Strategy</h2>
            <ul>
              <li>Expansion into Nigeria, Kenya, South Africa & Ghana</li>
              <li>Strategic partnerships with training institutions and fintechs</li>
              <li>Subscription revenue, service commissions, and premium listings</li>
              <li>Mobile-first UI/UX for high smartphone penetration markets</li>
              <li>Marketplace integrations with Chaintusker and Paytusker</li>
            </ul>
          </section>
          
          <section className="ir-section">
            <h2>Investment Opportunities</h2>
            <p>We are currently exploring:</p>
            <ul>
              <li>Pre-seed and seed funding rounds</li>
              <li>Strategic partnerships & accelerators</li>
              <li>Ecosystem co-investment for talent development and digital infrastructure</li>
            </ul>
            <p>If you are a venture capital firm, angel investor, accelerator, or impact fund looking to support Africa's digital future — we'd love to connect.</p>
          </section>
          
          <section className="ir-section contact-section">
            <h2>Contact Our Investor Relations Team</h2>
            <p>
              <strong>Email:</strong> investors@tupublish.com<br />
              <strong>Phone:</strong> +1 (720) 9659214<br />
              <strong>Media Kit & Pitch Deck:</strong> Available upon request<br />
              <strong>Founder:</strong> Tapiwa Gondo – LinkedIn
            </p>
          </section>
          
          <p className="tagline">Tupublish – Empowering Africa's Freelance Future</p>
        </div>
      </div>
    </div>
  );
};

export default InvestorRelations; 