'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { TranslucentCube } from './TranslucentCube';
import { FloatingParticles } from './FloatingParticles';
import { PostProcessing } from './PostProcessing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function CubeScene() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={isMobile ? 1 : [1, 2]}
      gl={{ antialias: !isMobile }}
    >
      <color attach="background" args={['#030508']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#f97316" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#38bdf8" intensity={0.5} />
      <Suspense fallback={null}>
        <TranslucentCube animate={!prefersReducedMotion} />
        <FloatingParticles count={isMobile ? 200 : 500} />
        {!isMobile && <PostProcessing />}
      </Suspense>
    </Canvas>
  );
}
