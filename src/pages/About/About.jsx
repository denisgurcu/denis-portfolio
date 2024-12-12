import React from "react";
import Masonry from "react-masonry-css"; // Import Masonry for grid layout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome for icons
import {
    faLinkedinIn,
    faGithub,
    faBehance,
} from "@fortawesome/free-brands-svg-icons"; // Social media icons
import "./About.css"; 

// Import images for the About page
import AboutImage1 from "../../assets/images/about_image1.png";
import AboutImage3 from "../../assets/images/about_image3.png";

// Import icons for tools used in the Tool Stack section
import afterEffectsIcon from "../../assets/icons/after-effects.png";
import illustratorIcon from "../../assets/icons/illustrator.png";
import photoshopIcon from "../../assets/icons/photoshop.png";
import indesignIcon from "../../assets/icons/indesign.png";
import premiereIcon from "../../assets/icons/premiere-pro.png";
import figmaIcon from "../../assets/icons/figma.png";
import wordpressIcon from "../../assets/icons/wordpress.png";
import htmlIcon from "../../assets/icons/html.png";
import cssIcon from "../../assets/icons/css.png";
import jsIcon from "../../assets/icons/js.png";

const About = () => {
    // Object containing the icons for the tools
    const icons = {
        afterEffects: afterEffectsIcon,
        illustrator: illustratorIcon,
        photoshop: photoshopIcon,
        indesign: indesignIcon,
        premiere: premiereIcon,
        figma: figmaIcon,
        wordpress: wordpressIcon,
        html: htmlIcon,
        css: cssIcon,
        js: jsIcon,
    };

    return (
        <>
            {/* About Manifesto Section */}
            <section className="about-wrapper">
                <div className="about-manifesto">
                    <p>
                        I believe design is a form of art, and this relentless passion led me to transition to the creative field. I enjoy communicating through visuals, connecting through stories, and reflecting shared experiences with the mediums we have. The world would be empty without that. Creativity with purpose and functional beauty inspire and motivate me, so that I create works that inspire and motivate others. My goal is to keep pushing boundaries, and continuing to pursue what I love.
                    </p>
                </div>
                <h1 className="about-title">ABOUT</h1>
            </section>

            {/* Masonry Grid Section */}
            <section className="about-masonry-wrapper">
                <Masonry
                    breakpointCols={{
                        default: 2, // Default 2 columns
                        1100: 1,    // 1 column for screens <= 1100px
                        700: 1,     // 1 column for screens <= 700px
                        500: 1,     // 1 column for screens <= 500px
                    }}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {/* Bento Image */}
                    <div className="bento-box bento-1">
                        <img src={AboutImage1} alt="Image 1" className="masonry-image" />
                    </div>

                    {/* Experience Section */}
                    <div className="bento-box bento-2">
                        <div className="box-content">
                            <h2>EXPERIENCE</h2>
                            <p>
                                After transitioning from finance, I’ve had the opportunity to contribute to AI solution projects at <a href="https://appen.com" className="hover-link" target="_blank" rel="noopener noreferrer">Appen</a>, improving user experiences for Google and Facebook by evaluating data for accuracy, relevance, and compliance.
                            </p>
                            <br />
                            <p>
                                At <a href="https://infernozilla.com" className="hover-link" target="_blank" rel="noopener noreferrer">Infernozilla</a>, I managed social media for indie video games, achieving over 100% organic growth and viral content with millions of views.
                            </p>
                            <button className="btn">Resume</button> {/* Resume button */}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="bento-box bento-3">
                        <div className="box-content">
                            <h2>EDUCATION</h2>
                            <p>
                                I hold a Bachelor's degree in Business Administration, providing me with a strong foundation in strategy, analysis, and marketing. 
                                Currently, I’m pursuing a diploma in <a href="https://www.bcit.ca/programs/new-media-design-and-web-development-diploma-full-time-6515dipma/" class="hover-link" target="_blank" rel="noopener noreferrer"
                                ><span class="underline-span">New Media Design & Web Development</span></a> at BCIT to expand my technical and creative skillset.
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bento-box bento-4">
                        <div className="box-content">
                            <h2>CONTACT</h2>
                            <p>Currently in Vancouver, BC, Canada. Reach out via:</p>
                            <div className="contact-details">
                                <div className="email-wrapper">
                                    <a href="mailto:hello@denisgurcu.com" className="hover-link">hello@denisgurcu.com</a>
                                </div>
                                <div className="about-social-icons">
                                    <a href="https://www.behance.net" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faBehance} className="about-social-icon" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/denisgurcu/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedinIn} className="about-social-icon" />
                                    </a>
                                    <a href="https://github.com/denisgurcu" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faGithub} className="about-social-icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tool Stack Section */}
                    <div className="bento-box bento-5">
                        <div className="box-content">
                            <h2>TOOL STACK</h2>
                            <div className="tool-icons">
                                {Object.values(icons).map((icon, index) => (
                                    <img key={index} src={icon} alt="Tool Icon" className="tool-icon" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="bento-box bento-6">
                        <img src={AboutImage3} alt="Image 3" className="masonry-image" />
                    </div>
                </Masonry>
            </section>
        </>
    );
};

export default About; // Export the About component
