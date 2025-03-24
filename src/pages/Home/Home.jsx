import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";
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
import CardImage7 from "../../assets/images/logo_card_2.gif";
import CardImage8 from "../../assets/images/logo_designs_card_hover.png";

// Register GSAP 
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [cursorColor, setCursorColorState] = useState("transparent");
  const { setCursorColor } = useOutletContext();
  const horizontalRef = useRef(null);

  useEffect(() => {
    // ✅ Load saved cursor color from localStorage
    const savedColor = localStorage.getItem("cursorColor");
    if (savedColor) setCursorColorState(savedColor);
  }, []);

  const handleColorSelect = (color) => {
    setCursorColorState(color);
    setCursorColor(color);
    localStorage.setItem("cursorColor", color);
  };

  // ✅ Fix: Ensure ScrollTrigger Refreshes on Every Page Load
  useEffect(() => {
    console.log("🔄 Refreshing ScrollTrigger on component mount...");
    ScrollTrigger.refresh();
  }, []);

  //  Horizontal Scroll Animation
  useEffect(() => {
    const horizontalSection = horizontalRef.current;
    
    if (horizontalSection) {
      gsap.to(horizontalSection, {
        x: () => -(horizontalSection.scrollWidth - window.innerWidth),
        scrollTrigger: {
          id: "horizontalScroll",
          trigger: horizontalSection,
          start: "center 55%",
          end: "+=4500px",
          pin: ".recent-works-container-pinner",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getById("horizontalScroll")?.kill();
    };
  }, []); 

  // ✅ Fix: Ensure Scroll Animations Restart on Refresh
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(
        ".hero-text",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Branding, graphic, and motion sections
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
            id: "brandingSections",
            trigger: ".hero",
            start: "top 80%",
          },
        }
      );

    });

    // ✅ Ensure ScrollTrigger Refreshes After Animations Load
    setTimeout(() => {
      console.log("Ensuring ScrollTrigger refreshes after animations...");
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor cursorColor={cursorColor} />

      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero">
          <div className="boxes-container">
            <div className="box-wrapper bottom">
              <div className="box branding">
                <Branding />
              </div>
              <div className="label branding-label">BRANDING</div>
            </div>

            <div className="box-wrapper top">
              <div className="label graphic-label">GRAPHIC DESIGN</div>
              <div className="box graphic">
                <Graphic />
              </div>
            </div>

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

      {/* Scroll Section */}
      <section className="scroll-section">
        <div className="scroll-text">
          I'm a multimedia designer specializing in branding, graphic, and motion
          design. I seek imaginative, functional solutions that tell a story.
          <br />
          <span className="cursor-info">You can pick a color for your cursor.</span>
          <ColorPicker onColorSelect={handleColorSelect} />
        </div>

      </section>

      {/* Recent Works Section */}
      <section className="recent-works-container">
        <section className="recent-works-container-pinner">
          <h2 className="recent-works-title">FEATURED PROJECTS</h2>
          <div className="horizontal-scroll-wrapper" ref={horizontalRef}>
            <div className="horizontal-scroll">
              <Card
                title="Dada Collective Branding"
                imageUrl={CardImage1}
                hoverImageUrl={CardImage2}
                tags={null}
              />
              <Card
                title="Poster Designs"
                imageUrl={CardImage3}
                hoverImageUrl={CardImage4}
                tags={null}
                linkTo="/posters"
              />
              <Card
                title="Alter Ego Visual Identity"
                imageUrl={CardImage5}
                hoverImageUrl={CardImage6}
                tags={null}
                linkTo="/alter-ego"
              />
              <Card
                title="Logo Designs"
                imageUrl={CardImage7}
                hoverImageUrl={CardImage8}
                tags={null}
                linkTo="/logo"
              />

              <Card isPlaceholder={true} />
              <Link to="/projects"></Link>
              

              {/* VIEW ALL Card */}
              {/* <div className="view-all-card clickable">
                <Link to="/projects">VIEW <br /> ALL</Link>
              </div> */}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
