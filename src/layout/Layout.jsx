import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Clear existing classes
    document.body.className = "";

    // Add specific class based on current path (because each page hasa different color)
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
      <CustomCursor />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
