import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

const Layout = () => {
  const location = useLocation();
  const [cursorColor, setCursorColor] = useState(null);

  useEffect(() => {
    // Load saved color from localStorage or default to white
    const savedColor = localStorage.getItem("cursorColor");
    if (savedColor) {
      setCursorColor(savedColor);
    } else {
      setCursorColor("var(--default-cursor-color)"); // Fallback to default
    }
  }, []);

  useEffect(() => {
    // Clear existing classes
    document.body.className = "";

    // Add specific class based on current path
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
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
