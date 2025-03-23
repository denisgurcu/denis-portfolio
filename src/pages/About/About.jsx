import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faMapMarkerAlt, faEnvelope, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective.css";
import { followCursor } from 'tippy.js';



import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "./About.css";

// Image groups
import me1 from '../../assets/images/about_image_me1.png';
import me2 from '../../assets/images/about_image_me2.png';
import me3 from '../../assets/images/about_image_me3.png';

import illus1 from '../../assets/images/about_illus1.png';
import illus2 from '../../assets/images/about_illus2.png';
import illus3 from '../../assets/images/about_illus3.png';
import illus4 from '../../assets/images/about_illus4.png';
import illus5 from '../../assets/images/about_illus5.png';
import illus6 from '../../assets/images/about_illus6.png';
import illus7 from '../../assets/images/about_illus7.png';

import martin1 from '../../assets/images/about_martin1.jpg';
import martin2 from '../../assets/images/about_martin2.gif';
import martin3 from '../../assets/images/about_martin3.jpg';

import photo1 from '../../assets/images/about_image_photo1.png';
import photo2 from '../../assets/images/about_image_photo2.png';
import photo3 from '../../assets/images/about_image_photo3.png';
import photo4 from '../../assets/images/about_image_photo4.png';
import photo5 from '../../assets/images/about_image_photo5.png';
import photo6 from '../../assets/images/about_image_photo6.png';
import photo7 from '../../assets/images/about_image_photo7.png';
import photo8 from '../../assets/images/about_image_photo8.png';
import photo9 from '../../assets/images/about_image_photo9.png';
import photo10 from '../../assets/images/about_image_photo10.png';
import photo11 from '../../assets/images/about_image_photo11.png';
import photo12 from '../../assets/images/about_image_photo12.gif';

import gifImage from '../../assets/images/about_gif.gif';

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

const imageGroupMe = [
    me1, me2, me3,
    photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12];
const imageGroupMartin = [martin1, martin2, martin3];
const imageGroupIllus = [illus1, illus2, illus3, illus4, illus5, illus6, illus7];

const imageGroupMeTooltips = {
    [photo2]: '"This is not a pipe" — one of my favorite art movements.',
    [photo3]: "Visiting the Picasso Museum was a design-defining moment.",
    [photo4]: "This Dali sculpture was nearly eaten by Picasso’s dog at the exhibit.",
    [photo5]: "Shakespeare & Company is one of my favorite places on Earth.",
    [photo8]: "I’m from Turkey.",
    [photo10]: "❤️",
    [photo11]: "100% '90s kid."
};

