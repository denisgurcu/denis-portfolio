import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

const Layout = () => {
  const location = useLocation();
  const [cursorColor, setCursorColor] = useState("transparent");

  useEffect(() => {
    // Load saved color from localStorage
    const savedColor = localStorage.getItem("cursorColor");
    if (savedColor) {
      setCursorColor(savedColor);
    }
  }, [location]); // Recheck localStorage when location changes

  useEffect(() => {
    // Clear existing classes
    document.body.className = "";

    // Add specific class based on current path (because each page has a different color)
    if (location.pathname === "/") {
      document.body.classList.add("home-bg");
    } else if (location.pathname === "/projects") {
      document.body.classList.add("projects-bg");
    } else if (location.pathname === "/about") {
      document.body.classList.add("about-bg");
    }
  }, [location]);

  return (
    <div>
      <CustomCursor cursorColor={cursorColor} />
      <Header />
      <main>
        <Outlet context={{ setCursorColor }} /> {/* Pass setter as context */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
