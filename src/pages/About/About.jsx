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
                        I believe design is a form of art, and this relentless passion led me to transition  to the creative field. I enjoy communicating through visuals, connecting through stories, and reflecting shared experiences with the mediums we have. The world would be empty without that. Creativity with purpose and functional beauty inspire and motivate me, so that I create works that inspire and motivate others. My goal is to keep pushing boundaries, and continuing to pursue what I love.          </p>
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
                            <p>I’ve had the opportunity to work on AI solutions projects and manage social media for indie video games. In these roles, I enhanced user experience for Google and Facebook by evaluating data for accuracy, relevance, and compliance. I also developed and executed social media strategies across platforms like Twitter, Instagram, and TikTok, achieving over 100% organic growth, viral content with millions of views, and helping clients refine their strategies through detailed analyticss</p>
                            <button className="btn">Resume</button>
                        </div>
                    </div>

                    {/* Bento Box 3 */}
                    <div className="bento-box bento-3">
                        <div className="box-content">
                            <h2>EDUCATION</h2>
                            <p>Content for box 2. Smaller text box.</p>
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
