import React from 'react';
import Cell from './Cell.js';

const Stage = ({ stage }) => {
  return React.createElement(
    'div',
    {
      className: "grid gap-px bg-black/50 p-1",
      style: {
        gridTemplateRows: `repeat(${stage.length}, 1fr)`,
        gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`,
        width: '100%',
        maxHeight: '100%',
        aspectRatio: `${stage[0].length} / ${stage.length}`,
      },
    },
    stage.map((row) =>
      row.map((cell, x) => React.createElement(Cell, { key: x, type: cell[0], status: cell[1] }))
    )
  );
};

export default Stage;
