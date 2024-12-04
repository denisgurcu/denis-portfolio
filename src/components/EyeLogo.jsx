import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EyeLogo.css";

const EyeLogo = () => {
  const pupilRef = useRef(null);
  const navigate = useNavigate();
  const [isBlinking, setIsBlinking] = useState(false);

  // Handle mouse movement for the pupil
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

  // Handle eye click
  const handleClick = () => {
    setIsBlinking(true); // Trigger click-specific blink animation
    setTimeout(() => {
      setIsBlinking(false); // Reset after animation completes
      navigate("/"); // Redirect to homepage
    }, 500); // Match blink duration
  };

  return (
    <div
      className={`eye ${isBlinking ? "blinking" : ""}`}
      onClick={handleClick}
      role="button"
      aria-label="Eye logo, click to go home"
    >
      <div className="eyelid">
        <span></span>
      </div>
      <div className="eyeball" ref={pupilRef}></div>
    </div>
  );
};

export default EyeLogo;
