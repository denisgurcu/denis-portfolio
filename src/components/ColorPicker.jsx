import React, { useState, useEffect } from "react";
import tippy from 'tippy.js'; // Tooltip library for interactive hints
import 'tippy.js/dist/tippy.css'; // Default Tippy.js styles
import 'tippy.js/animations/perspective.css'; // Cool perspective animation
import './ColorPicker.css'; // Custom styles for the color picker

const ColorPicker = ({ onColorSelect }) => {
  // Grab CSS custom properties (variables) from the root
  const rootStyles = getComputedStyle(document.documentElement);

  // Define the available colors and their labels
  const colors = [
    { color: rootStyles.getPropertyValue('--yellow').trim(), label: 'Golden Yellow' },
    { color: rootStyles.getPropertyValue('--blue').trim(), label: 'Sky Blue' },
    { color: rootStyles.getPropertyValue('--darkred').trim(), label: 'Wine Red' },
    { color: rootStyles.getPropertyValue('--pink').trim(), label: 'Blush Pink' },
    { color: rootStyles.getPropertyValue('--black').trim(), label: 'Jet Black' },
    { color: rootStyles.getPropertyValue('--white').trim(), label: 'Platinum' },
  ];

  useEffect(() => {
    // Initialize tooltips for the color circles
    tippy('.color-circle', {
      theme: 'my-theme', // Custom theme for tooltips
      placement: 'top', // Tooltip appears at the top
      animation: 'perspective', // Fancy animation style
      arrow: false, // No arrow for a cleaner look
      delay: [100, 200], // Delay before tooltips show and hide
    });
  }, []);

  return (
    <div className="color-picker">
      {/* Render a color circle for each color */}
      {colors.map(({ color, label }) => (
        <div
          key={color} // Use the color as a unique key
          className="color-circle"
          style={{ backgroundColor: color }} // Set the circle's background to the color
          data-tippy-content={label} // Tooltip shows the color's name
          onClick={() => onColorSelect(color)} // Call the handler to set the selected color
        />
      ))}
    </div>
  );
};

export default ColorPicker; // Export this component so it can be used elsewhere
