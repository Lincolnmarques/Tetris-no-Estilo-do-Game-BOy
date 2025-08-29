import React from 'react';

const PauseScreen = ({ onResume }) => React.createElement(
  'div',
  { className: "absolute z-20 w-full h-full flex flex-col items-center justify-center text-center text-slate-900 p-4" },
  React.createElement('h2', { className: "text-2xl mb-4 font-bold [text-shadow:_2px_2px_0_rgb(0_0_0_/_0.2)] text-white" }, "Paused"),
  React.createElement('button',
    {
      className: "px-6 py-3 text-lg text-white bg-amber-500 rounded-lg border-2 border-black/50 shadow-md hover:bg-amber-600 active:bg-amber-700 transition-colors duration-200",
      onClick: onResume,
      'aria-label': "Resume Game",
    },
    "Resume"
  )
);

export default PauseScreen;
