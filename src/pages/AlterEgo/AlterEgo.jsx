import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AlterEgo.css";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';


import staticAnimation from "../../assets/images/alterego_header.jpg";
import CoffeeDripper from "../../assets/images/alterego_dripper.png";
import AlterEgoFace from "../../assets/images/alterego_faces.png";
import AlterEgoLogo from "../../assets/images/alterego_logo.png";
import AlterEgoAnimated from "../../assets/images/alterego_animated2.gif";
import AlterEgoCup from "../../assets/images/alterego_cup.jpg";
import AlterEgoCups from "../../assets/images/alterego_cups.png";
import GestaltImage from "../../assets/images/gestalt_example.png"; // Tooltip image
import AlterEgoType from "../../assets/images/alterego_typography.png"; // Tooltip image
import AlterEgoBanner from "../../assets/images/alterego_banner.jpg";
import AlterToteBag from "../../assets/images/alterego_totebag.jpg";
import AlterEgoBC from "../../assets/images/alterego_bc.jpg";
import AlterPack from "../../assets/images/alterego_packaging.jpg";





gsap.registerPlugin(ScrollTrigger);

const AlterEgo = () => {
    useEffect(() => {
        // Hero text animation: Slide in and start marquee
        const timeline = gsap.timeline();
        timeline
            .fromTo(
                ".alter-ego-text",
                { y: "-50", opacity: 0 },
                {
                    y: "0",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                }
            )
            .to(".alter-ego-text", {
                delay: 0.2,
                onComplete: () => {
                    document
                        .querySelector(".alter-ego-marquee-wrapper")
                        .classList.add("start-marquee");
                },
            });
    }, []);

    useEffect(() => {
        // Logo concept section animation
        const conceptItems = gsap.utils.toArray(".logo-concept-wrapper > *");
        gsap.set(conceptItems, { opacity: 0, y: 50 });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".logo-concept-section",
                start: "top 80%", // Adjust as needed
            }
        })
            .to(conceptItems, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power1.out",
                stagger: 0.3
            });
    }, []);



    useEffect(() => {
        // Coffee + You section animation
        const coffeeYouItems = gsap.utils.toArray(".coffee-you-section > *");
        gsap.set(coffeeYouItems, { opacity: 0, y: 50 });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".coffee-you-section",
                start: "top 70%", // Adjust as needed
            }
        })
            .to(coffeeYouItems, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power1.out",
                stagger: 0.3
            });
    }, []);

    useEffect(() => {
        // Tooltip Initialization
        tippy('.tooltip', {
            content(reference) {
                const imgSrc = reference.getAttribute('data-tooltip-image');
                const text = reference.getAttribute('data-tooltip-text');
                return `
                    <div class="tooltip-content">
                        <img src="${imgSrc}" alt="Gestalt Principle" class="tooltip-image" />
                        <p class="tooltip-text">${text}</p>
                    </div>
                `;
            },
            allowHTML: true,
            theme: 'gestalt-theme',
            animation: 'scale',
            arrow: true,
            placement: 'top',
            maxWidth: 200,
        });
    }, []);

    useEffect(() => {
        const texts = gsap.utils.toArray(".animated-text");

        // Pre-setup for the third text: split into letters and hide them.
        const text3 = texts[2];
        const letters = text3.textContent
            .split("")
            .map((letter) => `<span class="letter">${letter}</span>`);
        text3.innerHTML = letters.join("");
        const spans = text3.querySelectorAll(".letter");
        gsap.set(spans, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: texts[0],
                start: "top 100%",
                end: "bottom 20%",
                scrub: false,
            },
        });

        // Text 1: Pop appear
        tl.fromTo(
            texts[0],
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1)" }
        );

        // Text 2: Flip and sway
        tl.fromTo(
            texts[1],
            { rotateX: -90, opacity: 0, transformOrigin: "top center" },
            { rotateX: 0, opacity: 1, duration: 0.8, ease: "bounce.out" }
        ).to(
            texts[1],
            {
                rotateX: 10,
                duration: 0.4,
                ease: "power1.out",
                yoyo: true,
                repeat: 1,
            },
            "+=0.3"  //Start 0.3 seconds before the previous animation ends
        );

        // Text 3: Letters one-by-one
        tl.fromTo(
            spans,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.08,
                stagger: 0.1,
                ease: "power2.out"
            }
        );
        "+=5" // Start 0.3 seconds before the previous animation ends


        // Text 4: Pop appear 
        tl.fromTo(
            texts[3],
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1)" }
        );

        // Text 5: Flip and sway 
        if (texts[4]) {
            tl.fromTo(
                texts[4],
                { rotateX: -90, opacity: 0, transformOrigin: "bottom center" },
                { rotateX: 0, opacity: 1, duration: 1, ease: "bounce.out" }
            ).to(
                texts[4],
                {
                    rotateX: 10,
                    duration: 0.4,
                    ease: "power1.out",
                    yoyo: true,
                    repeat: 1,
                },

            );
        };
        "+=0.3" // Start 0.3 seconds before the previous animation ends

    }, []);


    return (
        <>
            {/* Hero Section */}
            <section className="alter-ego-intro-wrapper">
                <div className="alter-ego-animation-container">
                    <img src={staticAnimation} alt="Static Animation" className="static-animation" />
                </div>
                <div className="alter-ego-marquee-wrapper">
                    <h1 className="alter-ego-text">ALTER EGO</h1>
                    <h1 className="alter-ego-text">ALTER EGO</h1>
                    <h1 className="alter-ego-text">ALTER EGO</h1>
                </div>
            </section>

            <section className="alter-ego-content">
                <div className="content-wrapper">
                    <div className="content-details">
                        <div className="content-field">
                            <h3>FIELD</h3>
                            <p>BRANDING</p>
                        </div>
                        <div className="content-role">
                            <h3>ROLE</h3>
                            <p>DESIGNER</p>
                        </div>
                        <div className="content-timeframe">
                            <h3>TIMEFRAME</h3>
                            <p>Mar 21, 2024 - Apr 11, 2024 &nbsp; • &nbsp; 27 HOURS</p>
                        </div>
                    </div>
                    <div className="content-description">
                        <p>
                            Alter Ego is a fictional coffee shop set to open in Vancouver. The goal of this project was to craft a distinctive visual identity that embodies an effortless and sophisticated ambiance. This project went beyond logo design and color choices; it was about developing a visual language that reflects the brand's desire for modernity and creativity, offering a refined experience that embodies self-expression.
                        </p>
                    </div>
                </div>
            </section>

            <section className="logo-concept-section">
                <div className="logo-concept-wrapper">
                    <div className="concept-item">
                        <img src={CoffeeDripper} alt="Coffee Dripper" className="concept-image" />
                        <p>COFFEE DRIPPER</p>
                    </div>

                    <div className="concept-symbol">
                        <p>+</p>
                    </div>

                    <div className="concept-item">
                        <img src={AlterEgoFace} alt="Alter Ego Face" className="concept-image" />
                        <p>ALTER EGO</p>
                    </div>

                    <div className="concept-symbol">
                        <p>=</p>
                    </div>

                    <div className="concept-item">
                        <img src={AlterEgoLogo} alt="Alter Ego Logo" className="concept-image" />
                        <p>LOGO</p>
                    </div>
                </div>
            </section>

            {/* GIF Section (optional, as shown previously) */}
            <section className="alter-ego-gifs-section">
                <div className="gifs-wrapper">
                    <img src={AlterEgoAnimated} alt="Alter Ego Animated Gif" />
                    {/* <img src={AlterEgoCoffe} alt="Alter Ego Coffee Gif" /> */}
                    <img src={AlterEgoAnimated} alt="Alter Ego Animated Gif" />
                    {/* <img src={AlterEgoCoffe} alt="Alter Ego Coffee Gif" /> */}
                </div>
            </section>

            {/* New Coffee + You = ? Section */}
            <section className="coffee-you-section">
                <div className="concept-item">
                    <p>COFFEE</p>
                </div>

                <div className="concept-symbol">
                    <p>+</p>
                </div>

                <div className="concept-item">
                    <p>YOU</p>
                </div>

                <div className="concept-symbol">
                    <p>=</p>
                </div>

                <div className="concept-item question-item">
                    <p className="blinking-question">?</p>
                </div>
            </section>

            <section className="split-grid-container">
                <div className="split-grid-section">
                    <div className="split-grid-left">
                        <img src={AlterEgoCups} alt="Alter Ego Cups" className="split-grid-image" />
                    </div>
                    <div className="split-grid-right">
                        <div className="split-grid-right-top">
                            <img src={AlterEgoCup} alt="Alter Ego Cup" className="split-grid-image" />
                        </div>
                        <div className="split-grid-right-bottom">
                            <p>
                                The logo is inspired by the <span
                                    className="tooltip underline-on-hover"
                                    data-tooltip-image={GestaltImage}
                                    data-tooltip-text="Do you see a vase, or do you see 2 people facing each other?"
                                >
                                    Gestalt principle of Multistability
                                </span>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-animation-section">
                <div className="text-wrapper">
                    <div className="text-group group-1">
                        <h1 className="animated-text">DUALITY</h1>
                        <h1 className="animated-text">YTILAUD</h1> {/* Reversed text */}
                    </div>

                    {/* Group 2: Text 3 */}
                    <div className="text-group group-2">
                        <h1 className="animated-text spaced-text">
                            {"DISCOVERY".split("").map((char, i) => (
                                <span key={i} className="letter-span">{char}</span>
                            ))}
                        </h1>
                    </div>


                    <div className="text-group group-3">
                        <h1 className="animated-text">REFLECTION</h1>
                        <h1 className="animated-text flipped-text">REFLECTION</h1>
                    </div>
                </div>
            </section>

            <section className="two-column-section">
                <div className="column right">
                    <h2 className="section-title">TYPOGRAPHY</h2>
                    <img src={AlterEgoType} alt="Right Side Image" className="section-image" />
                </div>
                <div className="column left">
                    <h2 className="section-title">COLORS</h2>
                    <div className="boxes-wrapper">
                        <div className="color-box" style={{ backgroundColor: "#CF804F" }}>INVITING</div>
                        <div className="color-box" style={{ backgroundColor: "#CFA651" }}>RICH</div>
                        <div className="color-box" style={{ backgroundColor: "#8D8C88" }}>INTRIGUING</div>
                        <div className="color-box" style={{ backgroundColor: "#313131" }}>DARK</div>
                        <div className="color-box" style={{ backgroundColor: "#E1D5C5" }}>BALANCING</div>
                    </div>
                </div>
            </section>

            <section className="mockup-grid-section">
                <div className="mockup-grid-wrapper">
                    <img src={AlterEgoBanner} alt="Alter Ego Mix" className="mockup-image" />
                    <img src={AlterToteBag} alt="Alter Ego Tote Bag" className="mockup-image" />
                    <img src={AlterEgoBC} alt="Alter Ego Business Card" className="mockup-image" />
                    <img src={AlterPack} alt="Alter Ego Packaging" className="mockup-image" />
                </div>
            </section>
        </>
    );
};

export default AlterEgo;
