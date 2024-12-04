import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./CustomCursor.css";

const CustomCursor = ({ cursorColor }) => {
  const [cursorOpacity, setCursorOpacity] = useState(0.8);

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
