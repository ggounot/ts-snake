import { Position, State, Direction } from "./types";
import settings from "./settings";

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomApplePosition = (snakePositions: Position[]): Position => {
  const applePosition = {
    x: getRandomNumber(0, settings.gridWidth),
    y: getRandomNumber(0, settings.gridHeight),
  };
  const appleOnSnake = snakePositions.reduce(
    (result, snakePosition) =>
      result ||
      (applePosition.x === snakePosition.x &&
        applePosition.y === snakePosition.y),
    false
  );
  return appleOnSnake ? getRandomApplePosition(snakePositions) : applePosition;
};

const initSnake = (): State => {
  return {
    snakePositions: [settings.defaultSnakePosition],
    snakeDirection: settings.defaultSnakeDirection,
    applePosition: getRandomApplePosition([settings.defaultSnakePosition]),
  };
};

const isValidDirection = (
  previousDirection: Direction,
  newDirection: Direction
): Boolean => {
  return !(
    (previousDirection == Direction.Up && newDirection == Direction.Down) ||
    (previousDirection == Direction.Down && newDirection == Direction.Up) ||
    (previousDirection == Direction.Left && newDirection == Direction.Right) ||
    (previousDirection == Direction.Right && newDirection == Direction.Left)
  );
};

const positiveModulo = (a: number, b: number): number => {
  return ((a % b) + b) % b;
};

const getNextHeadPosition = (
  previousHeadPosition: Position,
  direction: Direction
): Position => {
  switch (direction) {
    case Direction.Up:
      return {
        x: previousHeadPosition.x,
        y: positiveModulo(previousHeadPosition.y - 1, settings.gridHeight),
      };
    case Direction.Down:
      return {
        x: previousHeadPosition.x,
        y: (previousHeadPosition.y + 1) % settings.gridHeight,
      };
    case Direction.Left:
      return {
        x: positiveModulo(previousHeadPosition.x - 1, settings.gridWidth),
        y: previousHeadPosition.y,
      };
    case Direction.Right:
      return {
        x: (previousHeadPosition.x + 1) % settings.gridWidth,
        y: previousHeadPosition.y,
      };
  }
};

const nextStep = (
  previousState: State,
  newDirection: Direction | undefined
): State => {
  let snakeDirection = previousState.snakeDirection;
  if (
    newDirection !== undefined &&
    isValidDirection(snakeDirection, newDirection)
  ) {
    snakeDirection = newDirection;
  }
  return {
    snakePositions: previousState.snakePositions,
    snakeDirection: snakeDirection,
    applePosition: previousState.applePosition,
  };
};

export { initSnake, nextStep };
