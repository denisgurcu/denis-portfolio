import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EyeLogo from "./EyeLogo"; // Assuming you have this component
import "./Header.css";

const Header = () => {
  const [linkColor, setLinkColor] = useState("var(--black)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track if the screen is mobile

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden"; // Prevent background scroll
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Ensure menu is closed
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  useEffect(() => {
    const updateLinkColor = () => {
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

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        setLinkColor(luminance < 50 ? "var(--white)" : "var(--black)");
      } else {
        setLinkColor("var(--black)");
      }
    };

    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Update mobile status on resize
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateLinkColor);
    window.addEventListener("resize", updateLinkColor);

    updateLinkColor();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateLinkColor);
      window.removeEventListener("resize", updateLinkColor);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <EyeLogo />
      </div>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav-links ${isMenuOpen ? "mobile-menu open" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu} // Use closeMenu instead of toggleMenu
          style={isMobile ? {} : { color: linkColor }} // Apply linkColor only on larger screens
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          onClick={closeMenu} // Use closeMenu instead of toggleMenu
          style={isMobile ? {} : { color: linkColor }} // Apply linkColor only on larger screens
        >
          Projects
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeMenu} // Use closeMenu instead of toggleMenu
          style={isMobile ? {} : { color: linkColor }} // Apply linkColor only on larger screens
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
