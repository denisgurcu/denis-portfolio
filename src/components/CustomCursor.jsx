import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./CustomCursor.css";

const CustomCursor = ({ cursorColor }) => {
  const [cursorOpacity, setCursorOpacity] = useState(0.8);

  // Fetch the default cursor color from the CSS variable
  const defaultColor = getComputedStyle(document.documentElement).getPropertyValue("--default-cursor-color").trim();

  const [currentColor, setCurrentColor] = useState(defaultColor); // Initialize with resolved default color

  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    document.body.style.cursor = "none";

    let xTo = gsap.quickTo(".cursor", "x", { duration: 0.1, ease: "power3" });
    let yTo = gsap.quickTo(".cursor", "y", { duration: 0.1, ease: "power3" });

    const updateCursorPosition = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setCursorOpacity(1);
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  useEffect(() => {
    if (cursorColor) {
      setCurrentColor(cursorColor); // Update color when prop changes
    } else {
      setCurrentColor(defaultColor); // Revert to default if no color is passed
    }
  }, [cursorColor, defaultColor]);

  return (
    <div
      className="cursor"
      style={{
        backgroundColor: currentColor,
        opacity: cursorOpacity,
      }}
    />
  );
};

export default CustomCursor;
