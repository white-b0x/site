'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityTier } from '@/hooks/useDeviceCapability';

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Layer 1: broad rolling hills
    float wave1 = sin(pos.x * 0.3 + uTime * 0.15) * cos(pos.y * 0.25 + uTime * 0.1) * 1.8;
    // Layer 2: medium ridges
    float wave2 = sin(pos.x * 0.7 + uTime * 0.08) * cos(pos.y * 0.6 - uTime * 0.12) * 0.8;
    // Layer 3: fine detail
    float wave3 = sin(pos.x * 1.5 - uTime * 0.2) * cos(pos.y * 1.2 + uTime * 0.15) * 0.3;

    float elevation = wave1 + wave2 + wave3;
    pos.z = elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vElevation;

  // HSL to RGB conversion
  vec3 hsl2rgb(float h, float s, float l) {
    vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
  }

  void main() {
    // Distance from center for edge fade
    vec2 centered = vUv - 0.5;
    float dist = length(centered) * 2.0;
    float fade = 1.0 - smoothstep(0.3, 1.0, dist);

    // Slow hue cycling — full spectrum in ~20s
    float hue = fract(uTime * 0.05 + vElevation * 0.05);
    float saturation = 0.7;
    float lightness = 0.5 + vElevation * 0.05;

    vec3 color = hsl2rgb(hue, saturation, lightness);
    float alpha = uOpacity * fade;

    gl_FragColor = vec4(color, alpha);
  }
`;

interface TopoBackgroundProps {
  quality: QualityTier;
}

export function TopoBackground({ quality }: TopoBackgroundProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const segments = quality === 'high' ? 80 : quality === 'medium' ? 60 : 40;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0.20 },
    }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -15]}>
      <planeGeometry args={[40, 40, segments, segments]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
