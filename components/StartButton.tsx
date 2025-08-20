import React from 'react';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => (
  <button
    className="px-6 py-3 text-lg text-white bg-emerald-500 rounded-lg border-2 border-black/50 shadow-md hover:bg-emerald-600 active:bg-emerald-700 transition-colors duration-200"
    onClick={onClick}
  >
    Start Game
  </button>
);

export default StartButton;