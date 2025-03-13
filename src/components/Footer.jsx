import React, { useEffect, useRef } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const footer = footerRef.current;
    
    let width = footer.offsetWidth;
    let height = footer.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    
    // 🎨 Updated Colors (Using CSS Variables)
    const colors = [
      getComputedStyle(document.documentElement).getPropertyValue("--yellow").trim(),
      getComputedStyle(document.documentElement).getPropertyValue("--blue").trim(),
      getComputedStyle(document.documentElement).getPropertyValue("--darkblue").trim(),
      getComputedStyle(document.documentElement).getPropertyValue("--red").trim(),
      getComputedStyle(document.documentElement).getPropertyValue("--darkred").trim(),
      getComputedStyle(document.documentElement).getPropertyValue("--pink").trim(),
    ];

    let particles = [];

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 10 + 5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = 1;
      this.velocityX = (Math.random() - 0.5) * 2;
      this.velocityY = (Math.random() - 0.5) * 2;
    }

    Particle.prototype.update = function () {
      this.size *= 0.95;
      this.life -= 0.02;
    };

    Particle.prototype.draw = function () {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0.01) particles.splice(index, 1);
      });
      requestAnimationFrame(animate);
    }

    function handleMouseMove(event) {
      if (!footer.contains(event.target)) return;
      
      const rect = footer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y));
      }
    }

    footer.addEventListener("mousemove", handleMouseMove);
    animate();

    window.addEventListener("resize", () => {
      width = footer.offsetWidth;
      height = footer.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    });

    return () => footer.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Canvas for Color Trail */}
      <canvas ref={canvasRef} className="footer-canvas"></canvas>

      {/* Footer Content Wrapper */}
      <div className="footer-content-wrapper">
        <h2 className="footer-title">Open to work and collaborate.</h2>
        <p className="footer-subtitle">Feel free to reach out!</p>

        {/* Email Link */}
        <a href="mailto:hello@denisgurcu.com" className="footer-link clickable">
          hello@denisgurcu.com
        </a>

        {/* Social Buttons */}
        <div className="social-icons clickable">
          <a
            href="https://www.linkedin.com/in/denisgurcu/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href="https://github.com/denisgurcu"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>

      {/* "CONTACT" at the bottom like hero text */}
      <h1 className="footer-contact">CONTACT</h1>

      {/* Footer Bottom Info */}
      <div className="footer-bottom">
        <p>Designed and coded by Denis Gurcu</p>
        <p>&copy; 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
