'use client';

import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { GlassCube } from './GlassCube';
import { CubeLighting } from './CubeLighting';
import { TopoBackground } from './TopoBackground';
import { ScenePostProcessing } from './ScenePostProcessing';
import type { QualityTier } from '@/hooks/useDeviceCapability';

interface GlassCubeSceneProps {
  quality: QualityTier;
  scrollProgress: number;
}

export function GlassCubeScene({ quality: initialQuality, scrollProgress }: GlassCubeSceneProps) {
  const [degraded, setDegraded] = useState(false);

  // Effective quality: auto-degrade if PerformanceMonitor detects low FPS
  const quality: QualityTier = degraded && initialQuality === 'high' ? 'medium' : initialQuality;
  const showPostProcessing = quality !== 'low' && !degraded;

  const handleDecline = useCallback(() => setDegraded(true), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 50 }}
      dpr={quality === 'low' ? 1 : [1, 2]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      <PerformanceMonitor onDecline={handleDecline} flipflops={3} onFallback={handleDecline}>
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>

      <Suspense fallback={null}>
        <CubeLighting />
        <TopoBackground quality={quality} />
        <GlassCube quality={quality} scrollProgress={scrollProgress} />
        {showPostProcessing && <ScenePostProcessing />}
      </Suspense>
    </Canvas>
  );
}
