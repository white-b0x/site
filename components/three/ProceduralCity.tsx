'use client';

import { useMemo } from 'react';
import { Instances, Instance } from '@react-three/drei';

interface Building {
  position: [number, number, number];
  scale: [number, number, number];
}

// Seeded random for deterministic results
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateBuildings(): Building[] {
  const result: Building[] = [];
  const gridSize = 5;
  const spacing = 0.15;
  let seed = 0;

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      if (seededRandom(seed++) > 0.3) {
        const height = 0.1 + seededRandom(seed++) * 0.4;
        result.push({
          position: [x * spacing, height / 2 - 0.5, z * spacing],
          scale: [0.08, height, 0.08],
        });
      }
    }
  }
  return result;
}

export function ProceduralCity() {
  const buildings = useMemo(() => generateBuildings(), []);

  return (
    <Instances limit={150}>
      <boxGeometry />
      <meshStandardMaterial
        color="#0ea5e9"
        emissive="#0ea5e9"
        emissiveIntensity={0.3}
        toneMapped={false}
      />
      {buildings.map((building, i) => (
        <Instance
          key={i}
          position={building.position}
          scale={building.scale}
        />
      ))}
    </Instances>
  );
}
