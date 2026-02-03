'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Particle count passed as a define to shader
const createVertexShader = (particleCount: number) => `
  uniform float uTime;
  uniform float uMode;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  attribute float aIndex;
  attribute vec3 aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  #define PARTICLE_COUNT ${particleCount}.0

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

  // Shape functions
  vec3 getPosSphere(float idx) {
    float phi = acos(-1.0 + (2.0 * idx) / PARTICLE_COUNT);
    float theta = sqrt(PARTICLE_COUNT * 3.1415926) * phi;
    float r = 3.0 + aRandom.x * 0.5;
    return vec3(r * sin(phi) * cos(theta), r * sin(phi) * sin(theta), r * cos(phi));
  }

  vec3 getPosTorus(float idx) {
    float t = idx * 0.1;
    float r = 2.5 + aRandom.y * 0.8;
    float tube = 0.8 + aRandom.x * 0.5;
    float angle = (idx / PARTICLE_COUNT) * 6.28 * 15.0;
    return vec3(
      (r + tube * cos(angle)) * cos(t),
      (r + tube * cos(angle)) * sin(t),
      tube * sin(angle)
    );
  }

  vec3 getPosLattice(float idx) {
    float size = 4.0;
    float step = pow(PARTICLE_COUNT, 1.0/3.0);
    float x = mod(idx, step);
    float y = mod(floor(idx/step), step);
    float z = floor(idx/(step*step));
    return (vec3(x, y, z) / step - 0.5) * size;
  }

  vec3 getPosVortex(float idx) {
    float r = (idx / PARTICLE_COUNT) * 4.0;
    float ang = r * 4.0;
    float h = (aRandom.x - 0.5) * 3.0 * (1.0 - r/5.0);
    return vec3(r * cos(ang), h, r * sin(ang));
  }

  void main() {
    float t = uTime * 0.15;
    float idx = aIndex;

    // Get positions for all shapes
    vec3 pSphere = getPosSphere(idx);
    vec3 pTorus = getPosTorus(idx);
    vec3 pLattice = getPosLattice(idx);
    vec3 pVortex = getPosVortex(idx);

    // Add noise for organic movement
    vec3 noiseOffset = vec3(
      snoise(vec3(idx * 0.01, t * 0.2, 0.0)),
      snoise(vec3(idx * 0.01, 0.0, t * 0.2)),
      snoise(vec3(0.0, idx * 0.01, t * 0.2))
    );

    pSphere += noiseOffset * 1.0;
    pTorus += noiseOffset * 0.5;
    pLattice += noiseOffset * 0.3;
    pVortex += noiseOffset * 0.5;

    // Animate torus rotation
    float c = cos(t * 0.3);
    float s = sin(t * 0.3);
    pTorus.xy = mat2(c, -s, s, c) * pTorus.xy;
    pTorus.xz = mat2(c, -s, s, c) * pTorus.xz;

    // Animate vortex spin
    float va = t * 1.5 - length(pVortex.xz) * 0.3;
    float vc = cos(va);
    float vs = sin(va);
    pVortex.xz = mat2(vc, -vs, vs, vc) * pVortex.xz;

    // Interpolate between shapes based on mode
    vec3 pos;
    float m = uMode;
    if (m <= 0.0) pos = pSphere;
    else if (m <= 1.0) pos = mix(pSphere, pTorus, m);
    else if (m <= 2.0) pos = mix(pTorus, pLattice, m - 1.0);
    else if (m <= 3.0) pos = mix(pLattice, pVortex, m - 2.0);
    else pos = pVortex;

    // Subtle breathing
    float breathe = sin(uTime * 0.5 + idx * 0.001) * 0.05 + 1.0;
    pos *= breathe;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.0 + aRandom.y * 0.8) * (18.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Color gradient based on position
    float colorMix = (pos.x + pos.y + pos.z) / 6.0 + 0.5;
    vColor = mix(uColor1, uColor2, smoothstep(0.0, 1.0, colorMix));

    // Alpha based on depth
    float depthFade = smoothstep(50.0, 5.0, -mvPosition.z);
    vAlpha = depthFade * (0.25 + aRandom.z * 0.5);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.5);

    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`;

export interface HolographicParticlesProps {
  count?: number;
  mode?: number;
  color1?: THREE.Color;
  color2?: THREE.Color;
}

// Generate particle data
function generateParticleData(count: number): {
  positions: Float32Array;
  indices: Float32Array;
  randoms: Float32Array;
} {
  const positions = new Float32Array(count * 3);
  const indices = new Float32Array(count);
  const randoms = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Initial positions (will be overridden by shader)
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;

    indices[i] = i;

    // Seeded random
    const seed = i * 12345;
    randoms[i * 3] = Math.abs((Math.sin(seed) * 10000) % 1);
    randoms[i * 3 + 1] = Math.abs((Math.sin(seed + 1) * 10000) % 1);
    randoms[i * 3 + 2] = Math.abs((Math.sin(seed + 2) * 10000) % 1);
  }

  return { positions, indices, randoms };
}

// Default colors
const defaultColor1 = new THREE.Color('#818cf8'); // Indigo
const defaultColor2 = new THREE.Color('#2dd4bf'); // Teal

// Create uniforms object - stable reference, values mutated in useFrame
function createUniforms(mode: number, color1: THREE.Color, color2: THREE.Color) {
  return {
    uTime: { value: 0 },
    uMode: { value: mode },
    uColor1: { value: color1.clone() },
    uColor2: { value: color2.clone() },
  };
}

export function HolographicParticles({
  count = 30000,
  mode = 2, // Default to Lattice (cube)
  color1 = defaultColor1,
  color2 = defaultColor2,
}: HolographicParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentMode = useRef(mode);

  const { positions, indices, randoms } = useMemo(
    () => generateParticleData(count),
    [count]
  );

  const vertexShader = useMemo(() => createVertexShader(count), [count]);

  // Create uniforms once, stable reference
  const uniforms = useMemo(
    () => createUniforms(mode, color1, color2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count] // Only recreate when count changes (shader recompiles)
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mode transition
    currentMode.current += (mode - currentMode.current) * 0.05;
    uniforms.uMode.value = currentMode.current;

    // Smooth color transition
    uniforms.uColor1.value.lerp(color1, 0.05);
    uniforms.uColor2.value.lerp(color2, 0.05);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
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
