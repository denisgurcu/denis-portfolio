import React, { useState, useEffect } from "react";
import GraphAnimation from "../Projects/GraphAnimation";
import WaveAnimation from "../Projects/WaveAnimation";
import MotionAnimation from "../Projects/MotionAnimation";
import LogoCard from "../../components/LogoCard";
import "./Logo.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import Crush from "../../assets/images/crush.png";
import FOS from "../../assets/images/fos.png";
import STO from "../../assets/images/sto.png";
import RageQuit from "../../assets/images/ragequit.png";
import MOV from "../../assets/images/movlogo.png";



gsap.registerPlugin(ScrollTrigger);

const Logo = () => {
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
        setAnimationState({ showGraph: true, showWave: false, showMotion: false });
    }, []);

    useEffect(() => {
        const timeline = gsap.timeline();
        timeline
            .fromTo(
                ".logo-showcase-marquee-text",
                { y: "-100", opacity: 0 },
                {
                    y: "0",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                }
            )
            .to(".logo-showcase-marquee-text", {
                delay: 0.2,
                onComplete: () => {
                    document
                        .querySelector(".logo-showcase-marquee-wrapper")
                        .classList.add("start-marquee");
                },
            });
    }, []);

    const logoCardsData = [
        {
            frontImage: FOS,
            frontColor: "#232b2b",
            title: "Fight or Spice",
            title2: "Spicy Food Truck Festival",
            description: "This food truck festival needed a bold identity to promote the event across the city and online. The creation of 'Hot Croc' was intentional, giving the festival a mascot with personality and energy to connect with its audience. Mascots are known to boost brand relatability, making this an impactful choice.",
        },
        {
            frontImage: Crush,
            frontColor: "#062275",
            title: "Crush Cookies & Coffee",
            title2: "Subscription Box Service",
            description: "It’s a love story, in a box. A classic case of opposites attract—coffee’s a little grumpy, but the cookie doesn’t mind. They just get each other. Each box delivers aromatic coffee and delicious cookies, perfectly paired to bring a little magic to your day.",
        },
        {
            frontImage: STO,
            frontColor: "#6d957f",
            title: "Save the Orangutans",
            title2: "Non-Profit Conservation",
            description: "This non-profit aimed to inspire hope and action for orangutan conservation. The logo was designed to feel approachable, using soft tones of green and orange to connect the brand with nature while motivating audiences to protect these incredible creatures.",
        },
        {
            frontImage: RageQuit,
            frontColor: "#5e72eb",
            title: "Rage Quit",
            title2: "Marketing Agency",
            description: "Rage Quit lives and breathes gaming—nostalgia from the '90s fused with today’s energy. The logo draws inspiration from the iconic sad face of old Windows errors, with a modern gradient to bridge past and present.",
        },
        {
            frontImage: MOV,
            frontColor: "#eee6d7",
            title: "Mind Over Matter",
            title2: "Mental Health Platform",
            description: "A bold logo symbolizing luxury and excellence.",
        },
        {
            frontImage: STO,
            frontColor: "#00BFFF",
            title: "Sky Blue",
            description: "A refreshing logo representing clarity and innovation.",
        },
    ];

    return (
        <>
            {/* Animation Section */}
            <section className="logo-showcase-intro-wrapper">
                <div className="logo-showcase-animation-container">
                    {animationState.showGraph && (
                        <GraphAnimation onComplete={handleGraphAnimationComplete} />
                    )}
                    {animationState.showWave && (
                        <WaveAnimation onComplete={handleWaveAnimationComplete} />
                    )}
                    {animationState.showMotion && <MotionAnimation />}
                </div>
            </section>

            <div className="logo-showcase-marquee-wrapper">
                <h1 className="logo-showcase-marquee-text">LOGOFOLIO</h1>
                <h1 className="logo-showcase-marquee-text">LOGOFOLIO</h1>
                <h1 className="logo-showcase-marquee-text">LOGOFOLIO</h1>
            </div>

            {/* Content Section */}
            <section className="logo-showcase-content">
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
                            <p>Feb 21, 2024 - Aug 14, 2024 &nbsp; • &nbsp; 137 HOURS</p>
                        </div>
                    </div>
                    <div className="content-description">
                        This logo showcase celebrates the diversity of brands by translating
                        their core values into striking visuals. Each design balances
                        creativity with precision, offering a unique approach that connects
                        deeply with its audience. When I design a logo, I strive to make it
                        speak without words—less boring, more memorable, and always impactful.
                    </div>
                </div>
            </section>

            {/* Logo Grid Section */}
            <section className="logo-grid-section">
                <div className="logo-grid">
                    {logoCardsData.map((card, index) => (
                        <LogoCard
                            key={index}
                            frontImage={card.frontImage}
                            frontColor={card.frontColor}
                            title={card.title}
                            title2={card.title2} // Pass title2 explicitly
                            description={card.description}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Logo;
