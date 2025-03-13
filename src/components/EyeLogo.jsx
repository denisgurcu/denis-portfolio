import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigating to other pages
import "./EyeLogo.css"; // Styles for the eye logo component

const EyeLogo = () => {
  const pupilRef = useRef(null); // Reference to the pupil element for movement
  const navigate = useNavigate(); // React Router's hook for page navigation
  const [isBlinking, setIsBlinking] = useState(false); // State to control blinking animation
  const [isClicked, setIsClicked] = useState(false); // State to handle click animation
  const [isHovering, setIsHovering] = useState(false); // State to detect hover
  const isHoverBlinking = useRef(false); // Prevents interference with regular blinking

  // Make the pupil follow the mouse pointer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!pupilRef.current) return;

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
      pupilRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove); // Listen for mouse movement

    return () => {
      window.removeEventListener("mousemove", handleMouseMove); // Clean up the listener
    };
  }, []); // Runs once when the component mounts

  // Regular blinking every 7 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isHovering) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 7000); // Regular blink every 7 seconds

    return () => clearInterval(blinkInterval);
  }, [isHovering]);

  // Double Blink on Hover
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!isHoverBlinking.current) {
      isHoverBlinking.current = true;
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => {
            setIsBlinking(false);
            isHoverBlinking.current = false; // Reset hover blinking
          }, 150);
        }, 100);
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

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
      className={`eye clickable ${isBlinking ? "blinking" : ""} ${isClicked ? "clicked" : ""} ${isHovering ? "shrink" : ""}`}
      onClick={handleClick} // Handle click events
      onMouseEnter={handleMouseEnter} // Detect hover for double blink
      onMouseLeave={handleMouseLeave} // Detect when hover stops
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
