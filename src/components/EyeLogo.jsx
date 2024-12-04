import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EyeLogo.css";

const EyeLogo = () => {
  const pupilRef = useRef(null);
  const navigate = useNavigate(); // React Router's navigation hook
  const [isBlinking, setIsBlinking] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Handle mouse movement for pupil tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const eye = pupilRef.current.parentElement.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;

      const angleRad = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const maxDistance = eye.width / 4;

      const distance = Math.min(
        maxDistance,
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 5
      );

      const x = Math.cos(angleRad) * distance;
      const y = Math.sin(angleRad) * distance;

      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle click event
  const handleClick = () => {
    setIsClicked(true); // Trigger click animation
    setTimeout(() => {
      navigate("/"); // Redirect to homepage after animation completes
      setIsClicked(false); // Reset clicked state
    }, 500); // Match the duration of the CSS transition
  };

  return (
    <div
      className={`eye ${isBlinking ? "blinking" : ""} ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
      role="button"
      aria-label="Eye logo, click to interact"
    >
      <div className="eyelid">
        <span></span>
      </div>
      <div className="eyeball" ref={pupilRef}></div>
    </div>
  );
};

export default EyeLogo;
