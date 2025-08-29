import React from 'react';
import { TETROMINOS } from '../services/gameHelpers.js';

const Cell = ({ type, status }) => {
  const color = TETROMINOS[type]?.color || 'transparent';
  const borderClass = type === 0 ? 'border-none' : 'border-b-4 border-r-4 border-black/20';
  const statusClass = status === 'dissolving' ? 'dissolving' : '';

  return React.createElement('div', {
    className: `w-full aspect-square ${borderClass} ${statusClass}`,
    style: { backgroundColor: color },
  });
};

export default React.memo(Cell);
