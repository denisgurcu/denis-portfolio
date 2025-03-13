import React, { useState, useEffect, useRef} from "react";
import { useOutletContext, Link } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";
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
import CardImage1 from "../../assets/images/dadacard.gif";
import CardImage2 from "../../assets/images/dada_card_hover.png";
import CardImage3 from "../../assets/images/poster_designs_card.png";
import CardImage4 from "../../assets/images/poster_designs_card_hover.png";
import CardImage5 from "../../assets/images/alterego_cup.jpg";
import CardImage6 from "../../assets/images/alter_ego_card_hover.png";
import CardImage7 from "../../assets/images/logo_designs_card.png";
import CardImage8 from "../../assets/images/logo_designs_card_hover.png";

// Register GSAP 
gsap.registerPlugin(ScrollTrigger);



const Home = () => {
  const [cursorColor, setCursorColorState] = useState("transparent"); // State to manage custom cursor color
  const { setCursorColor } = useOutletContext(); // Get context to update cursor color globally
  const horizontalRef = useRef(null); // Ref for horizontal scrolling


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
    // GSAP Animation for horizontal scrolling
    const horizontalSection = horizontalRef.current;

    gsap.to(horizontalSection, {
      x: () => -(horizontalSection.scrollWidth - window.innerWidth), // Ensures it stops at the right place
      scrollTrigger: {
        trigger: horizontalSection,
        start: "center 55%",
        end: "+=3000px",
        pin: ".recent-works-container",
        scrub: 1.5,
        invalidateOnRefresh: true,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);


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
            {/* Branding (Label at Bottom) */}
            <div className="box-wrapper bottom">
              <div className="box branding">
                <Branding />
              </div>
              <div className="label branding-label">BRANDING</div>
            </div>

            {/* Graphic Design (Label at Top) */}
            <div className="box-wrapper top">
              <div className="label graphic-label">GRAPHIC DESIGN</div>
              <div className="box graphic">
                <Graphic />
              </div>
            </div>

            {/* Motion (Label at Bottom) */}
            <div className="box-wrapper bottom">
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
      <section className="recent-works-container">
        <h2 className="recent-works-title">RECENT PROJECTS</h2>
        <div className="horizontal-scroll-wrapper" ref={horizontalRef}>
          <div className="horizontal-scroll">
            <Card
              title="DADA COLLECTIVE"
              imageUrl={CardImage1}
              hoverImageUrl={CardImage2}
              tags={["Branding", "Graphic Design", "Motion Graphics"]}
            />
            <Card
              title="POSTER DESIGNS"
              imageUrl={CardImage3}
              hoverImageUrl={CardImage4}
              tags={["Social Media Marketing", "Illustration", "Graphic Design"]}
              linkTo="/posters"
            />
            <Card
              title="ALTER EGO"
              imageUrl={CardImage5}
              hoverImageUrl={CardImage6}
              tags={["Branding", "Packaging", "Graphic Design"]}
              linkTo="/alter-ego"
            />
            <Card
              title="LOGO DESIGNS"
              imageUrl={CardImage7}
              hoverImageUrl={CardImage8}
              tags={["Logo Design", "Graphic Design"]}
              linkTo="/logo"
            />

            {/* VIEW ALL Card */}
            <div className="view-all-card clickable">
              <Link to="/projects">VIEW <br /> ALL</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
