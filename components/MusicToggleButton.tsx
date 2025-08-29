import React from 'react';

interface MusicToggleButtonProps {
  isMuted: boolean;
  onToggle: () => void;
  className?: string;
}

const MusicToggleButton: React.FC<MusicToggleButtonProps> = ({ isMuted, onToggle, className }) => {
  const SpeakerOnIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.696 3.696 3.696 9.704 0 13.4l-.707-.707a8.25 8.25 0 000-11.986l-.353-.353a.75.75 0 010-1.06z" />
      <path d="M16.032 7.659a.75.75 0 011.06 0c2.344 2.344 2.344 6.142 0 8.486l-.707-.707a4.75 4.75 0 000-7.072l-.353-.353a.75.75 0 010-1.06z" />
    </svg>
  );

  const SpeakerOffIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM17.72 9.22a.75.75 0 10-1.06-1.06L15.44 9.44l-1.22-1.22a.75.75 0 00-1.06 1.06l1.22 1.22-1.22 1.22a.75.75 0 101.06 1.06l1.22-1.22 1.22 1.22a.75.75 0 001.06-1.06L16.5 11.56l1.22-1.22z" />
    </svg>
  );

  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full bg-slate-900/50 text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 ${className || ''}`}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? SpeakerOffIcon : SpeakerOnIcon}
    </button>
  );
};

export default MusicToggleButton;
