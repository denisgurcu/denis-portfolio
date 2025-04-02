import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Card.css";

const Card = ({ title, imageUrl, hoverImageUrl, tags, linkTo, isPlaceholder }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`card-wrapper ${isPlaceholder ? "coming-soon" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className={`card clickable ${isPlaceholder ? "placeholder-card" : ""}`}>
        {isPlaceholder ? (
          <div className="coming-soon-card">
                <Link to={linkTo} className="card-link"></Link>
            <span>View <br></br>All</span>
          </div>
        ) : linkTo ? (
          <Link to={linkTo} className="card-link">
            <div className="card-image">
              <img src={imageUrl} alt={title} />
              <div className="overlay"></div>
              <h3 className="card-title">{title}</h3> {/*  Moved title inside */}
            </div>
          </Link>
        ) : (
          <div className="card-image">
            <img src={imageUrl} alt={title} />
            <div className="overlay"></div>
            <h3 className="card-title">{title}</h3>
          </div>
        )}
      </div>

      {/* Title and Tags Outside the Card */}
      {!isPlaceholder && (title || (tags && Array.isArray(tags) && tags.length > 0)) && (
        <div className="card-info clickable">
          {/* {title && <h3 className="card-title">{title}</h3>} */}
          {tags && Array.isArray(tags) && tags.length > 0 && (
            <div className="tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  {index < tags.length - 1 && <span className="tag-separator"> /</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
