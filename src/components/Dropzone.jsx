// Dropzone.js
// import React, { useCallback } from "react";
import { Typography, Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Grid item xs={12}>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          Drag & drop a photo here, or click to select one.
        </Typography>
      </div>
    </Grid>
  );
};

export default Dropzone;
