import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const footerRef = useRef(null);
  const containerRef = useRef(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   console.log("🛠 Footer Animation Initialized");

  //   // ✅ Ensure all previous ScrollTriggers are killed
  //   ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  //   // ✅ Ensure GSAP fully resets previous animations
  //   gsap.set(containerRef.current, { scale: 0.75 }); // Start smaller
  //   gsap.set(footerRef.current, { height: "60vh" });

  //   // ✅ GSAP Scroll Animation: Expands the footer on scroll
  //   const footerScaleAnim = gsap.to(containerRef.current, {
  //     scrollTrigger: {
  //       id: "footerTrigger",
  //       trigger: containerRef.current,
  //       start: "top bottom", // Animation starts later
  //       end: "top center",
  //       scrub: 1.5,
  //       invalidateOnRefresh: true,
  //       onEnter: () => console.log("🎬 Footer Scale Animation Started"),
  //       onLeaveBack: () => console.log("🔄 Footer Scale Animation Reversed"),
  //     },
  //     scale: 1, // Grows the entire container to full size
  //   });

  //   const footerHeightAnim = gsap.to(footerRef.current, {
  //     scrollTrigger: {
  //       id: "footerHeightTrigger",
  //       trigger: containerRef.current,
  //       start: "top bottom",
  //       end: "bottom center",
  //       scrub: 1.5,
  //       invalidateOnRefresh: true,
  //       onEnter: () => console.log("🎬 Footer Height Animation Started"),
  //       onLeaveBack: () => console.log("🔄 Footer Height Animation Reversed"),
  //     },
  //     height: "100vh", // Expands to fill the entire viewport
  //   });

  //   // ✅ Refresh ScrollTrigger every time user returns
  //   setTimeout(() => {
  //     console.log("🔄 Refreshing ScrollTrigger...");
  //     ScrollTrigger.refresh();
  //   }, 500);

  //   return () => {
  //     console.log("🛑 Cleaning up animations before unmounting...");
  //     footerScaleAnim.kill();
  //     footerHeightAnim.kill();
  //     ScrollTrigger.getById("footerTrigger")?.kill();
  //     ScrollTrigger.getById("footerHeightTrigger")?.kill();
  //   };
  // }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Main Footer Container */}
      <div className="footer-container" ref={containerRef}>
        {/* Open to Work Section */}
        <div className="footer-content">
          <h2 className="footer-title">Open to work and collaborate.</h2>

          {/* Email & Social Icons */}
          <div className="email-social-container">
            <a href="mailto:hello@denisgurcu.com" className="footer-link clickable">
              hello@denisgurcu.com
            </a>

            {/* Social Icons Now Below Email */}
            <div className="social-icons clickable">
              <a href="https://www.linkedin.com/in/denisgurcu/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://github.com/denisgurcu" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>

        {/* "CONTACT" Large Text */}
        <h1 className="footer-contact">CONTACT</h1>

        {/* Footer Bottom Info */}
        <p className="footer-bottom">
          <span>Designed & coded by Denis Gurcu</span>
          <span>Built with React</span>
          <span>© 2024 All Rights Reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
