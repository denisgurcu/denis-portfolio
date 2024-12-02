import React, { useEffect, useRef } from "react";
import './Graphic.css';

const Graphic = () => {
  const waveRefs = useRef([]);

  useEffect(() => {
    const m = 0.512286623256592433;

    function buildWave(w, h, yOffset = 0) {
      const a = h / 4; // amplitude
      const y = h / 2 + yOffset; // vertical center + offset
      let pathData = `M 0 ${y + a / 2}`;
      for (let i = 0; i < w; i += 50) { // Create multiple wave segments
        pathData += ` c ${a * m} 0 ${-(1 - a) * m} -${a} ${a} -${a}`;
        pathData += ` s ${-(1 - a) * m} ${a} ${a} ${a}`;
      }
      return pathData;
    }

    const waveWidth = 1500; // wave length 
    const waveHeight = 200; // wave height
    const yOffsetStep = 60; // vertical spacing between waves

    waveRefs.current.forEach((path, index) => {
      const yOffset = index * yOffsetStep; // Vertical offset for each wave
      path.setAttribute("d", buildWave(waveWidth, waveHeight, yOffset));
    });

    // Trigger animation on page load
    const waveContainer = document.querySelector(".waves");

    const playInitialAnimation = () => {
      waveRefs.current.forEach((path) => {
        path.style.animation = "moveTheWave 3s linear infinite";
      });

      // Stop the animation after 4 seconds to allow hover effect to take over
      setTimeout(() => {
        waveRefs.current.forEach((path) => {
          path.style.animation = "none";
        });
      }, 3000);
    };

    const addAnimation = () => {
      waveRefs.current.forEach((path) => {
        path.style.animation = "moveTheWave 4s linear infinite";
      });
    };

    const removeAnimation = () => {
      waveRefs.current.forEach((path) => {
        path.style.animation = "none";
      });
    };

    // Play initial animation
    playInitialAnimation();

    // Attach hover animations
    waveContainer.addEventListener("mouseenter", addAnimation);
    waveContainer.addEventListener("mouseleave", removeAnimation);

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
              ref={(el) => (waveRefs.current[i] = el)}
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
