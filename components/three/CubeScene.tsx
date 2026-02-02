'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { HolographicParticles } from './HolographicParticles';
import { PostProcessing } from './PostProcessing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import * as THREE from 'three';

function Scene({ isMobile, prefersReducedMotion }: { isMobile: boolean; prefersReducedMotion: boolean }) {
  const particleCount = isMobile ? 2000 : 8000;

  return (
    <>
      <fog attach="fog" args={['#030508', 8, 25]} />
      <HolographicParticles
        count={particleCount}
        size={4}
        noiseScale={0.3}
        noiseStrength={prefersReducedMotion ? 0.1 : 0.4}
      />
      {!isMobile && !prefersReducedMotion && (
        <PostProcessing bloomIntensity={1.2} enableChromaticAberration />
      )}
    </>
  );
}

export default function CubeScene() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
      dpr={isMobile ? 1 : [1, 2]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.CineonToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <color attach="background" args={['#030508']} />
      <Suspense fallback={null}>
        <Scene isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
      </Suspense>
    </Canvas>
  );
}
