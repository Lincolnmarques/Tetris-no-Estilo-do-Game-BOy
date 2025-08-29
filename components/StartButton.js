import React from 'react';

const StartButton = ({ onClick }) => React.createElement(
  'button',
  {
    className: "px-6 py-3 text-lg text-white bg-emerald-500 rounded-lg border-2 border-black/50 shadow-md hover:bg-emerald-600 active:bg-emerald-700 transition-colors duration-200",
    onClick: onClick,
  },
  'Start Game'
);

export default StartButton;
