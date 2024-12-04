import React, { useState, useEffect } from "react";
import GraphAnimation from './GraphAnimation';
import WaveAnimation from './WaveAnimation';
import MotionAnimation from './MotionAnimation'; // Import the MotionAnimation component
import Card from "../../components/Card"; // Import Card component
import './Projects.css';

// Import images for the cards
import CardImage1 from "../../assets/images/dada_card.gif";
import CardImage2 from "../../assets/images/dada_card_hover.png";
import CardImage3 from "../../assets/images/poster_designs_card.png";
import CardImage4 from "../../assets/images/poster_designs_card_hover.png";
import CardImage5 from "../../assets/images/alter_ego_card.png";
import CardImage6 from "../../assets/images/alter_ego_card_hover.png";
import CardImage7 from "../../assets/images/logo_designs_card.gif";
import CardImage8 from "../../assets/images/logo_designs_card_hover.png";

// Example project data
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

  const [showGraphAnimation, setShowGraphAnimation] = useState(true); // Initially, show the graph animation
  const [showWaveAnimation, setShowWaveAnimation] = useState(false); // Initially, don't show the wave animation
  const [showMotionAnimation, setShowMotionAnimation] = useState(false); // Initially, don't show the motion animation

  const handleGraphAnimationComplete = () => {
    console.log("Graph animation completed");
    // Once the graph animation finishes, hide it and show the wave animation
    setShowGraphAnimation(false);  // Hide Graph Animation
    setShowWaveAnimation(true);    // Show Wave Animation
  };

  const handleWaveAnimationComplete = () => {
    console.log("Wave animation completed");
    // Once the wave animation finishes, hide it and show the motion animation (Matter.js)
    setShowWaveAnimation(false);   // Hide Wave Animation
    setShowMotionAnimation(true);  // Show Motion Animation (Matter.js)
  };

  useEffect(() => {
    // Trigger the animation sequence when the page loads:
    // 1. Show the graph animation.
    // 2. Once the graph animation is complete, show the wave animation.
    // 3. Once the wave animation is complete, show the motion animation.
    setShowGraphAnimation(true); // Start the graph animation on page load
  }, []);

  return (
    <>
      {/* Animation Section */}
      <section className="projects-intro-wrapper">
        <div className="projects-animation-container">
          {/* Graph Animation */}
          {showGraphAnimation && <GraphAnimation onComplete={handleGraphAnimationComplete} />}
          
          {/* Wave Animation */}
          {showWaveAnimation && <WaveAnimation onComplete={handleWaveAnimationComplete} />}
          
          {/* Motion Animation */}
          {showMotionAnimation && <MotionAnimation />}
        </div>
        <h1 className="projects-text">PROJECTS</h1>
      </section>

      {/* Projects Tabbed Section */}
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
            className={`tab ${selectedTab === "branding" ? "active" : ""}`}
            onClick={() => setSelectedTab("branding")}
          >
            Branding
          </button>
          <button
            className={`tab ${selectedTab === "motion" ? "active" : ""}`}
            onClick={() => setSelectedTab("motion")}
          >
            Motion
          </button>
          <button
            className={`tab ${selectedTab === "graphic" ? "active" : ""}`}
            onClick={() => setSelectedTab("graphic")}
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
              projectDetails={project.projectDetails}
              tags={project.tags}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
