
import React from 'react';
import Cell from './Cell.tsx';
import { STAGE } from '../types.ts';

interface StageProps {
  stage: STAGE;
}

const Stage: React.FC<StageProps> = ({ stage }) => {
  return (
    <div 
      className="grid gap-px bg-black/50 p-1"
      style={{
        gridTemplateRows: `repeat(${stage.length}, 1fr)`,
        gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`,
        width: '100%',
        maxHeight: '100%',
        aspectRatio: `${stage[0].length} / ${stage.length}`,
      }}
    >
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} status={cell[1]} />)
      )}
    </div>
  );
};

export default Stage;