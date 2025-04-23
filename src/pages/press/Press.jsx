import React from "react";
import "./Press.scss";

const Press = () => {
  return (
    <div className="press-page">
      <div className="container">
        <div className="press-content">
          <section className="media-coverage">
            <h2>📰 Media Coverage</h2>
            <div className="coverage-item">
              <h3>Dev.to</h3>
              <p>
                In the article "The Rise of Freelancing in Africa: A New Era of Digital Work", 
                Tupublish is highlighted for removing barriers such as local currency challenges 
                and regional payment issues, making freelancing more accessible for African professionals.
              </p>
            </div>
          </section>

          <section className="press-releases">
            <h2>📣 Press Releases</h2>
            
            <div className="release-item">
              <h3>Tupublish Launches Freelancing Platform for Africa</h3>
              <p>
                Announced the launch of its platform aimed at connecting African freelancers 
                with global clients, emphasizing its mission to empower the African workforce.
              </p>
            </div>
            
            <div className="release-item">
              <h3>Tupublish Expands Services with New Creative, Legal, and Tech Categories</h3>
              <p>
                Detailed the addition of new service categories to cater to a broader range 
                of freelance professionals and client needs.
              </p>
            </div>
            
            <div className="release-item">
              <h3>Tupublish Partners with Local Communities to Train Young Freelancers</h3>
              <p>
                Outlined initiatives to provide training and resources to young freelancers 
                in various African communities.
              </p>
            </div>
          </section>

          <section className="media-resources">
            <h2>🗂️ Media Resources</h2>
            <ul className="resources-list">
              <li>Logo & Brand Kit – Download Here</li>
              <li>Founder Bio (Tapiwa Gondo) – Read More</li>
              <li>Platform Screenshots & Mockups – Media Assets Folder</li>
            </ul>
          </section>

          <section className="press-contact">
            <h2>📬 Press Inquiries</h2>
            <p>For interviews, press inquiries, or speaker requests:</p>
            
            <div className="contact-info">
              <p>Email: press@tupublish.com</p>
              <p>Media Contact: Tapiwa Gondo, Founder</p>
            </div>
            
            <p>
              For more information or to explore opportunities, visit Tupublish's official website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Press; 