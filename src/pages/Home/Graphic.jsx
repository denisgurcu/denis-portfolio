import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Graphic.css";

const Graphic = () => {
  const waveRefs = useRef([]);
  const hoverAnims = useRef([]); // Store active animations
  const [offset, setOffset] = useState(45); // default
  // Set offset based on screen size like CSS media queries
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 2300) {
        setOffset(55); // Ultra-wide monitors (4K, etc.)
      } else if (width >= 1921) {
        setOffset(55); // Large desktops
      } else if (width <= 1600) {
        setOffset(35); // MacBook Pro 16", iMac
      } else if (width <= 1280) {
        setOffset(40); // MacBook Air / Pro 13-14"
      } else if (width <= 1024) {
        setOffset(35); // Tablets landscape
      } else if (width <= 768) {
        setOffset(30); // Tablets portrait, large phones
      } else if (width <= 480) {
        setOffset(25); // Regular phones
      } else if (width <= 375) {
        setOffset(20); // Small phones (SE, 13 mini)
      } else {
        setOffset(45); // Fallback for mid-sized screens
      }
    };

    handleResize(); // Initial run
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loopAnims = [];
  
    // Step 1: Initial animation
    waveRefs.current.forEach((ref, i) => {
      // Initial nudge animation (feel free to adjust this)
      gsap.fromTo(
        ref,
        { backgroundPositionX: "0px" },
        {
          backgroundPositionX: "-=100px",
          duration: 3,
          ease: "linear",
          onComplete: () => {
            // Step 2: Set up an infinite, very slow loop
            loopAnims[i] = gsap.to(ref, {
              backgroundPositionX: "-=100000px", // very large scroll
              duration: 2000, // slow and smooth
              ease: "linear",
              repeat: -1,
              paused: true,
            });
          },
        }
      );
      
    });
  
    const container = document.querySelector(".wave-container");
  
    const startHoverLoop = () => {
      loopAnims.forEach((anim) => anim?.resume());
    };
  
    const stopHoverLoop = () => {
      loopAnims.forEach((anim) => anim?.pause());
    };
  
    container.addEventListener("mouseenter", startHoverLoop);
    container.addEventListener("mouseleave", stopHoverLoop);
  
    return () => {
      container.removeEventListener("mouseenter", startHoverLoop);
      container.removeEventListener("mouseleave", stopHoverLoop);
    };
  }, []);
  
  

  return (
    <div className="wave-container">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="wave-wrapper"
          ref={(el) => (waveRefs.current[index] = el)}
          style={{ top: `${index * offset}px` }}
        />
      ))}
    </div>
  );
};

export default Graphic;
