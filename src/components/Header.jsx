import React from "react";
import { NavLink } from "react-router-dom";
import EyeLogo from "./EyeLogo"; // Import the interactive eye logo
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <EyeLogo /> 
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
};

export default Header;