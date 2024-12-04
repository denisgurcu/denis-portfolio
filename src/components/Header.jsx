import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EyeLogo from "./EyeLogo"; // Import the interactive eye logo
import "./Header.css";

const Header = () => {
  const [linkColor, setLinkColor] = useState("var(--black)");

  useEffect(() => {
    const updateLinkColor = () => {
      const header = document.querySelector(".header");
      const sections = document.elementsFromPoint(header.getBoundingClientRect().left, header.getBoundingClientRect().bottom);

      // Find the first section with a background color
      const backgroundColor = sections
        .map((el) => getComputedStyle(el).backgroundColor)
        .find((color) => color !== "rgba(0, 0, 0, 0)" && color !== "transparent");

      if (backgroundColor) {
        // Calculate brightness
        const [r, g, b] = backgroundColor
          .replace(/[^\d,]/g, "")
          .split(",")
          .map(Number);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Update link color based on brightness
        setLinkColor(luminance < 128 ? "var(--white)" : "var(--black)");
      }
    };

    window.addEventListener("scroll", updateLinkColor); // Recalculate on scroll
    window.addEventListener("resize", updateLinkColor); // Recalculate on resize
    updateLinkColor(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", updateLinkColor);
      window.removeEventListener("resize", updateLinkColor);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <EyeLogo />
      </div>
      <nav>
        <NavLink to="/" style={{ color: linkColor }}>Home</NavLink>
        <NavLink to="/projects" style={{ color: linkColor }}>Projects</NavLink>
        <NavLink to="/about" style={{ color: linkColor }}>About</NavLink>
      </nav>
    </header>
  );
};

export default Header;
