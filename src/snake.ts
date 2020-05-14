import { Position, State } from "./types";
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

export { initSnake };
