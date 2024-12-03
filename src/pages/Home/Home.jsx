import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Branding from "./Branding"; // Custom component for graph animation
import Graphic from "./Graphic"; // Custom component for wave animation
import Motion from "./Motion"; // Custom component for Matter.js animation
import ColorPicker from "../../components/ColorPicker"; // Color Picker Component
import CustomCursor from "../../components/CustomCursor"; // Custom Cursor Component
import Card from "../../components/Card"; // Import the Card component
import "./Home.css";

// Import images for the cards
import CardImage1 from "../../assets/images/dada_card.gif";
import CardImage2 from "../../assets/images/dada_card_hover.png";
import CardImage3 from "../../assets/images/poster_designs_card.png";
import CardImage4 from "../../assets/images/poster_designs_card_hover.png";
import CardImage5 from "../../assets/images/alter_ego_card.png";
import CardImage6 from "../../assets/images/alter_ego_card_hover.png";
import CardImage7 from "../../assets/images/logo_designs_card.gif";
import CardImage8 from "../../assets/images/logo_designs_card_hover.png";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [cursorColor, setCursorColor] = useState("transparent"); // Default cursor color

  useEffect(() => {
    // Animate "DENIS" text
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

    // Animate the branding, graphic, and motion sections
    gsap.fromTo(
      ".box-wrapper",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero", // Trigger when the .hero section comes into view
          start: "top 80%",
        },
      }
    );

    // Animate cards appearing one by one
    gsap.fromTo(
      ".card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".recent-works",
          start: "top 80%", // Start when the top of the recent works section is 80% in view
        },
      }
    );
  }, []);

  return (
    <>
      {/* Pass both cursorColor and cursorOpacity as props to CustomCursor */}
      <CustomCursor cursorColor={cursorColor} />

      <section className="hero-wrapper">
        <div className="hero">
          <div className="boxes-container">
            <div className="box-wrapper">
              <div className="box branding">
                <Branding />
              </div>
              <div className="label branding-label">BRANDING</div>
            </div>
            <div className="box-wrapper">
              <div className="box graphic">
                <Graphic />
              </div>
              <div className="label graphic-label">GRAPHIC DESIGN</div>
            </div>
            <div className="box-wrapper">
              <div className="box motion">
                <Motion />
              </div>
              <div className="label motion-label">MOTION DESIGN</div>
            </div>
          </div>
          <h1 className="hero-text">DENIS.</h1>
        </div>
      </section>

      <section className="scroll-section">
        <div className="scroll-text">
          I'm a multimedia designer specializing in branding, graphic, and motion
          design. I seek imaginative, functional solutions that tell a story.
          <br />
          <span className="cursor-info">You can pick a color for your cursor.</span>
        </div>

        {/* Add Color Picker Below the Scroll Text */}
        <ColorPicker onColorSelect={setCursorColor} />
      </section>

      <section className="recent-works">
        <h2>RECENT WORKS</h2>
        <div className="card-grid">
          {/* Render the cards, passing the imported images */}
          <Card
            title="DADA COLLECTIVE BRANDING"
            imageUrl={CardImage1}
            hoverImageUrl={CardImage2}
            isGif={false}
            projectDetails="A bold identity for a design agency that thrives on breaking conventions."
            tags={["Branding", "Graphic Design", "Motion Graphics"]}
          />
          <Card
            title="POSTER DESIGNS"
            imageUrl={CardImage3}
            hoverImageUrl={CardImage4}
            isGif={true}
            projectDetails=" A diverse range of visuals created for various marketing campaigns and purposes."
            tags={["Social Media Marketing", "Illustration", "Graphic Design"]}
          />
          <Card
            title="ALTER EGO VISUAL IDENTITY"
            imageUrl={CardImage5}
            hoverImageUrl={CardImage6}
            isGif={false}
            projectDetails="A branding concept for a coffee shop, blending modernity and self-expression into a refined experience."
            tags={["Branding", "Packaging", "Graphic Design"]}
          />
          <Card
            title="LOGO DESIGNS"
            imageUrl={CardImage7}
            hoverImageUrl={CardImage8}
            isGif={true}
            projectDetails="A collection of logos crafted to represent unique brand identities"
            tags={["Logo Design", "Graphic Design"]}
          />
        </div>
        <button className="view-more">VIEW MORE</button>
      </section>
    </>
  );
};

export default Home;
