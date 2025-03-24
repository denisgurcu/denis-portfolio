import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // make sure this is at the top!
import Isotope from "isotope-layout";
import imagesLoaded from 'imagesloaded';
import { IoGridOutline, IoListOutline } from "react-icons/io5";
import GraphAnimation from './GraphAnimation';
import WaveAnimation from './WaveAnimation';
import MotionAnimation from './MotionAnimation'; // Component for Matter.js animation
import Card from "../../components/Card"; // Card component for project display
import './Projects.css';
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective.css";


// Import images for the project cards
import CardImage1 from "../../assets/images/dadacard.gif";
import CardImage2 from "../../assets/images/dada_card_hover.png";
import CardImage3 from "../../assets/images/poster_designs_card.png";
import CardImage4 from "../../assets/images/poster_designs_card_hover.png";
import CardImage5 from "../../assets/images/alterego_cup.jpg";
import CardImage6 from "../../assets/images/alter_ego_card_hover.png";
import CardImage7 from "../../assets/images/logo_card_2.gif";
import CardImage8 from "../../assets/images/logo_designs_card_hover.png";

// Project data with details, tags, and images
const projectData = [
  {
    title: "DADA COLLECTIVE BRANDING",
    imageUrl: CardImage1,
    hoverImageUrl: CardImage2,
    isGif: false,
    projectDetails: "A bold, rebellious identity for a design agency that thrives on breaking conventions. Playful typography, surrealist imagery, and dynamic layouts bring the brand’s avant-garde spirit to life across digital and print.",
    tags: ["Branding", "Graphic Design", "Motion Graphics"],
    linkTo: "/dada-collective",
  },
  {
    title: "POSTER DESIGNS",
    imageUrl: CardImage3,
    hoverImageUrl: CardImage4,
    isGif: true,
    projectDetails: "A series of visually striking posters crafted for marketing campaigns and cultural events. Each design leverages bold compositions, vibrant colors, and compelling storytelling to create instant impact and brand recognition..",
    tags: ["Social Media Marketing", "Illustration", "Graphic Design"],
    linkTo: "/posters",

  },
  {
    title: "ALTER EGO VISUAL IDENTITY",
    imageUrl: CardImage5,
    hoverImageUrl: CardImage6,
    isGif: false,
    projectDetails: "A modern, expressive brand identity for a coffee shop that blends sleek minimalism with self-expression. The visual identity extends to packaging, interior design, and digital touchpoints, ensuring a cohesive customer experience.",
    tags: ["Branding", "Packaging", "Graphic Design"],
    linkTo: "/alter-ego",

  },
  {
    title: "LOGO DESIGNS",
    imageUrl: CardImage7,
    hoverImageUrl: CardImage8,
    isGif: true,
    projectDetails: "A collection of custom-crafted logos designed for versatility and impact. Each logo is tailored to reflect the brand’s personality, ensuring recognition and scalability across various applications.",
    tags: ["Logo Design", "Graphic Design"],
    linkTo: "/logo",
  },
];



