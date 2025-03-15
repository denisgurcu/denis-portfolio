import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { svgPathProperties } from "svg-path-properties";
import decomp from "poly-decomp";
import "./Projects.css";
import gradientTexture from "../../assets/images/circle3.png";

// Attach poly-decomp for SVG conversion
window.decomp = decomp;
Matter.Common.setDecomp(decomp);

const MotionAnimation = () => {
  const motionRef = useRef(null);
  const containerRef = useRef(null);

  const calculateScaleFactor = () => {
    const baseWidth = 1920; // Base screen width for your design
    const currentWidth = window.innerWidth; // Get current screen width
    return currentWidth / baseWidth; // Scale based on screen size
  };

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite } = Matter;

    const engine = Engine.create();
    engine.constraintIterations = 12; // Improves object stability
    engine.positionIterations = 12; // Reduces sinking effect
    engine.velocityIterations = 10; // Fixes object placement on letters
    
    engine.world.gravity.y = 0.5;

    const container = containerRef.current;
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let scaleFactor = calculateScaleFactor(); // Calculate scale

    const render = Render.create({
      element: motionRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        background: "transparent",
        wireframes: false,
        showInternalEdges: true, // ✅ This helps debug hidden overlapping issues

      },
    });

    // **Find SVG and paths**
    const svgElement = document.getElementById("projectSVG");
    if (!svgElement) {
      console.error("❌ SVG not found in the DOM!");
      return;
    }

    const paths = [...svgElement.querySelectorAll("path")];
    if (paths.length === 0) {
      console.error("❌ No paths found in SVG!");
      return;
    }

    // ✅ Function to Convert SVG Path to Matter.js Vertices
    const convertPathToVertices = (path, index) => {
      try {
        const pathData = path.getAttribute("d");
        if (!pathData || pathData.trim() === "") {
          console.warn(`⚠️ Skipping empty path at index ${index}`);
          return null;
        }

        const properties = new svgPathProperties(pathData);
        const totalLength = properties.getTotalLength();
        const points = [];
        const scaleIncrease = 1.1; // ✅ Increase this value to make the letters bigger
        const newScaleFactor = scaleFactor * scaleIncrease; // ✅ Adjusted scale

        for (let i = 0; i < totalLength; i += 10) {
          const { x, y } = properties.getPointAtLength(i);
          points.push({ x: x * newScaleFactor, y: y * newScaleFactor });
        }

        return [points];
      } catch (error) {
        console.error(`❌ Error converting path at index ${index}:`, error);
        return null;
      }
    };

    // ✅ Letter Offsets (Now Scaled Dynamically)
    const letterOffsets = {
      P: { x: 0, y: -10 * scaleFactor },
      R: { x: 0, y: 3 * scaleFactor },
      O: { x: 0, y: 20 * scaleFactor },
      J: { x: 0, y: 38 * scaleFactor },
      E: { x: 0, y: 8 * scaleFactor },
      C: { x: 0, y: 20 * scaleFactor },
      T: { x: 0, y: -15 * scaleFactor },
      S: { x: 0, y: 26 * scaleFactor },
    };

    const letterBodies = paths.map((path, index) => {
      const vertices = convertPathToVertices(path, index);
      if (!vertices || vertices.length === 0) {
        return null;
      }

      const bbox = path.getBBox();
      const letter = path.getAttribute("data-letter");
      const offset = letterOffsets[letter] || { x: 0, y: 0 };

      const brandColors = [
        "#262525", // Black
        "#E6E6E6", // White
        "#CCCCCC", // Grey
        "#FFD24D", // Yellow
        "#6FA2D5", // Blue
        "#114059", // Dark Blue
        "#DA4D3B", // Red
        "#8F263E", // Dark Red
        "#E3C3D8"  // Pink
      ];

      return Bodies.fromVertices(
        (bbox.x + bbox.width / 2 + 20) * scaleFactor + offset.x,
        (window.innerHeight - bbox.height + 87) * scaleFactor + offset.y,
        vertices,
        {
          isStatic: true,
          chamfer: { radius: 0 }, // Small chamfer reduces minor overlaps
          render: { fillStyle: "transparent" },
          slop: 0, // ✅ Forces circles to rest perfectly on top
        },
        true
      );
    }).filter(Boolean);

    Composite.add(engine.world, letterBodies);

    // ✅ Add Falling Circles (Now Scaled)
    const createCircle = () => {
      // ✅ Increase variation in size for better visual effect
      const radius = (Math.random() * (80 - 30) + 15) * scaleFactor;


      
      return Bodies.circle(
        Math.random() * width,
        -Math.random() * 400,
        radius,
        {
          restitution: Math.random() * 0.5 + 0.5, // ✅ Controls bounce effect
          friction: Math.random() * 0.2, // ✅ Controls sliding on letters
          density: Math.random() * 0.03 + 0.01, // ✅ Adds slight weight variation
          slop: 0, // ✅ Prevents sinking effect (forces better collision)
          collisionFilter: {
            group: 0,
            category: 0x0001,
            mask: 0x0001, // ✅ Ensures precise collision behavior
          },
          render: {
            fillStyle: "#262525", 
            
            // sprite: {
            //   texture: gradientTexture,
            //   xScale: (radius * 2) / 400,
            //   yScale: (radius * 2) / 400,
            // },
          },
        }
      );
    };


    const circles = Array.from({ length: 25 }, createCircle);
    Composite.add(engine.world, circles);

    

    // ✅ Add Mouse Interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    // ✅ Add to Engine
    Composite.add(engine.world, mouseConstraint);

    // ✅ Fix Mouse Scroll Issues
    mouseConstraint.mouse.element.removeEventListener("wheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);


    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // ✅ Handle Window Resize
    const handleResize = () => {
      scaleFactor = calculateScaleFactor();
      Matter.Engine.clear(engine);
      Matter.Render.stop(render);
      Matter.Composite.clear(engine.world);
      Matter.Runner.stop(runner);

      // Restart animation with new scale
      setTimeout(() => {
        MotionAnimation();
      }, 100);
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
    <div className="motion-animation-container" ref={containerRef}>
      <svg
        id="projectSVG"
        width="1920"
        height="249"
        viewBox="0 0 1920 249"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <path data-letter="P" d="M258.72 224.6H204V25.88H300.192C353.472 25.88 372.768 52.088 372.768 82.616C372.768 118.328 342.528 137.624 300.192 137.624H258.72V224.6ZM258.72 132.44H285.504C311.712 132.44 318.048 121.784 318.048 106.808C318.048 92.12 312 81.176 285.504 81.176H258.72V132.44Z" fill="black" />
        <path data-letter="R" d="M439.001 224.6H384.281V25.88H476.441C540.665 25.88 553.049 57.848 553.049 82.904C553.049 112.28 531.737 130.712 490.265 130.712V139.352C531.449 139.352 538.937 143.384 544.121 165.848L557.369 224.6H501.209L483.929 147.992C481.625 138.2 474.713 137.624 463.193 137.624H439.001V224.6ZM439.001 81.176V132.44H465.785C491.993 132.44 498.329 121.496 498.329 106.808C498.329 92.408 492.281 81.176 465.785 81.176H439.001Z" fill="black" />
        <path data-letter="O" d="M764.394 125.24C764.394 192.92 714.282 227.48 663.882 227.48C613.482 227.48 563.37 192.92 563.37 125.24C563.37 57.56 613.482 23 663.882 23C714.282 23 764.394 57.56 764.394 125.24ZM708.234 125.24C708.234 96.152 687.786 80.6 663.882 80.6C639.978 80.6 619.53 96.152 619.53 125.24C619.53 154.328 639.978 169.88 663.882 169.88C687.786 169.88 708.234 154.328 708.234 125.24Z" fill="black" />
        <path data-letter="J" d="M774.956 31.064V25.88H885.836V158.648C885.836 200.984 859.339 227.48 812.107 227.48C781.291 227.48 756.235 216.824 740.107 203.864L783.019 160.952C787.339 164.984 796.843 171.32 808.076 171.32C823.34 171.32 831.115 164.12 831.115 149.432V31.064H774.956Z" fill="black" />
        <path data-letter="E" d="M1054.96 25.88V82.04H960.787V120.056H1052.08V125.24H960.787V168.44H1054.96V224.6H903.188V25.88H1054.96Z" fill="black" />
        <path data-letter="C" d="M1168.73 227.48C1115.45 227.48 1067.93 192.92 1067.93 125.24C1067.93 57.56 1117.47 23 1169.31 23C1231.8 23 1262.33 67.064 1265.5 96.728L1203.58 102.2C1200.12 92.984 1188.03 80.6 1167.58 80.6C1144.54 80.6 1124.09 96.152 1124.09 125.24C1124.09 154.328 1144.54 169.88 1168.16 169.88C1190.04 169.88 1202.14 154.904 1204.44 144.248L1266.08 146.84C1263.77 181.112 1233.24 227.48 1168.73 227.48Z" fill="black" />
        <path data-letter="T" d="M1339.38 81.176H1277.46V25.88H1456.02V81.176H1394.1V224.6H1339.38V81.176Z" fill="black" />
        <path data-letter="S" d="M1563.46 171.32C1586.5 171.32 1598.02 162.104 1598.02 148.568C1598.02 133.88 1589.95 123.8 1543.3 123.8C1492.03 123.8 1470.43 109.112 1470.43 80.6C1470.43 46.904 1503.27 23 1559.43 23C1625.67 23 1648.71 58.712 1651.88 93.272L1589.38 98.744C1587.08 88.088 1578.72 79.16 1557.12 79.16C1537.54 79.16 1525.16 86.936 1525.16 98.744C1525.16 116.312 1544.45 118.616 1586.5 118.616C1639.78 118.616 1652.74 136.184 1652.74 162.68C1652.74 196.664 1621.35 227.48 1566.05 227.48C1498.66 227.48 1473.6 190.328 1470.72 148.856L1528.9 142.808C1530.63 158.936 1538.4 171.32 1563.46 171.32Z" fill="black" />

      </svg>
      <div className="matter" ref={motionRef}></div>
    </div>
  );
};

export default MotionAnimation;
