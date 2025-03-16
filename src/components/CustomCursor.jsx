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

    // ✅ Apply event delegation to ALL `.clickable` elements (cards + toolbar buttons)
    const handleMouseEnter = (e) => {
      if (e.target.closest(".clickable")) {
        console.log("Hovered on:", e.target.innerText || e.target.className); // Debugging log
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.closest(".clickable")) {
        console.log("Left:", e.target.innerText || e.target.className); // Debugging log
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
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
