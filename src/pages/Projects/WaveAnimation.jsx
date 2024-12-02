import React, { useEffect, useRef } from "react";
import './Projects.css';

const WaveAnimation = ({ onComplete }) => {
  const waveRefs = useRef([]);

  useEffect(() => {
    const m = 0.512286623256592433;

    function buildWave(w, h, yOffset = 0) {
      const a = h / 4; // amplitude
      const y = h / 2 + yOffset; // vertical center + offset
      let pathData = `M 0 ${y + a / 2}`;
      for (let i = 0; i < w; i += 100) {
        pathData += ` c ${a * m} 0 ${-(1 - a) * m} -${a} ${a} -${a}`;
        pathData += ` s ${-(1 - a) * m} ${a} ${a} ${a}`;
      }
      return pathData;
    }

    const waveWidth = 5000; // Adjust for larger container
    const waveHeight = 300; // Adjust height
    const yOffsetStep = 100; // Adjust vertical spacing

    waveRefs.current.forEach((path, index) => {
      const yOffset = index * yOffsetStep;
      path.setAttribute("d", buildWave(waveWidth, waveHeight, yOffset));
    });

    const playWaveAnimation = () => {
      waveRefs.current.forEach((path) => {
        if (path) { // Add a null check
          path.style.animation = "moveTheWave 3s linear";
          path.addEventListener("animationend", onComplete); // Trigger onComplete when animation finishes
        }
      });
    };

    // Trigger the wave animation
    playWaveAnimation();

    return () => {
      // Clean up (no hover listeners needed)
      waveRefs.current.forEach((path) => {
        if (path) { // Add a null check
          path.removeEventListener("animationend", onComplete); // Remove event listener on unmount
          path.style.animation = "none"; // Reset animation when component unmounts
        }
      });
    };
  }, [onComplete]);

  return (
    <div className="waves">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1700 400">
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
  );
};

export default WaveAnimation;
