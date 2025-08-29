import React from 'react';

const Display = ({ text, value }) => React.createElement(
  'div',
  { className: "flex flex-col items-center justify-center p-2 bg-indigo-500 text-indigo-100 w-full rounded-md border-2 border-black/20 shadow-md" },
  React.createElement('div', { className: "text-xs uppercase tracking-wider" }, text),
  React.createElement('div', { className: "text-lg font-bold" }, value)
);

export default Display;
