import React, { useEffect } from "react";
import gsap from "gsap"; // GSAP for animations
import "./Branding.css"; // Importing custom styles

const Branding = () => {
  const numberOfLines = 10; // Number of horizontal and vertical lines

  useEffect(() => {
    // Selecting all horizontal and vertical lines from the DOM
    const horizontalLines = document.querySelectorAll('.horizontal');
    const verticalLines = document.querySelectorAll('.vertical');

    // Initially set the lines in their starting position (visible on screen)
    gsap.set(horizontalLines, { x: '0%' }); // Horizontal lines are at their original position (x: 0%)
    gsap.set(verticalLines, { y: '0%' });   // Vertical lines are at their original position (y: 0%)

    // Handle the hover effect when the user enters the grid container
    const handleMouseEnter = () => {
      // Reset any ongoing animations before starting new ones
      gsap.killTweensOf(horizontalLines);
      gsap.killTweensOf(verticalLines);

      // Create a GSAP timeline to control the sequence of animations
      const timeline = gsap.timeline();

      // Animate horizontal lines to move off the screen (disappear) by going left (from x: 0% to x: -100%)
      timeline.to(horizontalLines, {
        duration: 0.2,    // Quick disappearance (100ms)
        x: '-100%',       // Move lines off-screen horizontally to the left
        // stagger: 0.05,    // Stagger each line's animation
        // ease: 'power4.out', // Use easing for smooth animation
      });

      // Once the horizontal lines have finished disappearing, animate the vertical lines
      timeline.to(verticalLines, {
        duration: 0.2,    // Quick disappearance (100ms)
        y: '-100%',       // Move lines off-screen vertically to the top
        // stagger: 0.05,    // Stagger each line's animation
        // ease: 'power4.out', // Use easing for smooth animation
      });

      // After a short delay, animate the lines back into view while the mouse is still hovering
      timeline.to(horizontalLines, {
        duration: 1.3,      // Duration of the reappear animation (1 second)
        x: '0%',          // Bring horizontal lines back to the screen
        // stagger: 0.1,    // Stagger each line's animation
        ease: 'power4.out', // Use easing for smooth animation
      }, '+=0.1'); // Start after the vertical lines animation finishes

      timeline.to(verticalLines, {
        duration: 1.5,      // Duration of the reappear animation (1 second)
        y: '0%',          // Bring vertical lines back to the screen
        // stagger: 0.1,    // Stagger each line's animation
        ease: 'power4.out', // Use easing for smooth animation
      });
    };

    // Handle the hover-out effect when the user moves the mouse away from the grid container
    const handleMouseLeave = () => {
      // Reset any ongoing animations before starting new ones
      gsap.killTweensOf(horizontalLines);
      gsap.killTweensOf(verticalLines);

      // Optionally reset lines back to their starting positions immediately when mouse leaves
      gsap.to(horizontalLines, {
        duration: 1,      // Duration of the reset animation (1 second)
        x: '0%',          // Bring horizontal lines back to their original position
        stagger: 0.05,    // Stagger each line's animation
        ease: 'power4.out', // Use easing for smooth animation
      });

      gsap.to(verticalLines, {
        duration: 1,      // Duration of the reset animation (1 second)
        y: '0%',          // Bring vertical lines back to their original position
        stagger: 0.05,    // Stagger each line's animation
        ease: 'power4.out', // Use easing for smooth animation
      });
    };

    // Select the grid container and add event listeners for mouse enter and leave
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.addEventListener('mouseenter', handleMouseEnter); // Trigger the handleMouseEnter function on hover
    gridContainer.addEventListener('mouseleave', handleMouseLeave); // Trigger the handleMouseLeave function when hover ends

    // Cleanup the event listeners when the component is unmounted
    return () => {
      gridContainer.removeEventListener('mouseenter', handleMouseEnter);
      gridContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="grid-container">
      {/* Create horizontal lines */}
      {[...Array(numberOfLines)].map((_, index) => (
        <div
          key={index}
          className="line horizontal"
          style={{ '--index': index }} // Passing index as a custom CSS property for positioning
        />
      ))}

      {/* Create vertical lines */}
      {[...Array(numberOfLines)].map((_, index) => (
        <div
          key={index}
          className="line vertical"
          style={{ '--index': index }} // Passing index as a custom CSS property for positioning
        />
      ))}
    </div>
  );
};

export default Branding;
