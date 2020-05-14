import settings from "./settings";
import canvasSettings from "./canvas-settings";
import { initSnake, nextStep } from "./snake";
import { State, Direction } from "./types";

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

const keycodeToDirection = (keycode: number): number | null => {
  switch (keycode) {
    case 37:
      return Direction.Left;
    case 38:
      return Direction.Up;
    case 39:
      return Direction.Right;
    case 40:
      return Direction.Down;
    default:
      return null;
  }
};

const runSnake = (doc: Document, ctx: CanvasRenderingContext2D) => {
  /* Record instructed directions */
  let instructedDirections: Direction[] = [];
  doc.addEventListener("keydown", (event) => {
    console.log("keydown", event.keyCode);
    const direction = keycodeToDirection(event.keyCode);
    if (direction !== null) {
      instructedDirections.push(direction);
    }
  });

  /* Get initial state and draw frame */
  let state = initSnake();
  draw(ctx, state);
  let lastTimestamp = performance.now();

  /* Get subsequent states and draw frames */
  const stepDelay = 1000 / settings.stepsPerSecond;
  const drawNextFrame = (timestamp: DOMHighResTimeStamp) => {
    if (timestamp - lastTimestamp > stepDelay) {
      state = nextStep(state, instructedDirections.shift());
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

  runSnake(doc, ctx);
};

main();
