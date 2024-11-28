import React from "react";
import "./Home.css";
import Branding from "./Branding"; // Custom component for graph animation
import WaveLines from "./WaveLines"; // Custom component for wave animation
import MatterAnimation from "./MatterAnimation"; // Custom component for Matter.js animation

const Home = () => {
  return (
    <section className="hero">
      <div className="boxes-container">
        <div className="box branding">
          <Branding />
        </div>
        <div className="box graphic">
          <WaveLines />

        </div>
        <div className="box motion">
          <MatterAnimation />

        </div>
      </div>
      <h1 className="hero-text">DENIS</h1>
    </section>
  );
};

export default Home;