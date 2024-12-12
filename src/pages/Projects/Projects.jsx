import React, { useState, useEffect } from "react";
import GraphAnimation from './GraphAnimation';
import WaveAnimation from './WaveAnimation';
import MotionAnimation from './MotionAnimation'; // Component for Matter.js animation
import Card from "../../components/Card"; // Card component for project display
import './Projects.css';

// Import images for the project cards
import CardImage1 from "../../assets/images/dada_card.gif";
import CardImage2 from "../../assets/images/dada_card_hover.png";
import CardImage3 from "../../assets/images/poster_designs_card.png";
import CardImage4 from "../../assets/images/poster_designs_card_hover.png";
import CardImage5 from "../../assets/images/alter_ego_card.png";
import CardImage6 from "../../assets/images/alter_ego_card_hover.png";
import CardImage7 from "../../assets/images/logo_designs_card.gif";
import CardImage8 from "../../assets/images/logo_designs_card_hover.png";

// Project data with details, tags, and images
const projectData = [
  {
    title: "DADA COLLECTIVE BRANDING",
    imageUrl: CardImage1,
    hoverImageUrl: CardImage2,
    isGif: false,
    projectDetails: "A bold identity for a design agency that thrives on breaking conventions.",
    tags: ["Branding", "Graphic Design", "Motion Graphics"],
  },
  {
    title: "POSTER DESIGNS",
    imageUrl: CardImage3,
    hoverImageUrl: CardImage4,
    isGif: true,
    projectDetails: "A diverse range of visuals created for various marketing campaigns and purposes.",
    tags: ["Social Media Marketing", "Illustration", "Graphic Design"],
  },
  {
    title: "ALTER EGO VISUAL IDENTITY",
    imageUrl: CardImage5,
    hoverImageUrl: CardImage6,
    isGif: false,
    projectDetails: "A branding concept for a coffee shop, blending modernity and self-expression into a refined experience.",
    tags: ["Branding", "Packaging", "Graphic Design"],
    linkTo: "/alter-ego",
  },
  {
    title: "LOGO DESIGNS",
    imageUrl: CardImage7,
    hoverImageUrl: CardImage8,
    isGif: true,
    projectDetails: "A collection of logos crafted to represent unique brand identities.",
    tags: ["Logo Design", "Graphic Design"],
  },
];

const Projects = () => {
  const [selectedTab, setSelectedTab] = useState("all"); // Default tab is 'All'

  // Filter projects based on the selected tab
  const filteredProjects = selectedTab === "all" 
    ? projectData 
    : projectData.filter(project => project.tags.includes(selectedTab));


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

      {/* Filter and Display Projects */}
      <section className="projects-filter-section">
        <div className="tabs">
          {/* Tab group */}
          <button
            className={`tab ${selectedTab === "all" ? "active" : ""}`}
            onClick={() => setSelectedTab("all")}
          >
            All
          </button>
          <button
            className={`tab ${selectedTab === "Branding" ? "active" : ""}`}
            onClick={() => setSelectedTab("Branding")}
          >
            Branding
          </button>
          <button
            className={`tab ${selectedTab === "Motion Graphics" ? "active" : ""}`}
            onClick={() => setSelectedTab("Motion Graphics")}
          >
            Motion
          </button>
          <button
            className={`tab ${selectedTab === "Graphic Design" ? "active" : ""}`}
            onClick={() => setSelectedTab("Graphic Design")}
          >
            Graphic
          </button>
        </div>

        {/* Render filtered projects */}
        <div className="project-cards">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              imageUrl={project.imageUrl}
              hoverImageUrl={project.hoverImageUrl}
              isGif={project.isGif}
              // projectDetails={project.projectDetails}
              tags={project.tags}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
