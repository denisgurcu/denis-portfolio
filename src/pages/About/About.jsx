import React from "react";
import Masonry from "react-masonry-css"; // Import Masonry component
import "./About.css";

// Import images for the cards
import AboutImage1 from "../../assets/images/about_image1.png";
import AboutImage2 from "../../assets/images/about_image2.png";
import AboutImage3 from "../../assets/images/about_image3.png";
import AboutImage4 from "../../assets/images/about_image4.png";

const About = () => {
    return (
        <>
            <section className="about-wrapper">
                <div className="about-manifesto">
                    <p>
                        I believe design is a form of art, and this relentless passion led me to transition  to the creative field. I enjoy communicating through visuals, connecting through stories, and reflecting shared experiences with the mediums we have. The world would be empty without that. Creativity with purpose and functional beauty inspire and motivate me, so that I create works that inspire and motivate others. My goal is to keep pushing boundaries, and continuing to pursue what I love.</p>
                </div>
                <h1 className="about-title">ABOUT</h1>
            </section>

            {/* Masonry Section */}
            <section className="about-masonry-wrapper">
                <Masonry
                    breakpointCols={{
                        default: 2, // 4 columns by default
                        1100: 2, // 3 columns for medium-sized screens (e.g., laptops)
                        700: 2, // 2 columns for small screens (e.g., tablets)
                        500: 1, // 1 column for very small screens (e.g., mobile)
                    }}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {/* Bento Box 1 */}
                    <div className="bento-box bento-1">
                        <img src={AboutImage1} alt="Image 1" className="masonry-image" />

                    </div>

                    {/* Bento Box 2 (Image Box) */}
                    <div className="bento-box bento-2">
                        <div className="box-content">
                            <h2>EXPERIENCE</h2>
                            <p>
                                After transitioning from finance, I’ve had the opportunity to contribute to AI solution projects at <a href="https://appen.com" className="hover-link" target="_blank" rel="noopener noreferrer">Appen</a> and improve user experiences for Google and Facebook by evaluating data for accuracy, relevance, and compliance.
                            </p>
                            <br />
                            <p>
                                At <a href="https://infernozilla.com" className="hover-link" target="_blank" rel="noopener noreferrer">Infernozilla</a>, I managed social media for indie video games, developing and executing strategies across platforms like Twitter, Instagram, and TikTok. These efforts resulted in over 100% organic growth, viral content with millions of views, and refined client strategies through in-depth analytics.
                            </p>
                            <button className="btn">Resume</button>
                        </div>
                    </div>

                    {/* Bento Box 3 */}
                    <div className="bento-box bento-3">
                        <div className="box-content">
                            <h2>EDUCATION</h2>
                            <p>I also have a Bachelor's degree in Business Administration, which helped me gain a strong foundation in understanding how things work — strategizing, analyzing, and marketing. This education deepened my ability to see the bigger picture while keep focusing on those little impactful details.</p>
                            <br />
                            <p>
                                Currently, I am pursuing a diploma in
                                <a
                                    href="https://www.bcit.ca/programs/new-media-design-and-web-development-diploma-full-time-6515dipma/"
                                    class="hover-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="underline-span">New Media Design & Web Development </span>
                                </a>
                                 at British Columbia Institute of Technology to enhance my self-taught creative and technical skills. Delving into front-end development, UX/UI design, and multimedia creation, combining my passion for creativity with innovative technology.
                            </p>
                        </div>
                    </div>

                    {/* Bento Box 4 (Image Box) */}
                    <div className="bento-box bento-4">
                        <img src={AboutImage2} alt="Image 2" className="masonry-image" />
                    </div>

                    {/* Bento Box 5 (Image Box) */}
                    <div className="bento-box bento-5">
                        <img src={AboutImage3} alt="Image 3" className="masonry-image" />
                    </div>

                    {/* Bento Box 6 */}
                    <div className="bento-box bento-6">
                        <div className="box-content">
                            <h2>Title 3</h2>
                            <p>More text with buttons here.</p>
                            <button className="btn">Explore</button>
                        </div>
                    </div>
                </Masonry>
            </section>
        </>
    );
};

export default About;
