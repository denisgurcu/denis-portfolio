import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./DadaCollective.css";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const dadaAnimationPath = "/dadabg-lottie.json"; // Path to Lottie animation in the public folder
import dadatv from '../../assets/videos/dadatv.webm';  // Import video file
import DadaGif from "../../assets/videos/dadagiftransparent.gif";
import DadaPrimaryLogo from "../../assets/images/dadaful.png";
import DadaSubmarkLogo from "../../assets/images/dadafavicon.png";
import DadaWordmarkLogo from "../../assets/images/dadawordmark.png";
import PicassoImage from "../../assets/images/picasso.jpg";
import ChairMockup1 from "../../assets/images/dadamokcupchair.jpg";
import DadaPins from "../../assets/images/dadapins.jpg";
import DadaWebsiteVideo from "../../assets/videos/dadawebsite.webm";
import DadaFace from "../../assets/images/dadaface.png";
import DadaLogo from "../../assets/images/dadalogosketch2.png";
import DadaAnim from "../../assets/videos/dadabg.webm";
import DadaWeb from "../../assets/images/dadaweb.png"
import DadaLogoAnim from "../../assets/videos/dadalogoanim.webm"
import DadaTov from "../../assets/videos/dadatov.webm";
import DadaPosters from "../../assets/images/dadaposters.jpg";