function ImageSlideshow({ images = { imageGroupMe }, delay = 5000, transitionDuration = 2, tooltips = { imageGroupMeTooltips } }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [shuffledImages, setShuffledImages] = useState([]);
    const tooltipRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        const [first, ...rest] = images;
        const shuffledRest = [...rest].sort(() => Math.random() - 0.5);
        setShuffledImages([first, ...shuffledRest]);
    }, [images]);

    useEffect(() => {
        if (shuffledImages.length === 0) return;

        const timer = setTimeout(() => {
            setPrevIndex(currentIndex);
            setCurrentIndex((currentIndex + 1) % shuffledImages.length);
            setIsTransitioning(true);

            setTimeout(() => {
                setIsTransitioning(false);
            }, transitionDuration * 1000);
        }, delay);

        return () => clearTimeout(timer);
    }, [currentIndex, delay, transitionDuration, shuffledImages]);

    useEffect(() => {
        if (tooltipRef.current && shuffledImages[currentIndex]) {
            if (!instanceRef.current) {
                instanceRef.current = tippy(tooltipRef.current, {
                    content: tooltips[shuffledImages[currentIndex]] || '',
                    theme: 'my-theme',
                    animation: 'fade',
                    arrow: false,
                    trigger: 'manual',
                    duration: [200, 200],
                    hideOnClick: false,
                });
            } else {
                instanceRef.current.setContent(tooltips[shuffledImages[currentIndex]] || '');
            }

            instanceRef.current.show();

            const hideTimer = setTimeout(() => {
                instanceRef.current.hide();
            }, 2000);

            return () => clearTimeout(hideTimer);
        }
    }, [shuffledImages, currentIndex, tooltips]);

    useEffect(() => {
        const elements = document.querySelectorAll('.tooltip-box');

        elements.forEach((el) => {
            // Create manual tippy instance
            const instance = tippy(el, {
                content: el.getAttribute('data-tippy-content'),
                theme: 'my-theme',
                animation: 'perspective',
                arrow: false,
                trigger: 'manual', // so we control when it shows
                duration: [200, 200],
                hideOnClick: false,
                plugins: [followCursor],
                allowHTML: true,
                followCursor: 'false',
            });

            let timeoutId = null;

            // Mousemove to check center zone
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const inCenterX = x > rect.width * 0.3 && x < rect.width * 0.7;
                const inCenterY = y > rect.height * 0.3 && y < rect.height * 0.7;

                if (inCenterX && inCenterY) {
                    if (!instance.state.isShown) {
                        instance.show();
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => instance.hide(), 2000); // Auto-hide after 2s
                    }
                } else {
                    instance.hide();
                    clearTimeout(timeoutId);
                }
            });

            // Hide tooltip when mouse leaves the image
            el.addEventListener('mouseleave', () => {
                instance.hide();
                clearTimeout(timeoutId);
            });
        });
    }, []);

    const currentImage = shuffledImages[currentIndex];
    const tooltipText = tooltips[currentImage];

    const ImageWithOptionalTooltip = (
        <motion.img
            key={currentImage}
            src={currentImage}
            className="slideshow-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: transitionDuration, ease: "easeInOut" }}
            style={{ zIndex: 1 }}
        />
    );

    return (
        <div className="slideshow-container">
            {shuffledImages.length > 0 && (
                <>
                    {tooltipText ? (
                        <div
                            className="tooltip-box"
                            data-tippy-content={tooltipText}
                            data-tippy-followcursor="true"
                        >
                            {ImageWithOptionalTooltip}
                        </div>
                    ) : (
                        ImageWithOptionalTooltip
                    )}

                    {isTransitioning && prevIndex !== null && (
                        <motion.img
                            key={`prev-${shuffledImages[prevIndex]}`}
                            src={shuffledImages[prevIndex]}
                            className="slideshow-image"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: transitionDuration, ease: "easeInOut" }}
                            style={{ zIndex: 0 }}
                        />
                    )}
                </>
            )}
        </div>
    );
}


