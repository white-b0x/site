'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import type { Mesh } from 'three';
import { ProceduralCity } from './ProceduralCity';

interface TranslucentCubeProps {
  animate?: boolean;
}

export function TranslucentCube({ animate = true }: TranslucentCubeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current && animate) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.2}
          transmission={0.95}
          roughness={0.1}
          ior={1.5}
        />
      </mesh>
      <ProceduralCity />
    </group>
  );
}
