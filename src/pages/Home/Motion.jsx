import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import './Motion.css';
import pencilTexture from '../../assets/images/circle2.png';

const Motion = () => {
  const motionRef = useRef(null); // Reference for Matter.js render container
  const containerRef = useRef(null); // Reference for parent container dimensions

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    // Initialize Matter.js engine
    const engine = Engine.create();
    engine.world.gravity.y = 0.2; // Add slight gravity
    engine.positionIterations = 20; // Increase precision for better stability
    engine.velocityIterations = 20; // Increase velocity for smoother motion

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create a Matter.js render instance
    const render = Render.create({
      element: motionRef.current, // Target the DOM element
      engine: engine,
      options: {
        width: width, // Match container width
        height: height, // Match container height
        background: "transparent", // Transparent background
        wireframes: false, // Disable wireframe for a clean look
      },
    });

    // Create boundaries to keep objects within the canvas
    const ground = Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true });
    const roof = Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true });
    const wallLeft = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true });
    const wallRight = Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true });

    Composite.add(engine.world, [ground, roof, wallLeft, wallRight]);

    // Helper function to create circles without overlap
    const createNonOverlappingCircle = (existingBodies) => {
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts) {
        const radius = Math.random() * 30 + 10; // Circle size (10 to 40px)
        const x = Math.random() * (width - 2 * radius) + radius; // Horizontal placement
        const y = Math.random() * (height - 2 * radius) + radius; // Vertical placement

        const newBody = Bodies.circle(x, y, radius, {
          restitution: 0.9, // High bounce effect
          friction: 0.3, // Add friction
          render: {
            sprite: {
              texture: pencilTexture, // Use custom texture for circle
              xScale: (radius * 2) / 412, // Scale texture to match circle 
              yScale: (radius * 2) / 412, // Scale texture to match circle 
            },
          },
        });

        // Check for overlap with existing circles
        const overlaps = existingBodies.some((body) =>
          Matter.Bounds.overlaps(body.bounds, newBody.bounds)
        );

        if (!overlaps) {
          return newBody;
        }
        attempts++;
      }
      return null; // Return null if max attempts are reached
    };

    // Create and add circles to the world
    const circles = [];
    for (let i = 0; i < 15; i++) {
      const circle = createNonOverlappingCircle(circles);
      if (circle) circles.push(circle); // Add circle only if it doesn't overlap
    }
    Composite.add(engine.world, circles);

    // Add mouse interaction for dragging objects
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2, // Elasticity of drag
        render: {
          visible: false, // Hide visual drag constraint
        },
      },
    });
    Composite.add(engine.world, mouseConstraint);

    // Remove scroll-blocking event listeners added by Matter.js otherpage page won't scroll
    mouseConstraint.mouse.element.removeEventListener("wheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Cleanup 
    return () => {
      Render.stop(render);
      Composite.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div className="motion-container" ref={containerRef}>
      <div className="matter" ref={motionRef}></div>
    </div>
  );
};

export default Motion;