const ReactGridLayout = WidthProvider(RGL);
const layout = [
    {
        i: "1",  // Images
        x: 0,    // Starts in column 0 (far left)
        y: 0,    // Starts in row 0 (top row)
        w: 2,    // Spans 2 out of 6 columns
        h: 4    // 3 rows tall → 3 × 100px = 300px height
    },
    {
        i: "2",  // Experience section
        x: 2,    // column 
        y: 0,    // row
        w: 2,    // columns wide
        h: 6,   // rows tall → 1 = 100px
    },
    {
        i: "3",  // Education section
        x: 6,    // column 
        y: 0,    // row
        w: 2,    // columns wide
        h: 4.5     // rows tall → 1 = 100px
    },
    {
        i: "5",  // tool stack
        x: 0,    // column 
        y: 2,    // row
        w: 2,    // columns wide
        h: 2     // rows tall → 1 = 100px
    },

    {
        i: "7",  // martin
        x: 4,    // column 
        y: 2,    // row
        w: 2,    // columns wide
        h: 4     // rows tall → 1 = 100px
    },

    {
        i: "8",  // illus
        x: 0,    // column 
        y: 3,    // row
        w: 4,    // columns wide
        h: 5     // rows tall → 1 = 100px
    },

    {
        i: "4",  // contact
        x: 5,    // column 
        y: 4,    // row
        w: 2,    // columns wide
        h: 2.5     // rows tall → 1 = 100px
    },


    {
        i: "10",  // tldr
        x: 0,    // column 
        y: 5,    // row
        w: 2,    // columns wide
        h: 5     // rows tall → 1 = 100px
    },

    {
        i: "9",  // video
        x: 2,    // column 
        y: 5,    // row
        w: 4,    // columns wide
        h: 5     // rows tall → 1 = 100px
    },



];



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

            <section className="about-masonry-wrapper">
                <ReactGridLayout
                    className="layout"
                    layout={layout}
                    cols={6}
                    rowHeight={100}
                    width={1200}
                    isDraggable={true}
                    isResizable={true}
                    draggableCancel=".no-drag"

                >
                    {/* Image 1 */}
                    <div
                        key="1"
                        className="bento-box bento-1 tooltip-box"
                        data-tippy-content="Collecting inspiration through museums and analog lenses."
                    >
                        <ImageSlideshow images={imageGroupMe} delay={5000} />
                    </div>

                    {/* Experience Section */}
                    <div key="2" className="bento-box bento-2 tooltip-box"
                        data-tippy-content="Click and move!">

                        <div className="box-content">
                            <h2>EXPERIENCE</h2>
                            <p>
                                After transitioning from finance, I’ve had the opportunity to contribute to AI solution projects at <a href="https://appen.com" className="hover-link clickable no-drag" target="_blank" rel="noopener noreferrer">Appen</a>, improving user experiences for Google and Facebook by evaluating data for accuracy, relevance, and compliance.
                            </p>
                            <p>
                                At <a href="https://infernozilla.com" className="hover-link clickable no-drag" target="_blank" rel="noopener noreferrer">Infernozilla</a>, I managed social media for indie video games, achieving over 100% organic growth and viral content with millions of views. I also took on creative roles in visual content creation and campaign ideation.
                            </p>
                            <a href="/denisgurcu_resume.pdf" target="_blank" rel="noopener noreferrer">
                                <button className="btn clickable no-drag">Resume</button>
                            </a>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div key="3" className="bento-box bento-3">
                        <div className="box-content">
                            <h2>EDUCATION</h2>
                            <p>
                                I hold a Bachelor's in Business., providing me with a strong foundation in strategy, analysis, and marketing. <br></br> <br></br> Currently, I’m pursuing a diploma in <a href="https://www.bcit.ca/programs/new-media-design-and-web-development-diploma-full-time-6515dipma/" className="hover-link clickable no-drag" target="_blank" rel="noopener noreferrer">New Media Design & Web Development</a> at British Columbia Institute of Technology  to expand my technical and creative skillset.
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div key="4" className="bento-box bento-4">
                        <div className="box-content">
                            <h2>CONTACT</h2>

                            <div className="contact-item">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                                <span>Vancouver, Canada</span>
                            </div>

                            <div className="contact-item">
                                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                                <a href="mailto:hello@denisgurcu.com" className="hover-link clickable no-drag">
                                    hello@denisgurcu.com
                                </a>
                            </div>

                            <div className="contact-item">
                                <FontAwesomeIcon icon={faShareAlt} className="contact-icon" />
                                <div className="social-links clickable no-drag">
                                    <a href="https://www.linkedin.com/in/denisgurcu/" className="social-link" target="_blank" rel="noopener noreferrer">
                                        LINKEDIN <span className="arrow">↗︎</span>
                                    </a>
                                    <a href="https://github.com/denisgurcu" className="social-link" target="_blank" rel="noopener noreferrer">
                                        GITHUB <span className="arrow">↗︎</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>



                    {/* Tool Stack */}
                    <div key="5" className="bento-box bento-5">
                        <div className="box-content">
                            <h2>TOOL STACK</h2>
                            <div className="tool-icons">
                                {Object.values(icons).map((icon, index) => (
                                    <img key={index} src={icon} alt="Tool Icon" className="tool-icon" />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Martin */}
                    <div key="7" className="bento-box bento-image tooltip-box" data-tippy-content="My cat's name is Martin Eden.">
                        <ImageSlideshow images={imageGroupMartin} delay={6000} />
                    </div>

                    {/* Illustrations */}
                    <div key="8" className="bento-box bento-image tooltip-box" data-tippy-content="Early sketches, drawn while learning by referencing images.">
                        <ImageSlideshow images={imageGroupIllus} delay={7000} />
                    </div>

                    {/* Video  */}
                    <div key="9" className="bento-box bento-video tooltip-box" data-tippy-content="My first experimentations with frame-by-frame animation">
                        <img
                            src={gifImage}
                            alt="Looping GIF"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>


                    {/* Text Box Placeholder */}
                    <div key="10" className="bento-box bento-text tooltip-box"
                        data-tippy-content="Click and move!">
                        <div className="box-content">
                            <h2>TL;DR</h2>
                            <ul className="tldr-list">
                                <li>I have a business and marketing background with a creative edge.</li>
                                <li>I can design, wireframe, code, and animate — bringing a holistic perspective.</li>
                                <li>I bring experience in social media, storytelling, and digital strategy.</li>
                                <li>I am a team player, fast learner, and an unapologetic dreamer.</li>
                            </ul>
                        </div>
                    </div>
                </ReactGridLayout>
            </section>
        </>
    );
};

export default About; // Export the About component
