import React from "react";
import "./Slide.scss";

const Slide = ({ children }) => {
  return (
    <div className="slide">
      <div className="container">
       
          {children}
      
      </div>
    </div>
  );
};

export default Slide;
