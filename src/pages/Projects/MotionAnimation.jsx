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

    // Ensure canvas resizes properly
    const updateCanvasSize = () => {
      if (motionRef.current) {
        motionRef.current.width = container.offsetWidth;
        motionRef.current.height = container.offsetHeight;
      }
    };

    window.addEventListener("resize", updateCanvasSize);
  
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
    const wallLeft = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true });
    const wallRight = Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true });

    Composite.add(engine.world, [ground, wallLeft, wallRight]);

    // Centered letters
    const textX = width / 2 - (150 * 4);
    const textY = height  // Ensure it is close to the bottom

    const letterSpacing = 150;
    const letterWidth = 80;
    const letterHeight = 300;

    const letterBodies = [];
    for (let i = 0; i < 9; i++) {
      const letterBody = Bodies.rectangle(
        textX + i * letterSpacing,
        textY,
        letterWidth,
        letterHeight,
        { isStatic: true, render: { fillStyle: "transparent" } }
      );
      letterBodies.push(letterBody);
    }
  
    Composite.add(engine.world, letterBodies);

    // Responsive Circle Spawn Adjustments
    const createCircle = () => {
      const screenWidth = window.innerWidth;
      let minRadius = 10, maxRadius = 30;

      if (screenWidth < 768) {
        minRadius = 5;
        maxRadius = 20;
      }

      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      return Bodies.circle(Math.random() * width, -Math.random() * height / 2 + 50, radius, {
        restitution: 0.9,
        friction: 0.3,
        render: {
          sprite: {
            texture: gradientTexture,
            xScale: (radius * 2) / 412,
            yScale: (radius * 2) / 412,
          },
        },
      });
    };

    const circles = Array.from({ length: 20 }, createCircle);
    Composite.add(engine.world, circles);
  
    // Mouse Interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    Composite.add(engine.world, mouseConstraint);

    // Restore Mouse Scrolling
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
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);
  
  return (
    <div className="motion-animation-container" ref={containerRef}>
      <div className="matter" ref={motionRef}></div>
    </div>
  );
};

export default MotionAnimation;
