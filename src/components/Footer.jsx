import React from "react";
import "./Footer.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome icons
import { faLinkedinIn, faGithub, faBehance } from "@fortawesome/free-brands-svg-icons"; // Specific icons I need

const Footer = () => {
  return (
    <footer className="footer"> 
      <div className="footer-left"> 
        <h2>Contact</h2> 
        <div className="contact-container"> 
          <a href="mailto:hello@denisgurcu.com" className="email-button"> 
            hello@denisgurcu.com
          </a>
          <div className="social-icons"> 
            <a href="https://www.behance.net" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faBehance} className="social-icon" /> 
            </a>
            <a href="https://www.linkedin.com/in/denisgurcu/" target="_blank" rel="noopener noreferrer"> 
              <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" /> 
            </a>
            <a href="https://github.com/denisgurcu" target="_blank" rel="noopener noreferrer"> 
              <FontAwesomeIcon icon={faGithub} className="social-icon" /> 
            </a>
          </div>
        </div>
      </div>
      <div className="footer-right"> 
        <p>
          Designed and coded by Denis Gurcu
          <br />
          &copy; 2024. All rights reserved. 
        </p>
      </div>
    </footer>
  );
};

export default Footer; // Exporting the Footer component to use in the app
