import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigating to other pages
import "./EyeLogo.css"; // Styles for the eye logo component

const EyeLogo = () => {
  const pupilRef = useRef(null); // Reference to the pupil element for movement
  const navigate = useNavigate(); // React Router's hook for page navigation
  const [isBlinking, setIsBlinking] = useState(false); // State to control blinking animation
  const [isClicked, setIsClicked] = useState(false); // State to handle click animation

  // Make the pupil follow the mouse pointer
  useEffect(() => {
    const handleMouseMove = (e) => {
      const eye = pupilRef.current.parentElement.getBoundingClientRect(); // Get the eye's position
      const eyeCenterX = eye.left + eye.width / 2; // Horizontal center of the eye
      const eyeCenterY = eye.top + eye.height / 2; // Vertical center of the eye

      const angleRad = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX); // Angle to the pointer
      const maxDistance = eye.width / 4; // Limit how far the pupil can move

      // Calculate the distance the pupil should move
      const distance = Math.min(
        maxDistance,
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 5
      );

      // Convert the distance and angle into x and y movements
      const x = Math.cos(angleRad) * distance;
      const y = Math.sin(angleRad) * distance;

      // Move the pupil to follow the mouse
      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove); // Listen for mouse movement

    return () => {
      window.removeEventListener("mousemove", handleMouseMove); // Clean up the listener
    };
  }, []); // Runs once when the component mounts

  // Handle click interactions
  const handleClick = () => {
    setIsClicked(true); // Trigger the clicked state for animation
    setTimeout(() => {
      navigate("/"); // Navigate to the homepage after the animation
      setIsClicked(false); // Reset the clicked state
    }, 500); // Match this to the CSS animation duration
  };

  return (
    <div
      className={`eye ${isBlinking ? "blinking" : ""} ${isClicked ? "clicked" : ""}`} // Add blinking or clicked classes
      onClick={handleClick} // Handle click events
      role="button" // Make it accessible as a button
      aria-label="Eye logo, click to interact" // Provide a screen-reader description
    >
      <div className="eyelid">
        <span></span> {/* Span for styling the eyelid */}
      </div>
      <div className="eyeball" ref={pupilRef}></div> {/* Eyeball with pupil tracking */}
    </div>
  );
};

export default EyeLogo; // Export the EyeLogo component for use elsewhere
