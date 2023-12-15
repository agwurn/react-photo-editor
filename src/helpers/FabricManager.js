import { fabric } from "fabric";

class FabricManager {
  constructor(canvasRef, containerWidth) {
    this.fabricCanvas = new fabric.Canvas(canvasRef.current);
    this.fabricImage = null;
    this.containerWidth = containerWidth;
    this.isBlurEnabled = false;
  }
  setSize(width, height) {
    this.fabricCanvas.setDimensions({
      width: width || this.containerWidth,
      height: height || this.containerWidth * 0.75,
    });
  }

  loadImage(imageUrl) {
    fabric.Image.fromURL(imageUrl, (img) => {
      this.fabricImage = img;

      const scaleRatio = this.containerWidth / img.width;
      this.fabricImage.scaleToWidth(this.containerWidth);
      this.fabricImage.scaleToHeight(img.height * scaleRatio);

      this.fabricCanvas.clear();
      this.fabricCanvas.add(this.fabricImage);
      this.setSize();
      this.fabricCanvas.renderAll();
    });
  }

  dispose() {
    this.fabricCanvas.dispose();
  }

  /*
    Filters
  */
  setSaturation(value) {
    if (this.fabricImage) {
      if (!this.saturationFilter) {
        this.saturationFilter = new fabric.Image.filters.Saturation({
          saturation: value,
        });
        this.fabricImage.filters.push(this.saturationFilter);
      } else {
        this.saturationFilter.saturation = value;
      }

      this.applyFilterAndRender();
    }
  }

  toggleSaturation(toggleState) {
    if (toggleState === true) {
      this.fabricImage.filters.push(this.saturationFilter);
    } else {
      this.fabricImage.filters = this.fabricImage.filters.filter(
        (filter) => !(filter instanceof fabric.Image.filters.Saturation)
      );
    }
    this.applyFilterAndRender();
  }

  setBlur(value){
    if (this.fabricImage) {
      if (!this.blurFilter) {
        this.blurFilter = new fabric.Image.filters.Blur({
          blur: value,
        });
        this.fabricImage.filters.push(this.blurFilter);
      } else {
        this.blurFilter.blur = value;
      }

      this.applyFilterAndRender();
    }
  }
  toggleBlur(toggleState) {
    if (toggleState === true) {
      this.fabricImage.filters.push(this.blurFilter);
    } else {
      this.fabricImage.filters = this.fabricImage.filters.filter(
        (filter) => !(filter instanceof fabric.Image.filters.Blur)
      );
    }
    this.applyFilterAndRender();
  }

  applyFilterAndRender() {
    this.fabricImage.applyFilters();
    this.fabricCanvas.renderAll();
  }
}

export default FabricManager;
