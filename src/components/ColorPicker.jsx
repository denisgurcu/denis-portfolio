import React from 'react';
import './ColorPicker.css';

const ColorPicker = ({ onColorSelect }) => {
  const colors = ['#FFD24D', '#8F263E', '#E3C3D8', '#114059', '#DA4D3B'];

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          className="color-circle"
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}  // Change cursor color on click
        />
      ))}
    </div>
  );
};

export default ColorPicker;
