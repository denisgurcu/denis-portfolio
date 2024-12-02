import React, { useEffect } from "react";
import gsap from "gsap";
import './Projects.css';

const GraphAnimation = ({ onComplete }) => {
  const numberOfLines = 20;

  useEffect(() => {
    const horizontalLines = document.querySelectorAll('.projects-horizontal');
    const verticalLines = document.querySelectorAll('.projects-vertical');

    gsap.set(horizontalLines, { x: '0%' });
    gsap.set(verticalLines, { y: '0%' });

    const animateLines = () => {
      const timeline = gsap.timeline();

      timeline.to(horizontalLines, {
        duration: 0.2,
        x: '-100%',
      });

      timeline.to(verticalLines, {
        duration: 0.2,
        y: '-100%',
      });

      timeline.to(horizontalLines, {
        duration: 1.3,
        x: '0%',
        ease: 'power4.out',
      });

      timeline.to(verticalLines, {
        duration: 1.5,
        y: '0%',
        ease: 'power4.out',
      });

      // Call onComplete when the animation finishes
      timeline.eventCallback("onComplete", onComplete);
    };

    animateLines();
  }, [onComplete]);

  return (
    <>
      {/* SVG filter for texture effect */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="roughPencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>

      <div className="projects-animation">
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="projects-line projects-horizontal"
            style={{
              '--index': index,
              filter: 'url(#roughPencil)',  // Apply the filter to the lines
            }}
          />
        ))}
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="projects-line projects-vertical"
            style={{
              '--index': index,
              filter: 'url(#roughPencil)',  // Apply the filter to the lines
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GraphAnimation;
