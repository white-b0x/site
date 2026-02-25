'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { QualityTier } from '@/hooks/useDeviceCapability';

const gridVertexShader = /* glsl */ `
  varying vec3 vPosition;

  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uReducedMotion;
  varying vec3 vPosition;

  vec3 hsl2rgb(float h, float s, float l) {
    vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
  }

  void main() {
    // Diagonal spatial offset for rainbow wave across all faces
    float spatialOffset = dot(vPosition, vec3(0.15, 0.12, 0.1));

    // Hue cycling: full spectrum in ~12.5s, frozen at cyan when reduced motion
    float hue = mix(
      fract(uTime * 0.08 + spatialOffset),
      0.55,
      uReducedMotion
    );

    // Breathing intensity: ~5.2s pulse, constant when reduced motion
    float breathe = mix(
      0.5 + 0.5 * sin(uTime * 0.4),
      0.6,
      uReducedMotion
    );

    // Wider range: dim at 0.05, bright at 1.0
    float intensity = 0.05 + breathe * 0.95;

    vec3 color = hsl2rgb(hue, 0.85, 0.55);

    // Higher HDR peak for stronger bloom pulse
    vec3 finalColor = color * intensity * 3.5;

    gl_FragColor = vec4(finalColor, 0.85);
  }
`;

interface GridOverlayProps {
  prefersReducedMotion: boolean;
}

function GridOverlay({ prefersReducedMotion }: GridOverlayProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const s = 3.52; // slightly larger than cube to avoid z-fighting
    const h = s / 2;
    const positions: number[] = [];

    // For each face, draw 2 horizontal + 2 vertical inner lines (3x3 grid)
    const offsets = [-s / 6, s / 6]; // 1/3 and 2/3 positions

    // Front & back faces (Z normal)
    for (const z of [-h, h]) {
      for (const o of offsets) {
        positions.push(-h, o, z, h, o, z); // horizontal
        positions.push(o, -h, z, o, h, z); // vertical
      }
    }
    // Left & right faces (X normal)
    for (const x of [-h, h]) {
      for (const o of offsets) {
        positions.push(x, o, -h, x, o, h); // horizontal
        positions.push(x, -h, o, x, h, o); // vertical
      }
    }
    // Top & bottom faces (Y normal)
    for (const y of [-h, h]) {
      for (const o of offsets) {
        positions.push(-h, y, o, h, y, o); // horizontal
        positions.push(o, y, -h, o, y, h); // vertical
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReducedMotion: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uReducedMotion.value = prefersReducedMotion ? 1.0 : 0.0;
    }
  });

  return (
    <lineSegments geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
}

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
      {/* Solid chrome faces */}
      <RoundedBox args={[3.5, 3.5, 3.5]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#111111"
          metalness={1}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </RoundedBox>
      {/* Grid lines overlay — clean edges only (no diagonals) */}
      <GridOverlay prefersReducedMotion={prefersReducedMotion} />
    </group>
  );
}
