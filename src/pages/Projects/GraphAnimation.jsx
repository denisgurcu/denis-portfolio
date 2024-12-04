import React, { useEffect } from "react";
import gsap from "gsap";
import './Projects.css';

const GraphAnimation = ({ onComplete }) => {
  const numberOfLines = 20; // Number of horizontal and vertical lines to create

  useEffect(() => {
    const horizontalLines = document.querySelectorAll('.projects-horizontal'); // Select all horizontal lines
    const verticalLines = document.querySelectorAll('.projects-vertical'); // Select all vertical lines

    // Set initial positions of the lines
    gsap.set(horizontalLines, { x: '0%' });
    gsap.set(verticalLines, { y: '0%' });

    const animateLines = () => {
      const timeline = gsap.timeline(); // Create a timeline for sequencing animations

      // Move horizontal lines to the left
      timeline.to(horizontalLines, {
        duration: 0.2,
        x: '-100%',
      });

      // Move vertical lines upwards
      timeline.to(verticalLines, {
        duration: 0.2,
        y: '-100%',
      });

      // Animate horizontal lines back to their original positions
      timeline.to(horizontalLines, {
        duration: 1.3,
        x: '0%',
        ease: 'power4.out', // Smooth ease effect
      });

      // Animate vertical lines back to their original positions
      timeline.to(verticalLines, {
        duration: 1.5,
        y: '0%',
        ease: 'power4.out', // Smooth ease effect
      });

      // Trigger onComplete callback when the animation finishes
      timeline.eventCallback("onComplete", onComplete);
    };

    animateLines(); // Start the animation
  }, [onComplete]); // Re-run if oncomplete changes

  return (
    <>
      {/* SVG filter for creating a rough pencil texture */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="roughPencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>

      <div className="projects-animation">
        {/* Create horizontal lines */}
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="projects-line projects-horizontal"
            style={{
              '--index': index, // Custom property for styling
              filter: 'url(#roughPencil)', // Apply rough pencil texture
            }}
          />
        ))}

        {/* Create vertical lines */}
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="projects-line projects-vertical"
            style={{
              '--index': index, // Custom property for styling
              filter: 'url(#roughPencil)', // Apply rough pencil texture
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GraphAnimation;
