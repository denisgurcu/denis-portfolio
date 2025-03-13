import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./CustomCursor.css";

const CustomCursor = ({ cursorColor }) => {
  const [cursorOpacity, setCursorOpacity] = useState(0.8);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // Track hover state

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.add("default-cursor");
      return;
    } else {
      document.body.classList.remove("default-cursor");
    }

    const cursor = document.querySelector(".cursor");
    document.body.style.cursor = "none";

    let xTo = gsap.quickTo(".cursor", "x", { duration: 0.1, ease: "power3" });
    let yTo = gsap.quickTo(".cursor", "y", { duration: 0.1, ease: "power3" });

    const updateCursorPosition = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setCursorOpacity(1);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Select all elements with class 'clickable' and add event listeners
    const clickableElements = document.querySelectorAll(".clickable");
    clickableElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      clickableElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className={`cursor ${isHovering ? "shrink" : ""}`} // Apply shrink effect
      style={{
        backgroundColor: cursorColor || "var(--white)",
        opacity: cursorOpacity,
      }}
    />
  );
};

export default CustomCursor;
