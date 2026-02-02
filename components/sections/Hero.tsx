'use client';

import dynamic from 'next/dynamic';

const CubeScene = dynamic(() => import('@/components/three/CubeScene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-[#030508]" />,
});

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas */}
      <CubeScene />

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

          {/* Subtitle */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono text-white/50 tracking-wider uppercase">
            <span className="text-white/70">A Web3 Development Studio</span>
            <span className="w-px h-3 bg-white/10 hidden md:block" />
            <span className="opacity-60 hidden md:block">30K NODES</span>
          </div>
        </div>
      </header>
    </section>
  );
}
