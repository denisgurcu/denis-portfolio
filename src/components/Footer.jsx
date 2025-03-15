  import React, { useEffect, useRef } from "react";
  import "./Footer.css";

  const Footer = () => {
    const canvasRef = useRef(null);
    const canvas2Ref = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, down: false });

    // let width, height;
    // let omx = 0, omy = 0, omx2 = 0, omy2 = 0, omx3 = 0, omy3 = 0, omx4 = 0, omy4 = 0;
    // let c = 0;

    // const settings = {
    //   lineWidth: 25,
    //   lineWidthJitter: 0,
    //   colorJitter: 0,
    // };

    // const color = (a) => `hsl(${a},100%,50%)`;

    // useEffect(() => {
    //   const canvas = canvasRef.current;
    //   const ctx = canvas.getContext("2d");
    //   const canvas2 = canvas2Ref.current;
    //   const ctx2 = canvas2.getContext("2d");

    //   const resizeListener = () => {
    //     width = canvas.width = canvas2.width = canvas.offsetWidth;
    //     height = canvas.height = canvas2.height = canvas.offsetHeight;
    //     ctx.fillStyle = "black";
    //     ctx.fillRect(0, 0, width, height);
    //   };

    //   const mouseMoveListener = (event) => {
    //     mouseRef.current.x = event.clientX;
    //     mouseRef.current.y = event.clientY;
    //   };

    //   const mouseDownListener = () => (mouseRef.current.down = true);
    //   const mouseUpListener = () => (mouseRef.current.down = false);

    //   window.addEventListener("resize", resizeListener);
    //   window.addEventListener("mousemove", mouseMoveListener);
    //   window.addEventListener("mousedown", mouseDownListener);
    //   window.addEventListener("mouseup", mouseUpListener);
    //   resizeListener();

    //   const draw = () => {
    //     ctx.fillStyle = "rgba(0,0,0,0.05)";
    //     ctx.fillRect(0, 0, width, height);
    //     c++;

    //     const { x, y, down } = mouseRef.current;

    //     ctx.strokeStyle = ctx2.strokeStyle = color(c + Math.random() * settings.colorJitter);
    //     ctx.lineWidth = ctx2.lineWidth = settings.lineWidth + (Math.random() * settings.lineWidthJitter);
    //     ctx.lineCap = ctx2.lineCap = "round";

    //     ctx2.clearRect(0, 0, width, height);
    //     ctx2.beginPath();
    //     ctx2.moveTo(x, y);
    //     ctx2.quadraticCurveTo(omx, omy, omx2, omy2, omx3, omy3, omx4, omy4);
    //     ctx2.stroke();

    //     if (down) {
    //       ctx.beginPath();
    //       ctx.moveTo(x, y);
    //       ctx.lineTo(omx, omy);
    //       ctx.stroke();
    //     }

    //     omx4 = omx3;
    //     omy4 = omy3;
    //     omx3 = omx2;
    //     omy3 = omy2;
    //     omx2 = omx;
    //     omy2 = omy;
    //     omx = x;
    //     omy = y;

    //     requestAnimationFrame(draw);
    //   };

    //   draw();

    //   return () => {
    //     window.removeEventListener("resize", resizeListener);
    //     window.removeEventListener("mousemove", mouseMoveListener);
    //     window.removeEventListener("mousedown", mouseDownListener);
    //     window.removeEventListener("mouseup", mouseUpListener);
    //   };
    // }, []);

    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h2 className="footer-title">Open to work and collaborate.</h2>
          </div>

          <div className="footer-right">
            <a href="mailto:hello@denisgurcu.com" className="footer-link clickable">
              hello@denisgurcu.com
            </a>
            <div className="footer-social clickable">
              <a href="https://www.linkedin.com/in/denisgurcu/" target="_blank" rel="noopener noreferrer">
                LINKEDIN
              </a>
              <a href="https://github.com/denisgurcu" target="_blank" rel="noopener noreferrer">
                GITHUB
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Designed & coded by Denis Gurcu</span>
          <span>Built with React</span>
          <span>© 2024 All Rights Reserved</span>
        </div>

        <canvas ref={canvasRef} className="footer-canvas"></canvas>
        <canvas ref={canvas2Ref} className="footer-canvas"></canvas>
      </footer>
    );
  };

  export default Footer;