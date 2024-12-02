import React, { useEffect } from "react";
import gsap from "gsap";
import "./Branding.css";

const Branding = () => {
  const numberOfLines = 10; // Number of horizontal and vertical lines

  useEffect(() => {
    const horizontalLines = document.querySelectorAll('.horizontal');
    const verticalLines = document.querySelectorAll('.vertical');

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
    };

    animateLines();

    const handleMouseEnter = () => {
      animateLines();
    };

    const handleMouseLeave = () => {
      gsap.to(horizontalLines, {
        duration: 1,
        x: '0%',
        stagger: 0.05,
        ease: 'power4.out',
      });

      gsap.to(verticalLines, {
        duration: 1,
        y: '0%',
        stagger: 0.05,
        ease: 'power4.out',
      });
    };

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.addEventListener('mouseenter', handleMouseEnter);
    gridContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      gridContainer.removeEventListener('mouseenter', handleMouseEnter);
      gridContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Include the SVG filter in the DOM */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="roughPencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>

      <div className="grid-container">
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="line horizontal"
            style={{ '--index': index }}
          />
        ))}
        {[...Array(numberOfLines)].map((_, index) => (
          <div
            key={index}
            className="line vertical"
            style={{ '--index': index }}
          />
        ))}
      </div>
    </>
  );
};

export default Branding;
