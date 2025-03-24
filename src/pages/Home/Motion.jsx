import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import './Motion.css';
import pencilTexture from '../../assets/images/circle2.png';

const Motion = () => {
  const motionRef = useRef(null); // Reference for Matter.js render container
  const containerRef = useRef(null); // Reference for parent container dimensions

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 0.2;
    engine.positionIterations = 20;
    engine.velocityIterations = 20;

    const container = containerRef.current;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

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

    const wallThickness = 50; // ✅ Still used here

    const createWalls = () => [
      Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { isStatic: true }),
      Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, { isStatic: true }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true }),
    ];

    let walls = createWalls();
    Composite.add(engine.world, walls);

    const createNonOverlappingCircle = (existingBodies) => {
      let attempts = 0;
      const maxAttempts = 10;

      // 🔥 Scaled size based on container width
      const minRadius = width * 0.02;
      const maxRadius = width * 0.07;

      while (attempts < maxAttempts) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const x = Math.random() * (width - 2 * radius) + radius;
        const y = Math.random() * (height - 2 * radius) + radius;

        const newBody = Bodies.circle(x, y, radius, {
          restitution: 0.9,
          friction: 0.3,
          render: {
            fillStyle: "rgba(38, 38, 38, 0.9)",
            // sprite: {
            //   texture: pencilTexture,
            //   xScale: (radius * 2) / 412,
            //   yScale: (radius * 2) / 412,
            // },
          },
        });

        const overlaps = existingBodies.some((body) =>
          Matter.Bounds.overlaps(body.bounds, newBody.bounds)
        );

        if (!overlaps) return newBody;
        attempts++;
      }
      return null;
    };

    const circles = [];
    for (let i = 0; i < 15; i++) {
      const circle = createNonOverlappingCircle(circles);
      if (circle) circles.push(circle);
    }
    Composite.add(engine.world, circles);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);

    mouseConstraint.mouse.element.removeEventListener("wheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // ✅ Handle resizing
    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;

      render.canvas.width = width;
      render.canvas.height = height;

      // Remove old walls and add new ones
      Composite.remove(engine.world, walls);
      walls = createWalls();
      Composite.add(engine.world, walls);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
