import React, { useState, useEffect } from "react";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // Default theme
import 'tippy.js/animations/perspective.css';
import './ColorPicker.css';

const ColorPicker = ({ onColorSelect }) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const colors = [
    { color: rootStyles.getPropertyValue('--yellow').trim(), label: 'Golden Yellow' },
    { color: rootStyles.getPropertyValue('--blue').trim(), label: 'Sky Blue' },
    { color: rootStyles.getPropertyValue('--darkred').trim(), label: 'Wine Red' },
    { color: rootStyles.getPropertyValue('--pink').trim(), label: 'Blush Pink' },
    { color: rootStyles.getPropertyValue('--black').trim(), label: 'Jet Black' },
    { color: rootStyles.getPropertyValue('--white').trim(), label: 'Platinum' },
  ];

  useEffect(() => {
    // Initialize Tippy.js tooltips
    tippy('.color-circle', {
      theme: 'my-theme',
      placement: 'top',
      animation: 'perspective', // Use scale or fade
      arrow: false,
      delay: [100, 200],
    });
  }, []);

  return (
    <div className="color-picker">
      {colors.map(({ color, label }) => (
        <div
          key={color}
          className="color-circle"
          style={{ backgroundColor: color }}
          data-tippy-content={label} // Tooltip content set dynamically
          onClick={() => onColorSelect(color)} // Change cursor color on click
        />
      ))}
    </div>
  );
};

export default ColorPicker;