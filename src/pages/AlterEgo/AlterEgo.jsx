import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./AlterEgo.css"; // Import the CSS file

import staticAnimation from "../../assets/images/alterego_header.jpg";
import CoffeeDripper from "../../assets/images/alterego_dripper.png";
import AlterEgoFace from "../../assets/images/alterego_faces.png";
import AlterEgoLogo from "../../assets/images/alterego_logo.png";

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
                    duration: 2,
                    ease: "power2.out",
                }
            )
            .to(".alter-ego-text", {
                delay: 0.5,
                onComplete: () => {
                    document
                        .querySelector(".alter-ego-marquee-wrapper")
                        .classList.add("start-marquee");
                },
            });
    }, []);

    useEffect(() => {
        // Logo concept section animation
        // Once the section comes into view (you may later integrate ScrollTrigger if needed),
        // we animate the items one by one.
        const conceptItems = gsap.utils.toArray(".logo-concept-wrapper > *");
        gsap.set(conceptItems, { opacity: 0 });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".logo-concept-section",
            }
        })
        .to(conceptItems, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power1.out",
            stagger: 0.4
        });
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
        </>
    );
};

export default AlterEgo;
