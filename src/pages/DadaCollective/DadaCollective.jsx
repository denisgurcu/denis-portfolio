import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./DadaCollective.css"; 
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const dadaAnimationPath = "/dadabg-lottie.json"; // Path to Lottie animation in the public folder
const webmPath = "/dadabg.webm";  // Path to WebM video in the public folder

gsap.registerPlugin(ScrollTrigger);

const DadaCollective = () => {
  const lottieRef = useRef(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Detect if the browser is Safari
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    // If it's Safari, load the Lottie animation
    if (isSafari && lottieRef.current) {
      lottie.loadAnimation({
        container: lottieRef.current,  // The container for the animation
        renderer: 'svg',  // Use SVG renderer for better compatibility
        loop: true,
        autoplay: true,
        path: dadaAnimationPath,  // Path to the Lottie animation JSON file
      });
    }
  }, [isSafari]);

  return (
    <>
{/* Hero Section */}
<section className="dada-collective-intro-wrapper">
  <div className="dada-animation-container">
    {/* Lottie animation for Safari, WebM video for others */}
    {isSafari ? (
      <div className="hero-lottie" ref={lottieRef}></div>
    ) : (
      <video
        className="hero-video"
        src={webmPath}  // Use WebM video for non-Safari browsers
        autoPlay
        loop
        muted
        playsInline
      />
    )}
  </div>
  <h1 className="dada-text">DADA COLLECTIVE</h1> {/* Text is now centered at the bottom */}
</section>

      {/* Project Explanation Section */}
      <section className="dada-content">
        <div className="content-wrapper">
          <div className="content-details">
            <div className="content-field">
              <h3>FIELD</h3>
              <p>BRANDING, DESIGN</p>
            </div>
            <div className="content-role">
              <h3>ROLE</h3>
              <p>CREATIVE DIRECTOR</p>
            </div>
            <div className="content-timeframe">
              <h3>TIMEFRAME</h3>
              <p>Jan 2025 - Present</p>
            </div>
          </div>
          <div className="content-description">
            <p>
              Dada Collective is a creative studio built around bold ideas, pushing the boundaries of design with motion and immersive experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Concept Section */}
      <section className="logo-concept-section">
        <div className="logo-concept-wrapper">
          <div className="concept-item">
            <img
              src="/path/to/logo.png"  // Replace with actual path to the logo image
              alt="Dada Collective Logo"
              className="concept-image"
            />
            <p>LOGO CONCEPT</p>
          </div>
        </div>
      </section>

      {/* Project Updates Section */}
      <section className="project-updates">
        <h2>Recent Work</h2>
        <p>More updates will be added here as the project develops.</p>
      </section>
    </>
  );
};

export default DadaCollective;
