import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Graphic.css";

const Graphic = () => {
  const waveRefs = useRef([]);
  const hoverAnims = useRef([]); // Store active animations

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
          style={{ top: `${index * 45}px` }}
        />
      ))}
    </div>
  );
};

export default Graphic;
