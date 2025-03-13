import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Card.css";

const Card = ({ title, imageUrl, hoverImageUrl, tags, linkTo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="card clickable">
        {linkTo ? (
          <Link to={linkTo} className="card-link">
            <div className="card-image">
              <img src={isHovered ? hoverImageUrl : imageUrl} alt={title} />
              <div className="overlay"></div>
            </div>
          </Link>
        ) : (
          <div className="card-image">
            <img src={isHovered ? hoverImageUrl : imageUrl} alt={title} />
            <div className="overlay"></div>
          </div>
        )}
      </div>

      {/* Title and Tags Outside the Card */}
      <div className="card-info clickable">
        <h3 className="card-title">{title}</h3>
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              {index < tags.length - 1 && <span className="tag-separator"> /</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
