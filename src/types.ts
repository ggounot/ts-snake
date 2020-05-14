export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export interface State {
  snakePositions: Position[];
  snakeDirection: Direction;
  applePosition: Position;
}