const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [view, setView] = useState("grid"); // View state (grid/list)
  const isotopeRef = useRef(null);

  // Initialize Isotope and Apply the Filter After Changing the View
  useEffect(() => {
    if (isotopeRef.current) {
      isotopeRef.current.destroy();
    }

    isotopeRef.current = new Isotope(view === "grid" ? ".projects-gallery" : ".work-list-wrapper", {
      itemSelector: view === "grid" ? ".projects-item" : ".work-list-item",
      layoutMode: view === "grid" ? "masonry" : "fitRows",
      transitionDuration: "0.6s",
      masonry: {
        gutter: view === "grid" ? 25 : 0,
      },
      fitRows: {
        gutter: 10,
      },
    });

    // ✅ Apply the selected filter again after view change
    const filterValue = selectedFilter === "all" ? "*" : `.${selectedFilter.replace(/\s+/g, "-")}`;
    isotopeRef.current.arrange({ filter: filterValue });

    return () => {
      if (isotopeRef.current) {
        isotopeRef.current.destroy();
      }
    };
  }, [view, selectedFilter]); // ✅ Added `selectedFilter` as a dependency


  // Apply Filtering for Both Views
  useEffect(() => {
    if (isotopeRef.current) {
      const containerSelector = view === "grid" ? ".projects-gallery" : ".work-list-wrapper";
      const containerEl = document.querySelector(containerSelector);

      if (!containerEl) return;

      const filterValue = selectedFilter === "all" ? "*" : `.${selectedFilter.replace(/\s+/g, "-")}`;

      // Proper usage of imagesLoaded
      imagesLoaded(containerEl, () => {
        requestAnimationFrame(() => {
          isotopeRef.current.arrange({ filter: filterValue });

          // Force layout again in case there's a visual jump
          setTimeout(() => {
            isotopeRef.current.layout();
          }, 50);
        });
      });
    }
  }, [selectedFilter, view]);



  const [animationState, setAnimationState] = useState({
    showGraph: true,
    showWave: false,
    showMotion: false,
  });


  const handleGraphAnimationComplete = () => {
    setAnimationState({ showGraph: false, showWave: true, showMotion: false });
  };

  const handleWaveAnimationComplete = () => {
    setAnimationState({ showGraph: false, showWave: false, showMotion: true });
  };

  useEffect(() => {
    // Start graph animation when the component mounts
    setAnimationState({ showGraph: true, showWave: false, showMotion: false });
  }, []);

  useEffect(() => {
    // Initialize Tippy.js tooltips
    tippy(".grid-view-button", {
      content: "Grid View",
      theme: "my-theme",
      placement: "top",
      animation: "perspective",
      arrow: false,
      delay: [100, 200],
    });

    tippy(".list-view-button", {
      content: "List View",
      theme: "my-theme",
      placement: "top",
      animation: "perspective",
      arrow: false,
      delay: [100, 200],
    });
  }, []);

  return (
    <>
      {/* Animation Section */}
      <section className="projects-intro-wrapper">
        <div className="projects-animation-container">
          {animationState.showGraph && <GraphAnimation onComplete={handleGraphAnimationComplete} />}
          {animationState.showWave && <WaveAnimation onComplete={handleWaveAnimationComplete} />}
          {animationState.showMotion && <MotionAnimation />}
        </div>
        <h1 className="projects-text">PROJECTS</h1>
      </section>

      {/* Wrapper starts here */}
      <div className="projects-wrapper">
        <section className="projects-filter-section">
          <div className="filters-container">
            <div className="tabs clickable">
              {["all", "Branding", "Motion-Graphics", "Graphic-Design"].map((filter) => (
                <button
                  key={filter}
                  className={`tab ${selectedFilter === filter ? "active" : ""}`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter.replace("-", " ")} {/* ✅ Show readable text */}
                </button>
              ))}
            </div>
            <div className="view-switch clickable">
              <button
                className={`grid-view-button ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
              >
                <IoGridOutline />
              </button>

              <button
                className={`list-view-button ${view === "list" ? "active" : ""}`}
                onClick={() => setView("list")}
              >
                <IoListOutline />
              </button>
            </div>
          </div>

          {/* Grid View */}
          {view === "grid" && (
            <div className="projects-gallery">
              {projectData.map((project, index) => (
                <div
                  key={index}
                  className={`projects-item ${project.tags.map((tag) => tag.replace(/\s+/g, "-")).join(" ")}`}
                >
                  <Card
                    title={project.title}
                    imageUrl={project.imageUrl}
                    hoverImageUrl={project.hoverImageUrl}
                    linkTo={project.linkTo}
                  />
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {view === "list" && (
            <div className="work-list-wrapper">
              {projectData.map((project, index) => (
                <Link
                  key={index}
                  to={project.linkTo}
                  className={`work-list-item ${project.tags.map((tag) => tag.replace(/\s+/g, "-")).join(" ")} clickable-inner clickable`}
                >
                  <div className="work-list-image">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                  <div className="work-list-content">
                    <h3 className="work-list-title">{project.title}</h3>
                    <p className="work-list-description">{project.projectDetails}</p>
                    <div className="work-list-tags">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                          {index !== project.tags.length - 1 && <span className="divider"> / </span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
      {/* Wrapper ends here */}
    </>
  );
};

export default Projects;