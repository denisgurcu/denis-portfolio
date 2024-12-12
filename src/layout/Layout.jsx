import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import CustomCursor from "../components/CustomCursor"; // Custom cursor component should be here so it can be saved in all pages

const Layout = () => {
  const location = useLocation(); // Get current route location
  const [cursorColor, setCursorColor] = useState("transparent"); // State to manage cursor color

  useEffect(() => {
    // Load saved cursor color from localStorage when location changes
    const savedColor = localStorage.getItem("cursorColor");
    if (savedColor) {
      setCursorColor(savedColor); // Update the cursor color state
    }
  }, [location]); // Recheck the color whenever the route changes

  useEffect(() => {
    // Reset body classes 
    document.body.className = "";

    // Add specific class to body based on the current route
    if (location.pathname === "/") {
      document.body.classList.add("home-bg"); // Add "home-bg" for the homepage
    } else if (location.pathname === "/projects") {
      document.body.classList.add("projects-bg"); // Add "projects-bg" for the projects page
    } else if (location.pathname === "/about") {
      document.body.classList.add("about-bg"); // Add "about-bg" for the about page
    } else if (location.pathname === "/alter-ego") {
      document.body.classList.add("home-bg"); // Reuse "home-bg" for Alter Ego

    } else if (location.pathname === "/posters") {
      document.body.classList.add("home-bg"); // Reuse "home-bg" for Alter Ego
    }
    
  }, [location]); // Reapply background class whenever the route changes

  return (
    <div>
      <CustomCursor cursorColor={cursorColor} /> {/* Render custom cursor */}
      <Header /> 
      <main>
        <Outlet context={{ setCursorColor }} /> {/* Pass setCursorColor to child components */}
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout; // Export the Layout component
