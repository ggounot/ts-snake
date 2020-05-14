import settings from "./settings";
import canvasSettings from "./canvas-settings";
import { initSnake, nextStep } from "./snake";
import { State, Direction, GameStatus } from "./types";

const drawProgress = (ctx: CanvasRenderingContext2D, state: State): void => {
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

const drawFadeIn = (
  ctx: CanvasRenderingContext2D,
  fn: Function,
  counter: number = 50
) => {
  fn();
  if (counter - 1 > 0) {
    requestAnimationFrame(() => drawFadeIn(ctx, fn, counter - 1));
  }
};

const drawEnd = (
  ctx: CanvasRenderingContext2D,
  backgroundColor: string,
  text: string,
  leftMargin: number
) => {
  ctx.fillStyle = backgroundColor;
  drawFadeIn(ctx, () => {
    ctx.fillRect(
      0,
      0,
      settings.gridWidth * canvasSettings.cellSize,
      settings.gridHeight * canvasSettings.cellSize
    );
  });
  setTimeout(() => {
    drawFadeIn(ctx, () => {
      ctx.fillStyle = canvasSettings.gameEndTextColor;
      ctx.font = "bold 50px sans";
      ctx.fillText(text, leftMargin, 165);
    });
  }, 900);
};

const draw = (ctx: CanvasRenderingContext2D, state: State): void => {
  switch (state.gameStatus) {
    case GameStatus.InProgress:
      drawProgress(ctx, state);
      break;
    case GameStatus.Won:
      drawEnd(ctx, canvasSettings.gameWonBackgroundColor, "YOU WON", 30);
      break;
    case GameStatus.Lost:
      drawEnd(ctx, canvasSettings.gameLostBackgroundColor, "YOU LOST", 25);
      break;
  }
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
    if (state.gameStatus === GameStatus.InProgress) {
      requestAnimationFrame(drawNextFrame);
    }
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
