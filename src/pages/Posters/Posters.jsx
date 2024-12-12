import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Posters.css"; // New CSS file for Posters
import City1 from "../../assets/images/city-1.png"; // First city PNG
import City2 from "../../assets/images/city-2.png"; // Second city PNG
import Sun from "../../assets/images/sun-1.png"; // Sun PNG
import Redesign from "../../assets/images/redesign.jpg";
import HotCroc1 from "../../assets/images/hotcroc1.png";
import HotCroc2 from "../../assets/images/hotcroc2.png";
import Day from "../../assets/images/day.png";
import Night from "../../assets/images/night.png";

gsap.registerPlugin(ScrollTrigger);

const Posters = () => {

    useEffect(() => {
        // Animation timeline
        const timeline = gsap.timeline();

        // Animate city1 to rise first
        timeline.fromTo(
            "#city1",
            { y: "10%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
            }
        );

        // Animate city2 to rise after city1
        timeline.fromTo(
            "#city2",
            { y: "10%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
            },
            "-=1" // Overlap slightly with city1 animation
        );

        // Animate the sun to appear last
        timeline.fromTo(
            "#sun",
            { y: "100%", scale: 0, opacity: 0 }, // Sun starts far below and small
            {
                y: "5%", // Sun stops slightly above the horizon
                scale: 0.7,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
            },
            "-=1"
        );
    }, []);

    useEffect(() => {
        // Hero text animation: Slide in and start marquee
        const timeline = gsap.timeline();
        timeline
            .fromTo(
                ".posters-marquee-text",
                { y: "-100", opacity: 0 },
                {
                    y: "0",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                }
            )
            .to(".posters-marquee-text", {
                delay: 0.2,
                onComplete: () => {
                    document
                        .querySelector(".posters-marquee-wrapper")
                        .classList.add("start-marquee");
                },
            });
    }, []);


    return (
        <>
            <section className="posters-page">
                <section className="posters-hero">
                    <div className="posters-animation-wrapper">
                        <img id="city1" src={City1} alt="City 1" className="poster-element" />
                        <img id="city2" src={City2} alt="City 2" className="poster-element" />
                        <img id="sun" src={Sun} alt="Sun" className="poster-element" />
                    </div>
                </section>

                {/* Marquee Section */}
                <div className="posters-marquee-wrapper">
                    <h1 className="posters-marquee-text">POSTER DESIGNS</h1>
                    <h1 className="posters-marquee-text">POSTER DESIGNS</h1>
                    <h1 className="posters-marquee-text">POSTER DESIGNS</h1>
                </div>
            </section>

            <section className="poster-designs-content">
                <div className="content-wrapper">
                    <div className="content-details">
                        <div className="content-field">
                            <h3>FIELD</h3>
                            <p>GRAPHIC DESIGN</p>
                        </div>
                        <div className="content-role">
                            <h3>ROLE</h3>
                            <p>DESIGNER</p>
                        </div>
                        <div className="content-timeframe">
                            <h3>TIMEFRAME</h3>
                            <p>Mar 6, 2024 - Aug 13, 2024 &nbsp; • &nbsp; 28 HOURS</p>
                        </div>
                    </div>
                    <div className="content-description">
                        <p>
                        This growing poster archive is a creative exploration of diverse social media campaigns, redesigns, and digital illustrations. Each piece is crafted to tell its own story, using a unique blend of visuals, typography, and color. The project aims to build a cohesive yet versatile collection that captures the essence of each campaign while showcasing a bold approach to graphic design. It’s a celebration of creativity, blending design with strategic branding.                        </p>
                    </div>
                </div>
            </section>

        </>

    );
};

export default Posters;
