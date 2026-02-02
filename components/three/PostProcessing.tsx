'use client';

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={0.5}
      />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  );
}
