'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uNoiseScale;
  uniform float uNoiseStrength;

  attribute float aIndex;
  attribute vec3 aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;
    float t = uTime * 0.15;

    // Add noise displacement for organic movement
    vec3 noiseInput = pos * uNoiseScale + t;
    vec3 displacement = vec3(
      snoise(noiseInput),
      snoise(noiseInput + 100.0),
      snoise(noiseInput + 200.0)
    ) * uNoiseStrength;

    pos += displacement;

    // Subtle breathing effect
    float breathe = sin(uTime * 0.5 + aIndex * 0.01) * 0.1 + 1.0;
    pos *= breathe;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (2.0 + aRandom.y * 1.5) * (25.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Color based on position - orange to cyan gradient
    float colorMix = (pos.x + pos.y + pos.z) / 6.0 + 0.5;
    vec3 orange = vec3(0.976, 0.451, 0.086); // #f97316
    vec3 cyan = vec3(0.220, 0.741, 0.973);   // #38bdf8
    vColor = mix(orange, cyan, colorMix);

    // Alpha based on depth and randomness
    float depthFade = smoothstep(50.0, 5.0, -mvPosition.z);
    vAlpha = depthFade * (0.3 + aRandom.z * 0.5);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft circular particle with glow
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.5);

    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`;

interface HolographicParticlesProps {
  count?: number;
  size?: number;
  noiseScale?: number;
  noiseStrength?: number;
}

// Generate cube lattice positions deterministically
function generateCubeLattice(count: number, size: number): {
  positions: Float32Array;
  indices: Float32Array;
  randoms: Float32Array;
} {
  const positions = new Float32Array(count * 3);
  const indices = new Float32Array(count);
  const randoms = new Float32Array(count * 3);

  // Calculate grid dimensions for cube
  const gridSize = Math.ceil(Math.pow(count, 1/3));
  const spacing = size / gridSize;
  const halfSize = size / 2;

  let idx = 0;
  for (let x = 0; x < gridSize && idx < count; x++) {
    for (let y = 0; y < gridSize && idx < count; y++) {
      for (let z = 0; z < gridSize && idx < count; z++) {
        positions[idx * 3] = (x * spacing) - halfSize + spacing/2;
        positions[idx * 3 + 1] = (y * spacing) - halfSize + spacing/2;
        positions[idx * 3 + 2] = (z * spacing) - halfSize + spacing/2;

        indices[idx] = idx;

        // Seeded random for deterministic results
        const seed = idx * 12345;
        randoms[idx * 3] = (Math.sin(seed) * 10000) % 1;
        randoms[idx * 3 + 1] = (Math.sin(seed + 1) * 10000) % 1;
        randoms[idx * 3 + 2] = (Math.sin(seed + 2) * 10000) % 1;

        idx++;
      }
    }
  }

  return { positions, indices, randoms };
}

export function HolographicParticles({
  count = 8000,
  size = 4,
  noiseScale = 0.3,
  noiseStrength = 0.4,
}: HolographicParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, indices, randoms } = useMemo(
    () => generateCubeLattice(count, size),
    [count, size]
  );

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uNoiseScale: { value: noiseScale },
    uNoiseStrength: { value: noiseStrength },
  }), [noiseScale, noiseStrength]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aIndex" args={[indices, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
