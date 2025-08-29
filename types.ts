
export type TETROMINO_CHAR = 0 | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export type STAGE_CELL = [TETROMINO_CHAR, 'clear' | 'merged' | 'dissolving'];

export type STAGE = STAGE_CELL[][];

export type PLAYER = {
  pos: { x: number; y: number };
  tetromino: TETROMINO_CHAR[][];
  collided: boolean;
};