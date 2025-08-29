import React from 'react';
import StartButton from './StartButton.js';

const GameStartScreen = ({ onStartGame }) => React.createElement(
  'div',
  { className: "absolute z-10 w-full h-full flex flex-col items-center justify-center text-center text-slate-900 p-4" },
  React.createElement('div', { className: "mb-8" },
    React.createElement('div', { className: "font-bold text-4xl [text-shadow:_3px_3px_0_rgb(0_0_0_/_0.3)]" },
      React.createElement('span', { className: "text-[#f8b800]" }, "T"),
      React.createElement('span', { className: "text-[#d82800]" }, "E"),
      React.createElement('span', { className: "text-[#0058f8]" }, "T"),
      React.createElement('span', { className: "text-[#389800]" }, "R"),
      React.createElement('span', { className: "text-[#a800f8]" }, "I"),
      React.createElement('span', { className: "text-[#d82800]" }, "S")
    ),
    React.createElement('p', { className: "text-sm mt-2 text-slate-700" }, "Game Boy Edition")
  ),
  React.createElement(StartButton, { onClick: onStartGame })
);

export default GameStartScreen;
