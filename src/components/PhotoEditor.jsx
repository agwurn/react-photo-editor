import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric"
import {
  Button,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import CanvasContainer from "./CanvasContainer";
import Dropzone from "./Dropzone";
import FabricManager from "../helpers/FabricManager";
import Slider from "@mui/material/Slider";

export default function PhotoEditor() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isSaturationEnabled, setIsSaturationEnabled] = useState(false);
  const [saturationValue, setSaturationValue] = useState(1);
  const [isBlurEnabled, setIsBlurEnabled] = useState(false);
  const [blurValue, setBlurValue] = useState(1);

  const canvasRef = useRef(null);
  const contianerRef = useRef(null);
  const fabricManagerRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setImageUrl(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const containerWidth = contianerRef.current.offsetWidth;
    fabricManagerRef.current = new FabricManager(canvasRef, containerWidth);
    fabricManagerRef.current.setSize();
    if (fabric.isWebglSupported()) {
      fabric.textureSize = 65536;
    }
    return () => {
      fabricManagerRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (imageUrl) {
      fabricManagerRef.current.loadImage(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (fabricManagerRef.current) {
      fabricManagerRef.current.setSaturation(saturationValue);
    }
  }, [saturationValue]);

  const handleToggleIsSaturationEnabled = () => {
    fabricManagerRef.current.toggleSaturation(
      fabricManagerRef.current.saturationFilter,
      !isSaturationEnabled
    );
    setIsSaturationEnabled(!isSaturationEnabled);
  };

  useEffect(() => {
    if (fabricManagerRef.current) {
      fabricManagerRef.current.setBlur(blurValue);
    }
  }, [blurValue]);

  const handleToggleIsBlurEnabled = () => {
    fabricManagerRef.current.toggleBlur(
      fabricManagerRef.current.blurFilter,
      !isBlurEnabled
    );
    setIsBlurEnabled(!isBlurEnabled);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} />

      <CanvasContainer contianerRef={contianerRef} canvasRef={canvasRef} />

      <Button variant="contained" onClick={handleToggleIsSaturationEnabled}>
        Toggle Saturation
      </Button>
      <Slider
        value={saturationValue}
        step={0.05}
        min={0}
        max={2}
        onChange={(e, newValue) => setSaturationValue(newValue)}
      />
      <Button variant="contained" onClick={handleToggleIsBlurEnabled}>
        Toggle Blur
      </Button>
      <Slider
        value={blurValue}
        step={0.05}
        min={0}
        max={1}
        onChange={(e, newValue) => setBlurValue(newValue)}
      />
    </div>
  );
}
