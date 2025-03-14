import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EyeLogo from "./EyeLogo"; // Component for the logo
import "./Header.css";

const Header = () => {
  const [linkColor, setLinkColor] = useState("var(--black)"); // Dynamic link color
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if mobile
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Controls header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Store last scroll position

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden"; // Disable scrolling when menu is open
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY <= lastScrollY); // Hide on scroll down, show on scroll up
      setLastScrollY(currentScrollY);
    };

    const updateLinkColor = () => {
      const header = document.querySelector(".header");
      if (!header) return;

      const navBoundingBox = header.getBoundingClientRect();
      const overlappingElements = document.elementsFromPoint(
        navBoundingBox.left + navBoundingBox.width / 4,
        navBoundingBox.top + navBoundingBox.height / 4
      );

      const backgroundColor = overlappingElements
        .map((el) => getComputedStyle(el).backgroundColor)
        .find((color) => color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent");

      if (backgroundColor) {
        const [r, g, b] = backgroundColor.replace(/[^\d,]/g, "").split(",").map(Number);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        setLinkColor(luminance < 50 ? "var(--white)" : "var(--black)");
      } else {
        setLinkColor("var(--black)");
      }
    };

    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateLinkColor);
    window.addEventListener("resize", updateLinkColor);

    updateLinkColor();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateLinkColor);
      window.removeEventListener("resize", updateLinkColor);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${isHeaderVisible ? "visible" : "hidden"}`}>
      {/* Eye logo (also hides on scroll) */}
      <div className="logo">
        <EyeLogo />
      </div>

      {/* Mobile menu toggle button */}
      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation links with active page indicator */}
      <nav className={`nav-links ${isMenuOpen ? "mobile-menu open" : ""}`}>
        <NavLink 
          to="/" 
          className="clickable" 
          onClick={closeMenu} 
          style={isMobile ? {} : { color: linkColor }}
        >
          Home
        </NavLink>
        <NavLink 
          to="/projects" 
          className="clickable" 
          onClick={closeMenu} 
          style={isMobile ? {} : { color: linkColor }}
        >
          Projects
        </NavLink>
        <NavLink 
          to="/about" 
          className="clickable" 
          onClick={closeMenu} 
          style={isMobile ? {} : { color: linkColor }}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
