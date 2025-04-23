import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import FaqSection from "../../components/faq/faqSection";
import GigList from "../../components/gigList/gigList";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import { Link } from "react-router-dom";
import { categoriesData } from "../../data/categories";

// Function to get the category value based on the category name
const getCategoryValue = (categoryName) => {
  switch(categoryName) {
    case "Creative & Design": return "creative";
    case "Writing & Translation": return "writing";
    case "Web & Tech": return "web";
    case "Marketing & Sales": return "marketing";
    case "Video & Animation": return "video";
    case "Music & Audio": return "music";
    case "Business & Consulting": return "business";
    case "Education & Training": return "education";
    case "Legal & Compliance": return "legal";
    default: return categoryName.toLowerCase();
  }
};

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <CategoryGrid/>
      {/* <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide> */}
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <img src="https://premiummod.com/demoimages/img.php?fw=text102&t=mj" alt="" />
          </div>
        </div>
      </div>

    <GigList/>

      <div className="explore">
        <div className="container">
          <h1>Explore Top Freelance Services on Tupublish</h1>
          <div className="items">
            {categoriesData.map((category, index) => (
              <Link to={`/gigs?cat=${getCategoryValue(category.name)}`} className="item-link" key={index}>
                <div className="item">
                  <div className="icon-container">
                    <i className={category.icon}></i>
                  </div>
                  <div className="line"></div>
                  <span>{category.name}</span>
                </div>
              </Link>
            ))}
            
            <Link to="/categories" className="item-link view-all">
              <div className="item">
                <div className="icon-container">
                  <i className="fa-solid fa-th-large"></i>
                </div>
                <div className="line"></div>
                <span>View All Categories</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="how-it-works">
      <div className="container">
        <p className="process-label">Process</p>
        <h2 className="title">How this works?</h2>
        <p className="subtitle">See the process of how it works</p>

        <div className="steps">
          <div className="step">
            <div className="icon">
              <img className="icon" src="./img\add-user.png" alt="" />
            </div>
            <h3>Create Account</h3>
            <p>It's very easy to open an account and start your journey.</p>
          </div>
          <div className="step">
            <div className="icon">  
            <img className="icon" src="./img\account-confirm.png" alt="" />
            </div>
            <h3>Complete your Profile</h3>
            <p>Create a complete profile to attract clients.</p>
          </div>
          <div className="step">
            <div className="icon">
            <img className="icon" src="./img\agreement.png" alt="" />
            </div>
            <h3>Apply for an opportunity or hire an expert</h3>
            <p>Apply & get your preferable jobs with all the requirements and get it.</p>
          </div>
        </div>
      </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              Tupublish <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Tupublish Business</button>
          </div>
          <div className="item">
          <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>

      <FaqSection />
    </div>
  );
}

export default Home;
