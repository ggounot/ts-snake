import settings from "./settings";
import canvasSettings from "./canvas-settings";

const main = (doc: Document = document) => {
  const element = doc.getElementById("canvas");

  if (element === null) {
    throw "Canvas element not found";
  }

  const canvas = element as HTMLCanvasElement;

  canvas.width = settings.gridWidth * canvasSettings.cellSize;
  canvas.height = settings.gridHeight * canvasSettings.cellSize;
};

main();
