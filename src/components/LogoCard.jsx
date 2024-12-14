import React from "react";
import "./LogoCard.css";

const LogoCard = ({ frontImage, frontColor, title, description }) => {
  return (
    <div className="logo-card-wrapper">
      <div className="logo-card">
        {/* Front Face */}
        <div
          className="logo-card-front"
          style={{
            backgroundImage: `url(${frontImage})`,
            backgroundColor: frontColor,
          }}
        ></div>

        {/* Back Face */}
        <div className="logo-card-back">
          <div className="logo-card-back-content">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCard;
