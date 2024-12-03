import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import './Motion.css';
import pencilTexture from '../../assets/images/circle2.png';

const Motion = () => {
  const motionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 0.2;
    engine.positionIterations = 20;
    engine.velocityIterations = 20;

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

    // Create boundaries (walls) to keep shapes inside the container
    const ground = Bodies.rectangle(width / 2, height +10, width, 20, { isStatic: true });
    const roof = Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true });
    const wallLeft = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true });
    const wallRight = Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true });

    Composite.add(engine.world, [ground, roof, wallLeft, wallRight]);

    // Create a circle body without overlapping
    const createNonOverlappingCircle = (existingBodies) => {
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts) {
        const radius = Math.random() * 50 + 10; // Random size (10 to 30px)
        const x = Math.random() * (width - 2 * radius) + radius; // Ensure within horizontal bounds
        const y = Math.random() * (height - 10 * radius) + radius; // Ensure within vertical bounds


        const newBody = Bodies.circle(x, y, radius, {
          restitution: 0.9,
          friction: 0.3,
          collisionFilter: { category: 0x0001 },
          render: {
            sprite: {
              texture: pencilTexture, // Path to your texture image
              xScale: (radius * 2) / 412, // Scale to match circle diameter
              yScale: (radius * 2) / 412, // Scale to match circle diameter
            },
          },
        });

        // Check for overlap with existing bodies
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

    // Add mouse control for interaction (dragging)
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false, // Hide the mouse constraint line
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);

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
    <div className="motion-container" ref={containerRef}>
      <div className="matter" ref={motionRef}></div>
    </div>
  );
};

export default Motion;
