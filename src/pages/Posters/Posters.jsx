import React, { useEffect, useRef, useState } from "react"; // Added useState
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Posters.css"; // New CSS file for Posters
import City1 from "../../assets/images/city-1.png"; // First city PNG
import City2 from "../../assets/images/city-2.png"; // Second city PNG
import Sun from "../../assets/images/sun-1.png"; // Sun PNG
import Redesign from "../../assets/images/redesign.jpg";
import RedesignBefore from "../../assets/images/cd-before.jpg";
import Day from "../../assets/images/day.jpg";
import Night from "../../assets/images/night.jpg";
import HotCroc1 from "../../assets/images/hotcroc1.png";
import HotCroc2 from "../../assets/images/hotcroc2.png";
import HotCrocM1 from "../../assets/images/hotcroc_mockup.jpg";
import HotCrocM2 from "../../assets/images/hotcroc_mokcup2.jpg";




gsap.registerPlugin(ScrollTrigger);

const Posters = () => {

    useEffect(() => {
        // 3D card hover effect
        const map = (val, minA, maxA, minB, maxB) =>
            minB + ((val - minA) * (maxB - minB)) / (maxA - minA);

        const Card3D = (card, ev) => {
            const img = card.querySelector("img");
            const imgRect = card.getBoundingClientRect();
            const width = imgRect.width;
            const height = imgRect.height;
            const mouseX = ev.offsetX;
            const mouseY = ev.offsetY;
            const rotateY = map(mouseX, 0, width, -25, 25);
            const rotateX = map(mouseY, 0, height, 25, -25);
            const brightness = map(mouseY, 0, height, 1.5, 0.5);

            img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            img.style.filter = `brightness(${brightness})`;
        };

        const cards = document.querySelectorAll(".card3d");

        cards.forEach((card) => {
            card.addEventListener("mousemove", (ev) => {
                Card3D(card, ev);
            });

            card.addEventListener("mouseleave", () => {
                const img = card.querySelector("img");
                img.style.transform = "rotateX(0deg) rotateY(0deg)";
                img.style.filter = "brightness(1)";
            });
        });
    }, []);

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
                            This growing poster archive is a creative exploration of diverse social
                            media campaigns, redesigns, and digital illustrations. Each piece is
                            crafted to tell its own story, using a unique blend of visuals,
                            typography, and color. The project aims to build a cohesive yet versatile
                            collection that captures the essence of each campaign while showcasing a
                            bold approach to graphic design. It’s a celebration of creativity,
                            blending design with strategic branding.
                        </p>
                    </div>
                </div>
            </section>
            <section className="posters-page-container">
                <div className="compact-container">
                    <div className="poster-grid-container">
                        <div className="poster-grid-item card3d">
                            <img src={HotCroc1} alt="Hot Croc 1" />
                        </div>
                        <div className="poster-grid-item card3d">
                            <img src={HotCroc2} alt="Hot Croc 2" />
                        </div>
                        <div className="poster-grid-item card3d">
                            <img src={HotCrocM1} alt="Hot Croc M1" />
                        </div>
                        <div className="poster-grid-item card3d">
                            <img src={HotCrocM2} alt="Hot Croc M2" />
                        </div>
                    </div>
                    <p className="poster-description">
                        Oh no. Imagine a huge, chili-loving crocodile stomping through the city, ravenous for heat, devouring the streets with its fiery hunger and casual attitude.</p>
                    <h2 className="poster-title">Meet the Hot Croc!</h2>
                    <p className="poster-description"> Welcome to the hottest festival in the city. A Spicy Food Truck Festival! For this project, I created a mascot, a larger-than-life crocodile with a personality as spicy as the festival itself. From verbal and visual identity to colors, typography, and messaging, every element channels 70s-inspired swagger with a modern twist. Think bold, groovy typefaces, retro hues, and a visual aesthetic that demands attention.</p>
                    <p className="poster-description">The goal of the project was to create promotional posters both for to be printed and to use on social media.</p>
                </div>
            </section>
            <section className="additional-posters-section">

                <div className="additional-posters-container">
                    
                    {/* First container with two images and a description */}
                    <div className="poster-grid-item-first">
                    <h2 className="section-title">Day and Night Illustrations</h2>
                        <div className="image-container">
                            <img src={Day} alt="Day Scene" />
                            <img src={Night} alt="Night Scene" />
                        </div>
                        <p className="poster-description2">
                            Inspired by Nina Simone’s “Feeling Good,” this project celebrates the duality of life—the optimism of a new day and the mystery of the night. The concept was simple yet bold: an illustration split into two halves, revealed with an animation to create a moment of delight.

                            I hand-drew the designs in Adobe Illustrator and to to complete the experience, I animated the reveal.</p>
                    </div>

    
                    {/* Second container with two images and a description */}
                    <div className="poster-grid-item-second">
                        <h2 className="section-title">Comedy Department Redesign</h2>
                        <div className="image-container">
                            <div className="image-wrapper">
                                <img src={RedesignBefore} alt="Redesign Before" />
                                <p className="image-label">Before</p>
                            </div>
                            <div className="image-wrapper">
                                <img src={Redesign} alt="Redesign" />
                                <p className="image-label">After</p>
                            </div>
                        </div>
                        <p className="poster-description3">
                            For this project, I took on the challenge of redesigning a printed ad for the Comedy Department, nestled on Davie St., Vancouver. Their original ad had charm—a city silhouette and a nod to the show’s broadcast channels—but it lacked the spontaneity and spark of improv comedy. So, I kept the silhouette (because it’s just too good to let go) and turned up the volume with design elements that embody the lively, unpredictable spirit of comedy.
                            Drawing inspiration from iconic comedy show posters, I infused the redesign with halftone textures, paper effects, and a mix of clashing typefaces—every word getting its own unique voice. A free-flowing, dynamic design that feels as improvised as the show itself. Key details like the channels, QR code, and website stayed intact but got a fresh spin to make them pop. The final piece balances chaos and harmony, much like a great punchline.
                        </p>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Posters;
