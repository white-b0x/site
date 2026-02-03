'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { HolographicParticles } from './HolographicParticles';
import { PostProcessing } from './PostProcessing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import * as THREE from 'three';

interface SceneProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  mode: number;
  color1: THREE.Color;
  color2: THREE.Color;
}

function Scene({ isMobile, prefersReducedMotion, mode, color1, color2 }: SceneProps) {
  const particleCount = isMobile ? 8000 : 30000;

  return (
    <>
      <fog attach="fog" args={['#030508', 8, 25]} />
      <HolographicParticles
        count={particleCount}
        mode={mode}
        color1={color1}
        color2={color2}
      />
      {!isMobile && !prefersReducedMotion && (
        <PostProcessing bloomIntensity={1.2} enableChromaticAberration />
      )}
    </>
  );
}

export interface CubeSceneProps {
  mode?: number;
  colorPalette?: number;
}

// Color palettes matching the concept
const palettes = [
  { c1: new THREE.Color('#818cf8'), c2: new THREE.Color('#2dd4bf') }, // Indigo / Teal
  { c1: new THREE.Color('#f472b6'), c2: new THREE.Color('#60a5fa') }, // Pink / Blue
  { c1: new THREE.Color('#fb923c'), c2: new THREE.Color('#e11d48') }, // Orange / Rose
];

export default function CubeScene({ mode = 2, colorPalette = 0 }: CubeSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { c1, c2 } = palettes[colorPalette] || palettes[0];

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
        <Scene
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
          mode={mode}
          color1={c1}
          color2={c2}
        />
      </Suspense>
    </Canvas>
  );
}
