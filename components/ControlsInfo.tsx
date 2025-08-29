import React from 'react';

const ControlsInfo: React.FC = () => {
    return (
        <div className="w-full p-4 bg-slate-900/50 rounded-lg border-2 border-black/30 text-center text-slate-300">
            <h3 className="text-md font-bold mb-3 text-white uppercase tracking-wider">Controls</h3>
            <div className="space-y-2 text-sm">
                <p><span className="font-bold text-emerald-400">W / ↑</span> - Rotate</p>
                <p><span className="font-bold text-emerald-400">A / ←</span> - Move Left</p>
                <p><span className="font-bold text-emerald-400">D / →</span> - Move Right</p>
                <p><span className="font-bold text-emerald-400">S / ↓</span> - Soft Drop</p>
                <p><span className="font-bold text-emerald-400">SPACE</span> - Hard Drop</p>
                <p><span className="font-bold text-emerald-400">ENTER</span> - Pause / Resume</p>
            </div>
        </div>
    );
};

export default ControlsInfo;