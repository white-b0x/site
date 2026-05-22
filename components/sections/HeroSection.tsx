'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

const MARK_PATHS = [
  'M8 22 L8 8 L22 8',    // top-left
  'M42 8 L56 8 L56 22',  // top-right
  'M56 42 L56 56 L42 56', // bottom-right
  'M22 56 L8 56 L8 42',   // bottom-left
];

function RegistrationMark() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className="mb-6 h-12 w-12 text-white/80 md:mb-8 md:h-16 md:w-16"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: reduced ? 0 : 0.15 }}
    >
      {MARK_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
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
    <section className="relative flex min-h-[75vh] flex-col items-center justify-center pointer-events-none md:min-h-screen">
      <div className="flex flex-col items-center text-center">
        <RegistrationMark />
        <motion.h1
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
