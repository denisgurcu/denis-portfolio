import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective.css";

const Footer = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const brushColorRef = useRef("#E6E6E6");

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#E6E6E6");
  const [showButtons, setShowButtons] = useState(false);

  let width, height, prevX, prevY;

  const brandColors = ["#E6E6E6", "#FFD24D", "#6FA2D5", "#DA4D3B", "#E3C3D8"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeListener = () => {
      const prevImage = canvas.toDataURL();
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      ctx.fillStyle = "#262525";
      ctx.fillRect(0, 0, width, height);

      const img = new Image();
      img.src = prevImage;
      img.onload = () => ctx.drawImage(img, 0, 0);

      if (!isDrawing) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.font = "16px Afacad, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Click and draw", width / 2, height / 2);
      }
    };

    const drawLine = (x, y) => {
      ctx.strokeStyle = brushColorRef.current;
      ctx.lineWidth = 30;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
      prevX = x;
      prevY = y;
    };

    const mouseMoveListener = (e) => {
      if (!mouseRef.current.down) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawLine(x, y);
    };

    const mouseDownListener = (e) => {
      if (e.button !== 0 || e.target !== canvas) return;
      mouseRef.current.down = true;
      setIsDrawing(true);
      setShowButtons(true);

      const rect = canvas.getBoundingClientRect();
      prevX = e.clientX - rect.left;
      prevY = e.clientY - rect.top;

      if (!isDrawing) requestAnimationFrame(resizeListener);
    };

    const mouseUpListener = () => (mouseRef.current.down = false);

    // ✨ TOUCH SUPPORT
    const touchStartListener = (e) => {
      if (e.target !== canvas) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      prevX = touch.clientX - rect.left;
      prevY = touch.clientY - rect.top;
      mouseRef.current.down = true;
      setIsDrawing(true);
      setShowButtons(true);
    };

    const touchMoveListener = (e) => {
      if (!mouseRef.current.down) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      drawLine(x, y);
    };

    const touchEndListener = () => (mouseRef.current.down = false);

    window.addEventListener("resize", resizeListener);
    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mousedown", mouseDownListener);
    window.addEventListener("mouseup", mouseUpListener);

    canvas.addEventListener("touchstart", touchStartListener);
    canvas.addEventListener("touchmove", touchMoveListener);
    canvas.addEventListener("touchend", touchEndListener);

    resizeListener();

    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mousedown", mouseDownListener);
      window.removeEventListener("mouseup", mouseUpListener);

      canvas.removeEventListener("touchstart", touchStartListener);
      canvas.removeEventListener("touchmove", touchMoveListener);
      canvas.removeEventListener("touchend", touchEndListener);
    };
  }, [isDrawing]);

  useEffect(() => {
    brushColorRef.current = brushColor;
  }, [brushColor]);

  const [sendStatus, setSendStatus] = useState("SEND");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (sendStatus === "Drawing Sent!") return;
    setIsSending(true);
    setSendStatus("");

    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");
    const blob = await fetch(imageData).then((res) => res.blob());
    const formData = new FormData();
    formData.append("drawing", blob, "drawing.png");
    formData.append("_subject", "New Drawing Submission");
    formData.append("_captcha", "false");
    formData.append("_cc", "your-email@gmail.com");
    formData.append("_template", "table");

    try {
      const response = await fetch("https://formsubmit.co/hello@denisgurcu.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSendStatus("Drawing Sent!");
      } else {
        setSendStatus("Try Again!");
        setTimeout(() => setSendStatus("SEND"), 3000);
      }
    } catch (err) {
      console.error("Error:", err);
      setSendStatus("Try Again!");
      setTimeout(() => setSendStatus("SEND"), 3000);
    } finally {
      setIsSending(false);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "my-drawing.png";
    link.click();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#262525";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Click and draw", canvas.width / 2, canvas.height / 2);
    setIsDrawing(false);
    setShowButtons(false);
    setSendStatus("SEND");
  };

  useEffect(() => {
    if (showButtons) {
      tippy(".toolbar-button", {
        theme: "my-theme",
        placement: "top",
        animation: "perspective",
        arrow: false,
        delay: [100, 200],
        allowHTML: true,
      });
    }
  }, [showButtons]);

  return (
    <footer className="footer">
      <canvas ref={canvasRef} className="footer-canvas"></canvas>

      {/* Left: Contact Info */}
      <div className="footer-left">
        <h2 className="footer-title">Drop me a line</h2>
        <a href="mailto:hello@denisgurcu.com" className="footer-link clickable">
          hello@denisgurcu.com
        </a>
        <div className="footer-social clickable">
          <a href="https://www.linkedin.com/in/denisgurcu/" target="_blank" rel="noopener noreferrer">
            LINKEDIN <span className="arrow">↗︎</span>
          </a>
          <a href="https://github.com/denisgurcu" target="_blank" rel="noopener noreferrer">
            GITHUB <span className="arrow">↗︎</span>
          </a>
        </div>
      </div>

      {/* Right: Brand Color Selector */}
      <div className="color-selector">
        {brandColors.map((color) => (
          <div
            key={color}
            className={`color-dot clickable ${brushColor === color ? "active" : ""}`} // ✅ Add "active" if selected
            style={{ backgroundColor: color }}
            onClick={() => setBrushColor(color)}
          ></div>
        ))}
      </div>

      {/* Buttons Appear When Drawing Starts */}
      {/* Toolbar Buttons with Tooltips */}
      {showButtons && (
        <div className="toolbar">
          <div
            className={`toolbar-button clickable ${isSending || sendStatus === "Drawing Sent!" ? "disabled" : ""}`}
            data-tippy-content="Send this drawing to my email"
            onClick={handleSend}
          >
            {isSending ? <div className="loading-spinner"></div> : sendStatus} {/* ✅ Show spinner while sending */}
          </div>
          <div
            className="toolbar-button clickable"
            data-tippy-content="Clear the canvas"
            onClick={handleClear}
          >
            CLEAR
          </div>
          <div
            className="toolbar-button clickable"
            data-tippy-content="Save as a PNG file"
            onClick={handleDownload}
          >
            DOWNLOAD
          </div>
        </div>
      )}

      {/* Footer Bottom Info */}
      <div className="footer-bottom">
        <span>Designed & Developed by Denis Gurcu</span>
        <span>Built with React</span>
        <span>© 2024 All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
