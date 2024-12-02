import React, { useState } from "react";
import "./Card.css"; // Import the CSS file for styling

const Card = ({ title, imageUrl, hoverImageUrl, projectDetails, tags }) => {
  const [currentImage, setCurrentImage] = useState(imageUrl);

  return (
    <div
      className="card"
      onMouseEnter={() => setCurrentImage(hoverImageUrl)}
      onMouseLeave={() => setCurrentImage(imageUrl)}
    >
      <div className="card-image">
        <img src={currentImage} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-details">{projectDetails}</p>
        <div className="tags">
          {tags && tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
