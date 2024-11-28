import React, { useState, useEffect, useRef } from "react";
import "./EyeLogo.css"; // Add your eye styles here

const EyeLogo = () => {
  const pupilRef = useRef(null);

  // Function to handle mouse movement and pupil movement
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



  return (
    <div className="eye">
        <div className="eyelid">
                <span></span>
        </div>
      <div className="eyeball" ref={pupilRef}></div>
    </div>
  );
};

export default EyeLogo;
