import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EyeLogo from "./EyeLogo"; // Assuming you have this component
import "./Header.css";

const Header = () => {
  const [linkColor, setLinkColor] = useState("var(--black)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);

    // Prevent background scroll when the menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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

    window.addEventListener("scroll", updateLinkColor);
    window.addEventListener("resize", updateLinkColor);
    updateLinkColor();

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

      {/* Navigation Links */}
      <nav className={`nav-links ${isMenuOpen ? "mobile-menu" : ""}`}>
        <NavLink to="/" style={{ color: linkColor }} onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/projects" style={{ color: linkColor }} onClick={() => setIsMenuOpen(false)}>
          Projects
        </NavLink>
        <NavLink to="/about" style={{ color: linkColor }} onClick={() => setIsMenuOpen(false)}>
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
