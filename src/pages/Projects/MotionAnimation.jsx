import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import "./Projects.css";
import gradientTexture from "../../assets/images/circle2.png";


const MotionAnimation = () => {
  const motionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;
  
    const engine = Engine.create();
    engine.world.gravity.y = 0.5;
  
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
  
    const render = Render.create({
      element: motionRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        background: "transparent",
        wireframes: false,
      },
    });
  
    // Create boundaries (walls)
    const ground = Bodies.rectangle(width / 2, height + 11, width, 20, { isStatic: true });
    const roof = Bodies.rectangle(width / 2, -25, width, 20, { isStatic: true });
    const wallLeft = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true });
    const wallRight = Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true });
  
    Composite.add(engine.world, [ground, roof, wallLeft, wallRight]);
  
    // Create rectangles for each letter in "PROJECTS"
    const textX = width / 12; // Starting x position for the text
    const textY = height / 1; // Y position for the text
    const letterSpacing = 150; // Spacing between letters
    const letterWidth = 100; // Approximate width of each letter
    const letterHeight = 400; // Approximate height of each letter
  
    const letterBodies = [];
    for (let i = 0; i < 8; i++) { // 8 letters in "PROJECTS"
      const letterBody = Bodies.rectangle(
        textX + i * letterSpacing, // Position each letter with spacing
        textY,
        letterWidth,
        letterHeight,
        {
          isStatic: true,
          render: {
            fillStyle: "transparent", // Semi-transparent for debugging
          },
        }
      );
      letterBodies.push(letterBody);
    }
  
    Composite.add(engine.world, letterBodies);
  
    // Create randomly generated circles
    const createNonOverlappingCircle = (existingBodies) => {
      let attempts = 0;
      const maxAttempts = 20;
  
      while (attempts < maxAttempts) {
        const radius = Math.random() * 30 + 20; // Random size 
        const x = Math.random() * (width - 2 * radius) + radius; // Random horizontal position
        const y = -Math.random() * height + 400; // Random height between -height/2 and 0
  
        const newBody = Bodies.circle(x, y, radius, {
          restitution: 0.9,
          friction: 0.3,
          collisionFilter: { category: 0x0001 },
          render: {
            sprite: {
              texture: gradientTexture, // Use your existing texture
              xScale: (radius * 2) / 412, // Scale texture to match circle size
              yScale: (radius * 2) / 412,
            },
          },
        });
  
        // Ensure no overlap with existing bodies
        const overlaps = existingBodies.some((body) =>
          Matter.Bounds.overlaps(body.bounds, newBody.bounds)
        );
  
        if (!overlaps) {
          return newBody;
        }
        attempts++;
      }
      return null;
    };
  
    const circles = [];
    for (let i = 0; i < 20; i++) {
      const circle = createNonOverlappingCircle(circles);
      if (circle) circles.push(circle);
    }
  
    Composite.add(engine.world, circles);
  
    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
  
    Composite.add(engine.world, mouseConstraint);

    // Remove Matter.js mousewheel listeners to allow page scrolling
    mouseConstraint.mouse.element.removeEventListener("wheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);  
  
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
  
    return () => {
      Render.stop(render);
      Composite.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);
  
  return (
    <div className="motion-animation-container" ref={containerRef}>
      <div className="matter" ref={motionRef}></div>
    </div>
  );
};

export default MotionAnimation;

