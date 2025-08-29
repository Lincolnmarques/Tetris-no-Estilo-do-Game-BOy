import React from 'react';

const ControlsInfo = () => {
    return React.createElement('div', { className: "w-full p-4 bg-slate-900/50 rounded-lg border-2 border-black/30 text-center text-slate-300" },
        React.createElement('h3', { className: "text-md font-bold mb-3 text-white uppercase tracking-wider" }, "Controls"),
        React.createElement('div', { className: "space-y-2 text-sm" },
            React.createElement('p', null, React.createElement('span', { className: "font-bold text-emerald-400" }, "W / ↑"), " - Rotate"),
            React.createElement('p', null, React.createElement('span', { className: "font-bold text-emerald-400" }, "A / ←"), " - Move Left"),
            React.createElement('p', null, React.createElement('span', { className: "font-bold text-emerald-400" }, "D / →"), " - Move Right"),
            React.createElement('p', null, React.createElement('span', { className: "font-bold text-emerald-400" }, "S / ↓"), " - Soft Drop"),
            React.createElement('p', null, React.createElement('span', { className: "font-bold text-emerald-400" }, "SPACE"), " - Hard Drop"),
            React.createElement('p', null, React.createElement('span', { className: "font-bold text-emerald-400" }, "ENTER"), " - Pause / Resume")
        )
    );
};

export default ControlsInfo;
