
import React from 'react';
import { TETROMINO_CHAR, STAGE_CELL } from '../types';
import { TETROMINOS } from '../services/gameHelpers';

interface CellProps {
  type: TETROMINO_CHAR;
  status: STAGE_CELL[1];
}

const Cell: React.FC<CellProps> = ({ type, status }) => {
  const color = TETROMINOS[type]?.color || 'transparent';
  const borderClass = type === 0 ? 'border-none' : 'border-b-4 border-r-4 border-black/20';
  const statusClass = status === 'dissolving' ? 'dissolving' : '';

  return (
    <div
      className={`w-full aspect-square ${borderClass} ${statusClass}`}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default React.memo(Cell);