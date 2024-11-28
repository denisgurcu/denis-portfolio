import React, { useState } from 'react';
import './WaveLines.css'; // Import external CSS for styles

const WaveLines = () => {
  // Number of waves to repeat
  const numWaves = 4;  // Change this value to control how many waves repeat
  const waveHeight = 50; // Height of each wave

  // The wave path definition (initial shape)
  const wavePath = "M0 67 C 24.985 67 24.985 92.539 49.9701 92.539C74.9551 92.539 74.9435 67 99.9286 67C124.914 67 124.914 92.539 149.899 92.539C174.884 92.539 174.884 67 199.869 67C224.854 67 224.854 92.539 249.839 92.539C274.824 92.539 274.824 67 299.809 67C324.794 67 324.794 92.539 349.779 92.539C374.764 92.539 374.764 67 399.749 67C424.734 67 424.734 92.539 449.719 92.539C474.704 92.539 474.704 67 499.689 67";
  const [hovered, setHovered] = useState(false); // Track hover state

  return (
    <div
      className="wave-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="waves">
        <svg height={waveHeight * numWaves} fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          {/* Dynamically render multiple wave paths */}
          {Array.from({ length: numWaves }).map((_, index) => {
            const offset = index * waveHeight;  // Calculate vertical offset for each wave
            return (
              <path
                key={index}
                className={`wave-path ${hovered ? 'hovered' : ''}`}
                stroke="#000"  // Black stroke color
                strokeWidth="8"
                fill="none"
                d={wavePath}
                transform={`translate(0, ${offset})`} // Move the wave down by the calculated offset
                
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default WaveLines;