const DadaCollective = () => {

  useEffect(() => {
    tippy('.tooltip', {
      content(reference) {
        const imgSrc = reference.getAttribute('data-tooltip-image');
        const text = reference.getAttribute('data-tooltip-text');
        return `
          <div class="cubism-tooltip-content">
            <img src="${imgSrc}" alt="Cubism Example" class="cubism-tooltip-image" />
            <p class="cubism-tooltip-text">${text}</p>
          </div>
        `;
      },
      allowHTML: true,
      theme: 'cubism-theme',
      animation: 'scale',
      arrow: false,
      placement: 'top',
      maxWidth: 400,
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="dada-collective-intro-wrapper">
        <div className="dada-collective-header-container">
          <video src={dadatv} autoPlay loop muted playsInline className="dada-collective-header" />
        </div>

        <h1 className="dada-collective-title">DADA COLLECTIVE</h1>
      </section>

      {/* Project Explanation Section */}
      <section className="dada-collective-content">
        <div className="dada-collective-content-wrapper">
          <div className="dada-collective-content-details">
            <div className="dada-collective-content-field">
              <h3>FIELD</h3>
              <p>EXPERIMENTAL DESIGN</p>
            </div>
            <div className="dada-collective-content-role">
              <h3>ROLE</h3>
              <p>DESIGNER</p>
            </div>
            <div className="dada-collective-content-timeframe">
              <h3>TIMEFRAME</h3>
              <p>2024 &nbsp; • &nbsp; 50 HOURS</p>
            </div>

            {/* Main Focus Tags */}
            <div className="dada-collective-main-focus">
              <h3>Main Focus</h3>
              <div className="dada-collective-work-list-tags">
                <span className="tag">Branding</span>
                <span className="divider">/</span>
                <span className="tag">Web Design</span>
                <span className="divider">/</span>
                <span className="tag">Motion Graphics</span>
              </div>
            </div>
          </div>

          <div className="dada-collective-content-description">
            <p>
              Dada Collective is a fictional <span className="bold">design studio</span> that reflects how I think about creativity—bold, expressive, and driven by curiosity. I created it during my Digital Layouts course at BCIT as a way to bring together my <span className="bold">full skill set</span> into one cohesive concept—branding, motion, web design, and visual storytelling all living under the same roof. It’s inspired by the idea of making things you wish existed, and rooted in <span className="bold">Dadaism</span>—a movement that rejected structure and embraced freedom. For me, it’s not just a design project; it’s a space to explore the edges of what design can be.


            </p>
          </div>
        </div>
      </section>

      <section className="dada-brand-story">
        <div className="brand-story-title-wrapper">

          <div className="brand-story-title">
            WHAT IS DADA<span className="blinking-question">?</span>
          </div>
        </div>

        <div className="brand-story-wrapper">
          {/* Left Text Column */}
          <div className="brand-story-text">
            <h2>
              Dada Collective takes its name <br />
              from the revolutionary art movement, <strong>Dadaism</strong>.
            </h2>
            <p>
              Dadaism, even a century after its inception, remains a mysterious and challenging concept to define.
              Born in Zurich, Switzerland, in 1916 during World War I, Dadaism was fueled by rage and rejection.
              It rebelled against everything perceived as the root cause of the war: bourgeois values, politics,
              and traditional art. The Dadaists were anti-war, anti-bourgeois, and anti-art, embracing a mindset
              of absurdity, cynicism, and rebellion against established norms.
            </p>
          </div>

          {/* Right Visual Column */}
          <div className="brand-story-gif">
            <img src={DadaGif} alt="Dadaism animated quote" />
          </div>
        </div>
      </section>

      <section className="dada-logo-section">
        <div className="dada-logo-title">LOGO SYSTEM</div>
        <div className="dada-logo-wrapper">
          {/* Primary Logo */}
          <div className="dada-logo-item">
            <img src={DadaPrimaryLogo} alt="Primary Logo" className="dada-logo-image" />
            <p><span className="underline">PRIMARY</span></p>
          </div>

          {/* Secondary & Submark (Shared) */}
          <div className="dada-logo-item">
            <img src={DadaSubmarkLogo} alt="Secondary & Submark Logo" className="dada-logo-image" />
            <p>
              <span className="underline">SECONDARY & SUBMARK</span>
            </p>
          </div>

          {/* Wordmark */}
          <div className="dada-logo-item">
            <img src={DadaWordmarkLogo} alt="Wordmark" className="dada-logo-image" />
            <p><span className="underline">WORDMARK</span></p>
          </div>
        </div>
      </section>

      <section className="dada-logo-two-col">
      <div className="dada-logo-text-col">
          {/* <h2 className="dada-logo-section-title">LOGO PROCESS</h2> */}
          <p className="logo-process-text">
            Heavily inspired by{' '}
            <span
              className="tooltip underline-on-hover"
              data-tooltip-image={PicassoImage}
              data-tooltip-text="Cubism breaks down objects into abstract forms. In works like Picasso’s Weeping Woman, facial features are constructed using geometric shapes and emotion."
            >
              Cubism
            </span>
            — I wanted to use the letterforms themselves to echo facial features, just like Cubist artists abstracted faces into symbolic parts.
          </p>
        </div>
        <div className="dada-logo-video-col">
          <video
            src={DadaLogoAnim}
            autoPlay
            loop
            muted
            playsInline
            className="dada-logo-video"
          />
        </div>
      </section>

      <section className="dada-brand-guide">

  {/* MAIN COLOR PALETTE */}
  <section className="dada-color-system">
  <h2 className="dada-color-system-title">COLOR PALETTE</h2>

  {/* Row 1 */}
  <div className="color-row">
    <div className="color-spec-box" style={{ backgroundColor: "#a0668d" }}>
      <div className="color-spec-content">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>Custom Plum</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>27%</p><h4>M</h4><p>60%</p><h4>Y</h4><p>0%</p><h4>K</h4><p>46%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>160</p><h4>G</h4><p>102</p><h4>B</h4><p>141</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#A0668D</p>
        </div>
      </div>
    </div>

    <div className="color-spec-box" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="color-spec-content">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>Black 6 C</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>0%</p><h4>M</h4><p>0%</p><h4>Y</h4><p>0%</p><h4>K</h4><p>90%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>26</p><h4>G</h4><p>26</p><h4>B</h4><p>26</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#1A1A1A</p>
        </div>
      </div>
    </div>

    <div className="color-spec-box" style={{ backgroundColor: "#E0E0E0" }}>
      <div className="color-spec-content dark-text">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>Cool Gray 1 C</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>0%</p><h4>M</h4><p>0%</p><h4>Y</h4><p>0%</p><h4>K</h4><p>12%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>224</p><h4>G</h4><p>224</p><h4>B</h4><p>224</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#E0E0E0</p>
        </div>
      </div>
    </div>

    <div className="color-spec-box" style={{ backgroundColor: "#d8d3ce" }}>
      <div className="color-spec-content dark-text">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>Warm Gray 1 C</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>5%</p><h4>M</h4><p>6%</p><h4>Y</h4><p>9%</p><h4>K</h4><p>16%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>216</p><h4>G</h4><p>211</p><h4>B</h4><p>206</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#D8D3CE</p>
        </div>
      </div>
    </div>
  </div>

  {/* Row 2 */}
  <div className="color-row">
    <div className="color-spec-box" style={{ backgroundColor: "#4F6AB2" }}>
      <div className="color-spec-content">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>Blue 072 C</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>63%</p><h4>M</h4><p>45%</p><h4>Y</h4><p>0%</p><h4>K</h4><p>30%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>79</p><h4>G</h4><p>106</p><h4>B</h4><p>178</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#4F6AB2</p>
        </div>
      </div>
    </div>

    <div className="color-spec-box" style={{ backgroundColor: "#2b5938" }}>
      <div className="color-spec-content">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>5535 C</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>75%</p><h4>M</h4><p>35%</p><h4>Y</h4><p>80%</p><h4>K</h4><p>66%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>43</p><h4>G</h4><p>89</p><h4>B</h4><p>56</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#2B5938</p>
        </div>
      </div>
    </div>

    <div className="color-spec-box" style={{ backgroundColor: "#bb3528" }}>
      <div className="color-spec-content">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>1797 C</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>0%</p><h4>M</h4><p>81%</p><h4>Y</h4><p>82%</p><h4>K</h4><p>27%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>187</p><h4>G</h4><p>53</p><h4>B</h4><p>40</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#BB3528</p>
        </div>
      </div>
    </div>

    <div className="color-spec-box" style={{ backgroundColor: "#f2b631" }}>
      <div className="color-spec-content dark-text">
        <div className="color-column pantone">
          <h4>PANTONE</h4><p>7408 C</p>
        </div>
        <div className="color-column">
          <h4>C</h4><p>0%</p><h4>M</h4><p>20%</p><h4>Y</h4><p>85%</p><h4>K</h4><p>5%</p>
        </div>
        <div className="color-column">
          <h4>R</h4><p>242</p><h4>G</h4><p>182</p><h4>B</h4><p>49</p>
        </div>
        <div className="color-column">
          <h4>HEX</h4><p>#F2B631</p>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="dada-accessibility-colors">
  <div className="accessibility-wrapper">
    {/* Left Side: Accessibility Explanation */}
    <div className="accessibility-text">
      <h3>Accessibility Considerations <span className="blinking-question">?</span></h3>
      <p>
        To ensure optimal readability and inclusivity, I created a set of complementary colors designed with <strong>WCAG contrast</strong> principles in mind. 
      </p>
      <p>
      These lighter tones provide better contrast when paired with Dada Collective’s core brand colors, especially when used in typography or UI components.
      </p>
    </div>

    {/* Right Side: Vertical Color Display */}
    <div className="accessibility-colors">
      {/* Example color boxes */}
      <div className="accessibility-color-box" style={{ backgroundColor: "#f9e4a1" }}>
        <div className="color-info">
          <h4>HEX</h4>
          <p>#F9W4A1</p>
        </div>
      </div>
      <div className="accessibility-color-box" style={{ backgroundColor: "#f4b3a9" }}>
        <div className="color-info">
          <h4>HEX</h4>
          <p>#F4E3DB</p>
        </div>
      </div>
      <div className="accessibility-color-box" style={{ backgroundColor: "#8DAF94" }}>
        <div className="color-info">
          <h4>HEX</h4>
          <p>#8DAF94</p>
        </div>
      </div>
      <div className="accessibility-color-box" style={{ backgroundColor: "#b4c6ea" }}>
        <div className="color-info">
          <h4>HEX</h4>
          <p>#B4C6EA</p>
        </div>
      </div>
      <div className="accessibility-color-box" style={{ backgroundColor: "#f2d4e8" }}>
        <div className="color-info">
          <h4>HEX</h4>
          <p>#F2D4E8</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="typography-section">
  <h2 className="dada-type-section-title">TYPOGRAPHY</h2>
  <div className="type-grid">

        {/* Poster Cut Neue */}
        <div className="type-card">
      <p className="font-name">Poster Cut Neue</p>
      <p className="font-display poster">Aa Bb Cc 123</p>
      <p className="font-details poster">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />1234567890!@#$%^&*()</p>
    </div>

    {/* Brother 1816 */}
    <div className="type-card">
      <p className="font-name">Brother 1816</p>
      <p className="font-display brother">Aa Bb Cc 123</p>
      <p className="font-details brother">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />1234567890!@#$%^&*()</p>
    </div>

    {/* Brother 1816 Printed */}
    <div className="type-card">
      <p className="font-name">Coordinates Variable</p>
      <p className="font-display coordinates">Aa Bb Cc 123</p>
      <p className="font-details coordinates">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />1234567890!@#$%^&*()</p>
    </div>


  </div>
</section>

<section className="tov-section">
  <h2 className="tov-subtitle">How Dada Communicates  <span className="blinking-question">?</span></h2>
  
  <div className="tov-grid">
    <div className="tov-media">
      <video
        src={DadaTov}
        className="tov-video"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>

    <div className="tov-media">
      <img
        src={DadaPosters}
        alt="Dada Posters"
        className="tov-image"
      />
    </div>
  </div>
</section>


<section className="dada-extra-mockups">
  <div className="dada-extra-mockup-grid">
    <img src={ChairMockup1} alt="Dada Mockup" className="dada-extra-mockup-image" />
    <img src={DadaPins} alt="Dada Pins" className="dada-extra-mockup-image" />
  </div>
</section>

<section className="dada-website-section">
  <div className="dada-website-left">
    <h2 className="dada-website-title">What if Dada had a website <span className="blinking-question">?</span></h2>
    <p className="dada-website-desc">
      Well, Dada can have a website — and I built it. Crafted with a fully component-based structure using React, this site comes alive through scroll-triggered animations with GSAP and Framer Motion. <br /><br />
      Does it capture the soul of Dada? That answer’s on you.
    </p>
    <a
      href="https://dada-collective.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="dada-website-button clickable"
    >
      View Live Demo
    </a>
  </div>

  <div className="dada-website-right">
    <video
      src={DadaWebsiteVideo}
      autoPlay
      loop
      muted
      playsInline
      className="dada-website-mockup"
    />
  </div>
</section>

<section className="dada-end-to-end">
      <div className="dada-end-text">
        <h2 className="dada-end-title">This is Dada, end to end.</h2>
        <p className="dada-end-description">
          A single idea evolving across tools — from sketchbook to screen, to the web.
          <br />
          Hand-crafted, animated, and brought to life online.
        </p>
      </div>

      <div className="dada-end-grid">
        <img src={DadaLogo} alt="Sketch" className="dada-end-image" />
        <span className="dada-arrow">→</span>
        <img src={DadaFace} alt="Logo" className="dada-end-image-face" />
        <span className="dada-arrow">→</span>
        <video
          src={DadaAnim}
          className="dada-end-video"
          autoPlay
          loop
          muted
          playsInline
        />
        <span className="dada-arrow">→</span>
        <img src={DadaWeb} alt="Website" className="dada-end-image-website" />
      </div>
    </section>

</section>



    </>
  );
};

export default DadaCollective;
