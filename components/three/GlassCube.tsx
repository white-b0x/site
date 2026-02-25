'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { QualityTier } from '@/hooks/useDeviceCapability';

interface GlassCubeProps {
  quality: QualityTier;
  scrollProgress?: number;
}

export function GlassCube({ scrollProgress = 0 }: GlassCubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven transforms
  const heroProgress = Math.min(scrollProgress / 0.3, 1);
  const targetScale = 1 - heroProgress * 0.35;
  const targetY = heroProgress * 1.5;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    if (prefersReducedMotion) {
      groupRef.current.position.y = targetY;
      groupRef.current.scale.setScalar(targetScale);
      return;
    }

    // Auto-rotation on all axes
    const baseSpeed = 0.08 + heroProgress * 0.04;
    groupRef.current.rotation.x += delta * baseSpeed * 0.7;
    groupRef.current.rotation.y += delta * baseSpeed;
    groupRef.current.rotation.z += delta * baseSpeed * 0.4;

    // Breathing scale + scroll scale
    const breathe = targetScale + Math.sin(t * 0.6) * 0.015;
    groupRef.current.scale.setScalar(breathe);

    // Floating bob + scroll Y offset
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.1 + targetY;
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[3.5, 3.5, 3.5]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#111111"
          metalness={1}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </RoundedBox>
    </group>
  );
}
