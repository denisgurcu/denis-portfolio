import React, { useEffect, useRef } from "react";
import './Graphic.css';

const Graphic = () => {
  const waveRefs = useRef([]); // Store references to wave paths

  useEffect(() => {
    const m = 0.512286623256592433; // Control point multiplier for wave curves

    // Function to generate wave path data
    function buildWave(w, h, yOffset = 0) {
      const a = h / 4; // Amplitude of the wave
      const y = h / 2 + yOffset; // Vertical center of the wave
      let pathData = `M 0 ${y + a / 2}`; // Start the wave path
      for (let i = 0; i < w; i += 50) { // Loop to create wave segments
        pathData += ` c ${a * m} 0 ${-(1 - a) * m} -${a} ${a} -${a}`; // Cubic curve for the wave crest
        pathData += ` s ${-(1 - a) * m} ${a} ${a} ${a}`; // Smooth curve for the wave trough
      }
      return pathData;
    }

    const waveWidth = 1500; // Total width of the wave
    const waveHeight = 200; // Height of the wave
    const yOffsetStep = 60; // Spacing between waves

    // Generate path data for each wave
    waveRefs.current.forEach((path, index) => {
      const yOffset = index * yOffsetStep; // Vertical offset for each wave
      path.setAttribute("d", buildWave(waveWidth, waveHeight, yOffset)); // Set wave path
    });

    // Animation on page load
    const waveContainer = document.querySelector(".waves");

    const playInitialAnimation = () => {
      waveRefs.current.forEach((path) => {
        path.style.animation = "moveTheWave 3s linear infinite"; // Apply initial wave animation
      });

      setTimeout(() => {
        waveRefs.current.forEach((path) => {
          path.style.animation = "none"; // Stop animation after 3 seconds
        });
      }, 3000);
    };

    // Hover effect: Reapply wave animation
    const addAnimation = () => {
      waveRefs.current.forEach((path) => {
        path.style.animation = "moveTheWave 4s linear infinite";
      });
    };

    // Hover effect: Remove wave animation
    const removeAnimation = () => {
      waveRefs.current.forEach((path) => {
        path.style.animation = "none";
      });
    };

    // Start initial animation
    playInitialAnimation();

    // Add event listeners for hover effects
    waveContainer.addEventListener("mouseenter", addAnimation);
    waveContainer.addEventListener("mouseleave", removeAnimation);

    // Clean up event listeners
    return () => {
      waveContainer.removeEventListener("mouseenter", addAnimation);
      waveContainer.removeEventListener("mouseleave", removeAnimation);
    };
  }, []);

  return (
    <div className="wave-container">
      <div className="waves">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 200">
          {[...Array(3)].map((_, i) => (
            <path
              key={i}
              ref={(el) => (waveRefs.current[i] = el)} // Assign references to paths
              fill="none"
              stroke="#262626"
              strokeWidth="9"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Graphic;
