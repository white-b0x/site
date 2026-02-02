'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
}

// Seeded random for deterministic results
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (seededRandom(i * 3) - 0.5) * 10;
    positions[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 10;
    positions[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 10;
  }
  return positions;
}

export function FloatingParticles({ count = 500 }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => generateParticles(count), [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#f97316"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
