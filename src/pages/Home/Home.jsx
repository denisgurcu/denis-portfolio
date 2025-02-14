import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Branding from "./Branding"; 
import Graphic from "./Graphic"; 
import Motion from "./Motion"; 
import ColorPicker from "../../components/ColorPicker"; 
import CustomCursor from "../../components/CustomCursor"; 
import Card from "../../components/Card"; 
import "./Home.css";

// Import project images
import CardImage1 from "../../assets/images/dada_card.gif";
import CardImage2 from "../../assets/images/dada_card_hover.png";
import CardImage3 from "../../assets/images/poster_designs_card.png";
import CardImage4 from "../../assets/images/poster_designs_card_hover.png";
import CardImage5 from "../../assets/images/alter_ego_card.png";
import CardImage6 from "../../assets/images/alter_ego_card_hover.png";
import CardImage7 from "../../assets/images/logo_designs_card.gif";
import CardImage8 from "../../assets/images/logo_designs_card_hover.png";

// Register GSAP 
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [cursorColor, setCursorColorState] = useState("transparent"); // State to manage custom cursor color
  const { setCursorColor } = useOutletContext(); // Get context to update cursor color globally

  useEffect(() => {
    // Load saved cursor color from localStorage
    const savedColor = localStorage.getItem("cursorColor");
    if (savedColor) {
      setCursorColorState(savedColor);
    }
  }, []);

  const handleColorSelect = (color) => {
    setCursorColorState(color); // Update local cursor color state
    setCursorColor(color); // Update cursor color in the global context
    localStorage.setItem("cursorColor", color); // Save selected color
  };

  useEffect(() => {
    // Animation for the hero text
    gsap.fromTo(
      ".hero-text",
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );

    // Animation for the branding, graphic, and motion design sections
    gsap.fromTo(
      ".box-wrapper",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.3, // Delay each box animation
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero", // Start animation when .hero section is in view
          start: "top 80%",
        },
      }
    );

    // Animation for project cards
    gsap.fromTo(
      ".card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3, // Delay each card animation
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".recent-works",
          start: "top 80%", // Start animation when recent works section is in view
        },
      }
    );
  }, []);

  return (
    <>
      {/* Custom cursor with dynamic color */}
      <CustomCursor cursorColor={cursorColor} />

      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero">
          <div className="boxes-container">
            {/* Branding Animation */}
            <div className="box-wrapper">
              <div className="box branding">
                <Branding />
              </div>
              <div className="label branding-label">BRANDING</div>
            </div>
            {/* Graphic Design Animation */}
            <div className="box-wrapper">
              <div className="box graphic">
                <Graphic />
              </div>
              <div className="label graphic-label">GRAPHIC DESIGN</div>
            </div>
            {/* Motion Design Animation */}
            <div className="box-wrapper">
              <div className="box motion">
                <Motion />
              </div>
              <div className="label motion-label">MOTION DESIGN</div>
            </div>
          </div>
          <h1 className="hero-text">DENIS</h1>
        </div>
      </section>

      {/* Scroll Section with Cursor Color Picker */}
      <section className="scroll-section">
        <div className="scroll-text">
          I'm a multimedia designer specializing in branding, graphic, and motion
          design. I seek imaginative, functional solutions that tell a story.
          <br />
          <span className="cursor-info">You can pick a color for your cursor.</span>
        </div>
        <ColorPicker onColorSelect={handleColorSelect} />
      </section>

      {/* Recent Works Section */}
      <section className="recent-works">
        <h2>RECENT PROJECTS</h2>
        <div className="card-grid">
          {/* Render project cards, passing each info */}
          <Card
            title="DADA COLLECTIVE BRANDING"
            imageUrl={CardImage1}
            hoverImageUrl={CardImage2}
            isGif={false}
            // projectDetails="A bold identity for a design agency that thrives on breaking conventions."
            tags={["Branding", "Graphic Design", "Motion Graphics"]}
          />
          <Card
            title="POSTER DESIGNS"
            imageUrl={CardImage3}
            hoverImageUrl={CardImage4}
            isGif={true}
            // projectDetails="A diverse range of visuals created for various marketing campaigns and purposes."
            tags={["Social Media Marketing", "Illustration", "Graphic Design"]}
            linkTo= "/posters"
          />
          <Card
            title="ALTER EGO VISUAL IDENTITY"
            imageUrl={CardImage5}
            hoverImageUrl={CardImage6}
            isGif={false}
            // projectDetails="A branding concept for a coffee shop, blending modernity and self-expression into a refined experience."
            tags={["Branding", "Packaging", "Graphic Design"]}
            linkTo= "/alter-ego"
          />
          <Card
            title="LOGO DESIGNS"
            imageUrl={CardImage7}
            hoverImageUrl={CardImage8}
            isGif={true}
            // projectDetails="A collection of logos crafted to represent unique brand identities"
            tags={["Logo Design", "Graphic Design"]}
            linkTo= "/logo"
          />
        </div>
        <button className="view-more">VIEW MORE</button>
      </section>
    </>
  );
};

export default Home;
