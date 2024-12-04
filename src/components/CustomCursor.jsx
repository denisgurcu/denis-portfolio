import React, { useEffect, useState } from "react";
import { gsap } from "gsap"; // Animation library for smooth cursor movement
import "./CustomCursor.css"; // Styles for the custom cursor

const CustomCursor = ({ cursorColor }) => {
  const [cursorOpacity, setCursorOpacity] = useState(0.8); // Controls how visible the cursor is
  const [isMobile, setIsMobile] = useState(false); // Tracks if the user is on a mobile device

  // Check if the screen is mobile-sized and update state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Mark as mobile if screen width is 768px or smaller
    };

    checkMobile(); // Run the check when the component mounts
    window.addEventListener("resize", checkMobile); // Check again whenever the window is resized

    return () => {
      window.removeEventListener("resize", checkMobile); // Clean up the resize listener
    };
  }, []);

  // Set up custom cursor behavior unless on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add("default-cursor"); // Use the default browser cursor on mobile
      return; // Skip custom cursor setup for mobile
    } else {
      document.body.classList.remove("default-cursor"); // Enable the custom cursor on larger screens
    }

    const cursor = document.querySelector(".cursor"); // Get the custom cursor element
    document.body.style.cursor = "none"; // Hide the default browser cursor

    // Use GSAP for smooth cursor movement
    let xTo = gsap.quickTo(".cursor", "x", { duration: 0.1, ease: "power3" });
    let yTo = gsap.quickTo(".cursor", "y", { duration: 0.1, ease: "power3" });

    // Update cursor position on mouse movement
    const updateCursorPosition = (e) => {
      xTo(e.clientX); // Move cursor to the mouse's X position
      yTo(e.clientY); // Move cursor to the mouse's Y position
      setCursorOpacity(1); // Make the cursor fully visible
    };

    window.addEventListener("mousemove", updateCursorPosition); // Listen for mouse movement

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition); // Clean up the mousemove listener
    };
  }, [isMobile]); // Re-run effect if `isMobile` changes

  // Don't render the custom cursor on mobile
  if (isMobile) return null;

  return (
    <div
      className="cursor"
      style={{
        backgroundColor: cursorColor || "transparent", // Use the provided cursor color or make it transparent
        opacity: cursorOpacity, // Apply the current opacity
      }}
    />
  );
};

export default CustomCursor; // Export the component to be used in other parts of the app
