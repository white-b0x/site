'use client';

import dynamic from 'next/dynamic';

const CubeScene = dynamic(() => import('@/components/three/CubeScene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-[#030508]" />,
});

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <CubeScene />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            White B0x
          </h1>
          <p className="mt-4 text-lg text-neutral-400">
            A Web3 Development Studio
          </p>
        </div>
      </div>
    </section>
  );
}
