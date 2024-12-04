import React, { useEffect } from "react";
import gsap from "gsap"; 
import "./Branding.css";

const Branding = () => {
  const numberOfLines = 10; // Total horizontal and vertical lines

  useEffect(() => {
    const horizontalLines = document.querySelectorAll('.horizontal'); // Select horizontal lines
    const verticalLines = document.querySelectorAll('.vertical'); // Select vertical lines

    // Set initial positions for lines
    gsap.set(horizontalLines, { x: '0%' });
    gsap.set(verticalLines, { y: '0%' });

    const animateLines = () => {
      // Timeline for animations
      const timeline = gsap.timeline();

      // Move lines out of view
      timeline.to(horizontalLines, { duration: 0.2, x: '-100%' });
      timeline.to(verticalLines, { duration: 0.2, y: '-100%' });

      // Bring lines back into view with easing
      timeline.to(horizontalLines, { duration: 1.3, x: '0%', ease: 'power4.out' });
      timeline.to(verticalLines, { duration: 1.5, y: '0%', ease: 'power4.out' });
    };

    animateLines(); // Trigger animation 

    // Event handlers for hover animations
    const handleMouseEnter = () => animateLines(); // Re-run animation on mouse enter

    const handleMouseLeave = () => {
      // Reset lines to initial positions smoothly
      gsap.to(horizontalLines, { duration: 1, x: '0%', stagger: 0.05, ease: 'power4.out' });
      gsap.to(verticalLines, { duration: 1, y: '0%', stagger: 0.05, ease: 'power4.out' });
    };

    const gridContainer = document.querySelector('.grid-container'); // Select the container
    gridContainer.addEventListener('mouseenter', handleMouseEnter); // Add hover effects
    gridContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      // Clean up event listeners 
      gridContainer.removeEventListener('mouseenter', handleMouseEnter);
      gridContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* SVG Filter for rough pencil effect */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="roughPencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>

      {/* Grid container for animated lines */}
      <div className="grid-container">
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="line horizontal"
            style={{ '--index': index }} // Pass the index as a CSS variable
          />
        ))}
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="line vertical"
            style={{ '--index': index }} // Pass the index as a CSS variable
          />
        ))}
      </div>
    </>
  );
};

export default Branding;
