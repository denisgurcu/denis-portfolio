import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';  // CSS file for cursor styles

const CustomCursor = ({ cursorColor }) => {
  const [cursorOpacity, setCursorOpacity] = useState(0.8); // For opacity transitions

  useEffect(() => {
    const cursor = document.querySelector('.cursor');

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    // GSAP quickTo to animate cursor movement
    let xTo = gsap.quickTo(".cursor", "x", { duration: 0.1, ease: "power3" });
    let yTo = gsap.quickTo(".cursor", "y", { duration: 0.1, ease: "power3" });

    // Update cursor position smoothly based on mouse movement
    const updateCursorPosition = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setCursorOpacity(1); // Make cursor visible on movement
    };

    // Listen to mousemove event to update cursor position
    window.addEventListener('mousemove', updateCursorPosition);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div
      className="cursor"
      style={{
        backgroundColor: cursorColor,  // Set the color dynamically
        opacity: cursorOpacity,        // Add opacity transition
      }}
    />
  );
};

export default CustomCursor;
