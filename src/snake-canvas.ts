import settings from "./settings";
import canvasSettings from "./canvas-settings";
import { initSnake, nextStep } from "./snake";
import { State } from "./types";

const draw = (ctx: CanvasRenderingContext2D, state: State): void => {
  ctx.fillStyle = canvasSettings.backgroundColor;
  ctx.fillRect(
    0,
    0,
    settings.gridWidth * canvasSettings.cellSize,
    settings.gridHeight * canvasSettings.cellSize
  );
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

const runSnake = (ctx: CanvasRenderingContext2D) => {
  const stepDelay = 1000 / settings.stepsPerSecond;
  let state = initSnake();
  draw(ctx, state);
  let lastTimestamp = performance.now();

  const drawNextFrame = (timestamp: DOMHighResTimeStamp) => {
    if (timestamp - lastTimestamp > stepDelay) {
      state = nextStep(state, state.snakeDirection);
      draw(ctx, state);
      lastTimestamp = timestamp;
    }
    requestAnimationFrame(drawNextFrame);
  };

  requestAnimationFrame(drawNextFrame);
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

  runSnake(ctx);
};

main();
