'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

// Inner mark: 64×64 grid
const MARK_PATHS = [
  'M8 22 L8 8 L22 8',     // top-left
  'M42 8 L56 8 L56 22',   // top-right
  'M56 42 L56 56 L42 56', // bottom-right
  'M22 56 L8 56 L8 42',   // bottom-left
];

// Middle tier: aureate, corners 8px outward from inner corners
const MIDDLE_PATHS = [
  'M24 0 L0 0 L0 24',
  'M40 0 L64 0 L64 24',
  'M64 40 L64 64 L40 64',
  'M24 64 L0 64 L0 40',
];

// Outer tier: dark gray, corners 16px outward — quiet structural frame
const OUTER_PATHS = [
  'M20 -8 L-8 -8 L-8 20',
  'M44 -8 L72 -8 L72 20',
  'M72 44 L72 72 L44 72',
  'M20 72 L-8 72 L-8 44',
];

function RegistrationMark() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      // viewBox extends 20px beyond the 64×64 mark on all sides
      viewBox="-20 -20 104 104"
      className="mb-6 h-16 w-16 text-white/80 md:mb-8 md:h-20 md:w-20"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: reduced ? 0 : 0.15 }}
    >
      {/* Outer tier — dark gray structural frame, static */}
      <g
        stroke="rgba(26,31,40,0.65)"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      >
        {OUTER_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* Middle tier — aureate, fades in after inner mark finishes drawing */}
      <motion.g
        stroke="rgba(212,165,116,0.35)"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduced ? 0 : 1.3 }}
      >
        {MIDDLE_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </motion.g>

      {/* Inner tier — white, animated pathLength draw */}
      {MARK_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : 0.15 + i * 0.08,
            ease: [0.25, 1, 0.5, 1],
          }}
        />
      ))}
    </motion.svg>
  );
}

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative flex min-h-[75vh] flex-col items-center justify-center pointer-events-none md:min-h-screen">
      <div className="flex flex-col items-center text-center">
        <RegistrationMark />
        <motion.h1
          id="hero-heading"
          className="hero-text text-3xl font-extralight tracking-wider text-white/80 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          whiteb0x
        </motion.h1>
        <motion.p
          className="mt-4 text-sm font-extralight tracking-[0.3em] text-white/30 uppercase md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          A Development Studio
        </motion.p>
      </div>
      <ScrollIndicator />
    </section>
  );
}
