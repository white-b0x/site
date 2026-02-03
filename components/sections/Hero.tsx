'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const CubeScene = dynamic(() => import('@/components/three/CubeScene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-[#030508]" />,
});

const modes = [
  { name: 'Nebula', label: 'NEBULA CLOUD' },
  { name: 'Torus', label: 'QUANTUM TORUS' },
  { name: 'Lattice', label: 'CYBER LATTICE' },
  { name: 'Vortex', label: 'WARP VORTEX' },
];

export function Hero() {
  const [mode, setMode] = useState(2); // Default: Lattice (cube)
  const [colorPalette, setColorPalette] = useState(0);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas */}
      <CubeScene mode={mode} colorPalette={colorPalette} />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.06) 100%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 120%)',
        }}
      />

      {/* Header HUD - Top Left */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-8 z-20 pointer-events-none">
        <div className="flex flex-col gap-2">
          {/* Brand with status indicator */}
          <div className="flex items-center gap-3">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
              <div className="absolute inset-0 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
            <h1 className="text-xs md:text-sm font-medium tracking-tight uppercase text-white/90">
              White <span className="opacity-40">B0x</span>
            </h1>
          </div>

          {/* Subtitle with mode name */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono text-white/50 tracking-wider uppercase">
            <span className="text-white/70">{modes[mode].label}</span>
            <span className="w-px h-3 bg-white/10 hidden md:block" />
            <span className="opacity-60 hidden md:block">30K NODES</span>
          </div>
        </div>
      </header>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
        {/* Mode Selector - Bottom Left */}
        <div className="glass p-3 rounded-xl pointer-events-auto w-full md:w-64 max-w-[300px]">
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">Simulation</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {modes.map((m, idx) => (
              <button
                key={m.name}
                onClick={() => setMode(idx)}
                className={`group relative flex items-center justify-between px-2.5 py-2 rounded-lg transition-all border text-left ${
                  mode === idx
                    ? 'bg-white/10 border-white/10'
                    : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <span className={`text-[10px] font-medium transition-colors ${
                  mode === idx ? 'text-white' : 'text-white/60 group-hover:text-white'
                }`}>
                  {m.name}
                </span>
                <span className="text-[9px] font-mono text-white/20">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette & Info - Bottom Right */}
        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 pointer-events-auto">
          {/* Palette Switcher */}
          <div className="glass p-1.5 rounded-full flex md:flex-col flex-row gap-2">
            <button
              onClick={() => setColorPalette(0)}
              className={`w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 ring-1 ring-white/10 hover:scale-110 transition-transform duration-300 ${
                colorPalette === 0 ? 'ring-2 ring-white/40' : ''
              }`}
              aria-label="Indigo/Teal palette"
            />
            <button
              onClick={() => setColorPalette(1)}
              className={`w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 ring-1 ring-white/10 hover:scale-110 transition-transform duration-300 ${
                colorPalette === 1 ? 'ring-2 ring-white/40' : ''
              }`}
              aria-label="Pink/Blue palette"
            />
            <button
              onClick={() => setColorPalette(2)}
              className={`w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-rose-600 ring-1 ring-white/10 hover:scale-110 transition-transform duration-300 ${
                colorPalette === 2 ? 'ring-2 ring-white/40' : ''
              }`}
              aria-label="Orange/Rose palette"
            />
          </div>

          {/* Footer text */}
          <div className="hidden md:block text-[9px] font-mono text-right text-white/20 leading-tight">
            <p>White B0x Inc.</p>
            <p className="mt-0.5">A Web3 Development Studio</p>
          </div>
        </div>
      </div>
    </section>
  );
}
