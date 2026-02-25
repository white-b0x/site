'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

export function CubeLighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!keyLightRef.current) return;
    // Subtle light follow on mouse — creates dynamic highlights on glass
    keyLightRef.current.position.x = 3 + pointer.x * 1.2;
    keyLightRef.current.position.y = 5 + pointer.y * 0.8;
  });

  return (
    <>
      {/* Warm key light — from above-right, golden highlights on glass */}
      <directionalLight
        ref={keyLightRef}
        position={[3, 5, 2]}
        intensity={2.0}
        color="#ffa040"
      />

      {/* Cool fill light — from below-left, blue contrast against warm blobs */}
      <directionalLight
        position={[-2, -3, -1]}
        intensity={0.4}
        color="#6070a0"
      />

      {/* Rim light — from behind, warm edge highlights */}
      <pointLight
        position={[0, 0, -4]}
        intensity={1.2}
        color="#ffd4a0"
        distance={10}
        decay={2}
      />

      {/* Subtle ambient fill */}
      <ambientLight intensity={0.15} color="#1a1a2e" />

      {/* Spot from above for bright highlight on top face */}
      <spotLight
        position={[0, 6, 0]}
        intensity={0.6}
        angle={0.3}
        penumbra={0.8}
        color="#fff5e6"
      />

      {/* Studio environment for chrome reflections */}
      <Environment preset="studio" environmentIntensity={0.4} />

      {/* Depth fog */}
      <fog attach="fog" args={['#030508', 10, 40]} />
    </>
  );
}
