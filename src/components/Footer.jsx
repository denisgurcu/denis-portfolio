import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective.css";

const Footer = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const brushColorRef = useRef("#E6E6E6"); // Store brush color in a ref

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#E6E6E6"); // Default white
  const [showButtons, setShowButtons] = useState(false);

  let width, height, prevX, prevY;

  const brandColors = ["#E6E6E6", "#FFD24D", "#6FA2D5", "#DA4D3B", "#E3C3D8"]; // Brand colors

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeListener = () => {
      const prevImage = canvas.toDataURL(); // Save current drawing
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      ctx.fillStyle = "#262525"; // Black background
      ctx.fillRect(0, 0, width, height);

      // Restore the previous drawing
      const img = new Image();
      img.src = prevImage;
      img.onload = () => ctx.drawImage(img, 0, 0);

      // Show placeholder text only if no drawing
      if (!isDrawing) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.font = "16px Afacad, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Click and draw", width / 2, height / 2);
      }
    };

    const mouseMoveListener = (event) => {
      if (!mouseRef.current.down) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.strokeStyle = brushColorRef.current; // ✅ Always use the latest color
      ctx.lineWidth = 30;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      prevX = x;
      prevY = y;
    };

    const mouseDownListener = (event) => {
      if (event.button !== 0 || event.target !== canvas) return; // ✅ Only allow left-click on canvas

      mouseRef.current.down = true;
      setIsDrawing(true);
      setShowButtons(true);

      const rect = canvas.getBoundingClientRect();
      prevX = event.clientX - rect.left;
      prevY = event.clientY - rect.top;

      // ✅ Only redraw if needed (avoid unnecessary clearing)
      if (!isDrawing) {
        requestAnimationFrame(resizeListener);
      }
    };

    const mouseUpListener = () => (mouseRef.current.down = false);

    // Attach resize listener separately
    window.addEventListener("resize", resizeListener);
    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mousedown", mouseDownListener);
    window.addEventListener("mouseup", mouseUpListener);

    resizeListener(); // Initial resize

    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mousedown", mouseDownListener);
      window.removeEventListener("mouseup", mouseUpListener);
    };
  }, [isDrawing]); // ✅ Removed brushColor from dependency array

  // ✅ Keep brushColor updated in a ref
  useEffect(() => {
    brushColorRef.current = brushColor;
  }, [brushColor]);

  const [sendStatus, setSendStatus] = useState("SEND"); // Button text state
  const [isSending, setIsSending] = useState(false); // Loading state
  const [confirmationMessage, setConfirmationMessage] = useState(""); // On-screen message

  const handleSend = async () => {
    if (sendStatus === "Drawing Sent!") return; // Prevent multiple clicks

    setIsSending(true); // ✅ Show loading indicator
    setSendStatus(""); // ✅ Hide button text

    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");

    // Convert Base64 to Blob
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
        setSendStatus("Drawing Sent!"); // ✅ Update button text
        setIsSending(false); // ✅ Hide loading

      } else {
        setSendStatus("Try Again!"); // ✅ Show error
        setIsSending(false); // ✅ Hide loading
        setTimeout(() => setSendStatus("SEND"), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setSendStatus("Try Again!");
      setIsSending(false);
      setTimeout(() => setSendStatus("SEND"), 3000);
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

    // Show "Click and Draw" again
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Click and draw", canvas.width / 2, canvas.height / 2);

    setIsDrawing(false);
    setShowButtons(false);
    setSendStatus("SEND"); //
  };

  useEffect(() => {
    if (showButtons) {
      tippy(".toolbar-button", {
        theme: "my-theme",
        placement: "top",
        animation: "perspective",
        arrow: false,
        delay: [100, 200],
        allowHTML: true, // Ensures tooltips update correctly
      });
    }
  }, [showButtons]); // ✅ Reinitialize tooltips when `showButtons` updates

  return (
    <footer className="footer">
      <canvas ref={canvasRef} className="footer-canvas"></canvas>

      {/* Left: Contact Info */}
      <div className="footer-left">
        <h2 className="footer-title">Drop me a line, literally.</h2>
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
            data-tippy-content="Erase everything from the canvas"
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
        <span>Designed & coded by Denis Gurcu</span>
        <span>Built with React</span>
        <span>© 2024 All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
