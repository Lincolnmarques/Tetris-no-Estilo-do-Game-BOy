
import { STAGE, PLAYER, TETROMINO_CHAR } from '../types.ts';

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = (): STAGE =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

export const TETROMINOS: {
  [key: string]: { shape: TETROMINO_CHAR[][]; color: string };
} = {
  '0': { shape: [[0]], color: 'transparent' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: 'rgb(0, 184, 212)', // GBC Cyan
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: 'rgb(0, 88, 248)', // GBC Blue
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: 'rgb(248, 184, 0)', // GBC Orange
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: 'rgb(248, 248, 0)', // GBC Yellow
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: 'rgb(56, 152, 0)', // GBC Green
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0, 'T', 0],
      [0, 0, 0],
    ],
    color: 'rgb(168, 0, 248)', // GBC Purple
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: 'rgb(216, 40, 0)', // GBC Red
  },
};

export const randomTetromino = (): { shape: TETROMINO_CHAR[][]; color: string } => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const checkCollision = (
  player: PLAYER,
  stage: STAGE,
  { x: moveX, y: moveY }: { x: number; y: number }
): boolean => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] === 'merged'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};