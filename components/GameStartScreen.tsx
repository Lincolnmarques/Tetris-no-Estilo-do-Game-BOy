import React from 'react';
import StartButton from './StartButton';

interface GameStartScreenProps {
  onStartGame: () => void;
}

const GameStartScreen: React.FC<GameStartScreenProps> = ({ onStartGame }) => (
  <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center text-center text-slate-900 p-4">
    <div className="mb-8">
      <div className="font-bold text-4xl [text-shadow:_3px_3px_0_rgb(0_0_0_/_0.3)]">
        <span className="text-[#f8b800]">T</span>
        <span className="text-[#d82800]">E</span>
        <span className="text-[#0058f8]">T</span>
        <span className="text-[#389800]">R</span>
        <span className="text-[#a800f8]">I</span>
        <span className="text-[#d82800]">S</span>
      </div>
      <p className="text-sm mt-2 text-slate-700">Game Boy Edition</p>
    </div>
    <StartButton onClick={onStartGame} />
  </div>
);

export default GameStartScreen;
