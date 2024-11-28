import React, { useEffect, useRef } from 'react';
import "./MatterAnimation.css";

const MatterAnimation = () => {
  const canvasRef = useRef(null);

  // Custom 'wavy' method to draw the wave
  const drawWavyLine = (ctx, from, to, frequency, amplitude, step) => {
    let cx = 0, cy = 0, 
        fx = from.x, fy = from.y, 
        tx = to.x, ty = to.y,
        i = 0, waveOffsetLength = 0,
        ang = Math.atan2(ty - fy, tx - fx),
        distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty)),
        a = amplitude,
        f = Math.PI * frequency;

    // Start drawing the wave
    for (i; i <= distance; i += step) {
      waveOffsetLength = Math.sin((i / distance) * f) * a;
      cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength;
      cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength;
      i > 0 ? ctx.lineTo(cx, cy) : ctx.moveTo(cx, cy);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Set up line style for purple line
    ctx.lineCap = 'round';
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#262525' 

    // Draw the wavy line
    ctx.beginPath();
    drawWavyLine(ctx, { x: 5, y: 120 }, { x: 600, y: 120 }, 8, 12, 4);
    ctx.stroke();
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="wavy-canvas"></canvas>
    </div>
  );
};

export default MatterAnimation;