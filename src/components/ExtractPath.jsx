import opentype from "opentype.js";

export const extractFontPath = async (text, fontUrl, fontSize) => {
  try {
    // Load your custom font (Make sure the font is in the `public` folder)
    const font = await opentype.load(fontUrl);

    // Generate path for the text
    const path = font.getPath(text, 0, fontSize, fontSize);
    
    // Convert the path to SVG format
    const svgPath = path.toSVG();

    console.log("Extracted SVG Path:", svgPath); // Copy this output to use in Matter.js

    return svgPath;
  } catch (error) {
    console.error("Error loading font:", error);
    return null;
  }
};
