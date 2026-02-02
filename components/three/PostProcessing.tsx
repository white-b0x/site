'use client';

import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface PostProcessingProps {
  bloomIntensity?: number;
  enableChromaticAberration?: boolean;
}

export function PostProcessing({
  bloomIntensity = 1.2,
  enableChromaticAberration = true,
}: PostProcessingProps) {
  const caOffset = enableChromaticAberration ? 0.002 : 0;

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        intensity={bloomIntensity}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(caOffset, caOffset)}
        radialModulation
        modulationOffset={0.5}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.02}
      />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
    </EffectComposer>
  );
}
