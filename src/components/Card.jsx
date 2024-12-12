import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Card.css";

// Card component with link support
const Card = ({ title, imageUrl, hoverImageUrl, projectDetails, tags, linkTo }) => {
  const [currentImage, setCurrentImage] = useState(imageUrl); // Track which image is currently displayed
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768); // Check if the screen is small (mobile)

  // Update screen size state when the window is resized
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768); // Update isSmallScreen when resizing
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => window.removeEventListener("resize", handleResize); // Clean up the listener when the component unmounts
  }, []);

  // Ensure the default image is always shown on small screens
  useEffect(() => {
    if (isSmallScreen) {
      setCurrentImage(imageUrl); // Reset to the main image on small screens
    }
  }, [isSmallScreen, imageUrl]); // Trigger this effect when screen size or image URL changes

  // Create card content
  const CardContent = (
    <div
      className="card"
      // Switch to the hover image only on larger screens
      onMouseEnter={() => !isSmallScreen && setCurrentImage(hoverImageUrl)}
      onMouseLeave={() => !isSmallScreen && setCurrentImage(imageUrl)}
    >
      <div className="card-image">
        {/* Display the current image */}
        <img src={currentImage} alt={title} />
      </div>
      {!isSmallScreen && (
        <div className="card-content">
          {/* Show the title and project details */}
          <h3>{title}</h3>
          <p className="card-details">{projectDetails}</p>
          <div className="tags">
            {/* Display tags associated with the card */}
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

  // If linkTo is provided, wrap the card in a Link
  return linkTo ? <Link to={linkTo}>{CardContent}</Link> : CardContent;
};

export default Card; // Make this component available for other parts of the app
