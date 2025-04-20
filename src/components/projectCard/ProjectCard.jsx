import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  return (
    <div className="project-card-wrapper">
      <div className="projectCard">
        <img src={card.img} alt="" className="project-image" />
        <div className="info">
          <img src={card.pp} alt="" className="profile-picture" />
          <div className="texts">
            <h2>{card.cat}</h2>
            <span>{card.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
