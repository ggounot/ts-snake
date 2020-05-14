import settings from "./settings";
import canvasSettings from "./canvas-settings";
import { initSnake } from "./snake";
import { State } from "./types";

const draw = (ctx: CanvasRenderingContext2D, state: State): void => {
  ctx.fillStyle = canvasSettings.snakeColor;
  state.snakePositions.forEach((position) =>
    ctx.fillRect(
      position.x * canvasSettings.cellSize,
      position.y * canvasSettings.cellSize,
      canvasSettings.cellSize,
      canvasSettings.cellSize
    )
  );
  ctx.fillStyle = canvasSettings.appleColor;
  ctx.fillRect(
    state.applePosition.x * canvasSettings.cellSize,
    state.applePosition.y * canvasSettings.cellSize,
    canvasSettings.cellSize,
    canvasSettings.cellSize
  );
};

const main = (doc: Document = document) => {
  const element = doc.getElementById("canvas");

  if (element === null) {
    throw "Canvas element not found";
  }

  const canvas = element as HTMLCanvasElement;

  canvas.width = settings.gridWidth * canvasSettings.cellSize;
  canvas.height = settings.gridHeight * canvasSettings.cellSize;

  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    throw "Could not get 2D rendering context";
  }

  const state = initSnake();

  draw(ctx, state);
};

main();
