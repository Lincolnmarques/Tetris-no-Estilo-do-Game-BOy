import React from 'react';

interface DisplayProps {
  text: string;
  value: string | number;
}

const Display: React.FC<DisplayProps> = ({ text, value }) => (
  <div className="flex flex-col items-center justify-center p-2 bg-indigo-500 text-indigo-100 w-full rounded-md border-2 border-black/20 shadow-md">
    <div className="text-xs uppercase tracking-wider">{text}</div>
    <div className="text-lg font-bold">{value}</div>
  </div>
);

export default Display;