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

export enum GameStatus {
  InProgress,
  Won,
  Lost,
}

export interface State {
  snakePositions: Position[];
  snakeDirection: Direction;
  applePosition: Position;
  gameStatus: GameStatus;
}
