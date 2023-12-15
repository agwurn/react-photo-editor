// Canvas.js
import { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";



const CanvasContainer = ({ contianerRef, canvasRef }) => {


  return (
    <div ref={contianerRef} style={{ width: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", width: "100%" }}
      />

    </div>
  );
};

export default CanvasContainer;
