'use client';

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface ScenePostProcessingProps {
  degraded?: boolean;
}

export function ScenePostProcessing({ degraded = false }: ScenePostProcessingProps) {
  if (degraded) {
    return (
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          intensity={1.0}
          mipmapBlur
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      {/* Bloom: warm blob emissive glow */}
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        intensity={1.5}
        mipmapBlur
      />

      {/* Chromatic Aberration: prismatic edges */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0015, 0.0015)}
        radialModulation
        modulationOffset={0.5}
      />

      {/* Subtle film grain */}
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
      />

      {/* Vignette: draws eye to center */}
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={0.5}
      />
    </EffectComposer>
  );
}
