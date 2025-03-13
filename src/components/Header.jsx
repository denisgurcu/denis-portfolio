import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EyeLogo from "./EyeLogo"; // Component for the logo
import "./Header.css";

const Header = () => {
  const [linkColor, setLinkColor] = useState("var(--black)"); // Dynamic link color based on the background
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track the state of the mobile menu
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if the screen size is mobile

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the mobile menu open/close
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden"; // Disable scrolling when menu is open
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close the mobile menu
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  useEffect(() => {
    const updateLinkColor = () => {
      // Dynamically change the link color based on overlapping elements
      const header = document.querySelector(".header");
      const navBoundingBox = header.getBoundingClientRect();

      const overlappingElements = document.elementsFromPoint(
        navBoundingBox.left + navBoundingBox.width / 4,
        navBoundingBox.top + navBoundingBox.height / 4
      );

      const backgroundColor = overlappingElements
        .map((el) => getComputedStyle(el).backgroundColor)
        .find((color) => color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent");

      if (backgroundColor) {
        const [r, g, b] = backgroundColor
          .replace(/[^\d,]/g, "")
          .split(",")
          .map(Number);

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Calculate luminance
        setLinkColor(luminance < 50 ? "var(--white)" : "var(--black)"); // Set white for dark backgrounds
      } else {
        setLinkColor("var(--black)");
      }
    };

    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Check for mobile view on resize

    // Add event listeners for resizing and scrolling
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateLinkColor);
    window.addEventListener("resize", updateLinkColor);

    updateLinkColor(); // Initial check

    return () => {
      // Clean up event listeners
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateLinkColor);
      window.removeEventListener("resize", updateLinkColor);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <EyeLogo /> {/* Render the logo */}
      </div>

      {/* Mobile menu toggle button */}
      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`} // Add "open" class when menu is open
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation links */}
      <nav className={`nav-links ${isMenuOpen ? "mobile-menu open" : ""}`}>
        <NavLink
          to="/"
          className="clickable" // Add the class to make cursor shrink on hover
          onClick={closeMenu}
          style={isMobile ? {} : { color: linkColor }}
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className="clickable" // Add the class here too
          onClick={closeMenu}
          style={isMobile ? {} : { color: linkColor }}
        >
          Projects
        </NavLink>
        <NavLink
          to="/about"
          className="clickable" // Add the class here as well
          onClick={closeMenu}
          style={isMobile ? {} : { color: linkColor }}
        >
          About
        </NavLink>

      </nav>
    </header>
  );
};

export default Header; // Export the Header component
