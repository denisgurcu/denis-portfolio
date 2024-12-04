import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./CustomCursor.css";

const CustomCursor = ({ cursorColor }) => {
  const [cursorOpacity, setCursorOpacity] = useState(0.8);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and set whether it's mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Update on resize

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.add("default-cursor");
      return; // Disable custom cursor on mobile
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

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [isMobile]);

  // Don't render custom cursor on mobile
  if (isMobile) return null;

  return (
    <div
      className="cursor"
      style={{
        backgroundColor: cursorColor || "transparent",
        opacity: cursorOpacity,
      }}
    />
  );
};

export default CustomCursor;
