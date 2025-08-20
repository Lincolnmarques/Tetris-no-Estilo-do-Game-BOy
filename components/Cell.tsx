
import React from 'react';
import { TETROMINO_CHAR } from '../types';
import { TETROMINOS } from '../services/gameHelpers';

interface CellProps {
  type: TETROMINO_CHAR;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  const color = TETROMINOS[type]?.color || 'transparent';
  const borderClass = type === 0 ? 'border-none' : 'border-b-4 border-r-4 border-black/20';

  return (
    <div
      className={`w-full aspect-square ${borderClass}`}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default React.memo(Cell);
