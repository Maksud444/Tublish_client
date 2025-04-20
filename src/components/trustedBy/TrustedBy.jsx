import React from "react";
import "./TrustedBy.scss";

const TrustedBy = () => {
  return (
    <div className="trustedBy">
      <div className="container" style={{ padding: "10px 0" }}>
        <span className="trusted-text">Trusted by:</span>
        <div className="logo-container">
          <img src="https://www.paytusker.com/images/logo.png" alt="PayTusker" />
          <img src="https://chaintusker.com/images/logo.png" alt="ChainTusker" />
          <img src="https://lawhelpzone.com/images/logo.webp" alt="LawHelpZone" />
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
