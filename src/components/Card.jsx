import React, { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ title, imageUrl, hoverImageUrl, projectDetails, tags }) => {
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  // Handle resizing to detect small screens
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure default image is displayed on small screens
  useEffect(() => {
    if (isSmallScreen) {
      setCurrentImage(imageUrl); // Always show the default image
    }
  }, [isSmallScreen, imageUrl]);

  return (
    <div
      className="card"
      onMouseEnter={() => !isSmallScreen && setCurrentImage(hoverImageUrl)}
      onMouseLeave={() => !isSmallScreen && setCurrentImage(imageUrl)}
    >
      <div className="card-image">
        <img src={currentImage} alt={title} />
      </div>
      {!isSmallScreen && (
        <div className="card-content">
          <h3>{title}</h3>
          <p className="card-details">{projectDetails}</p>
          <div className="tags">
            {tags &&
              tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
