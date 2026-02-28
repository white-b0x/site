'use client';

import { motion } from 'framer-motion';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[75vh] md:min-h-screen flex-col items-center justify-center pointer-events-none">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="hero-text text-3xl font-extralight tracking-wider text-white/80 md:text-5xl lg:text-6xl">
          whiteb0x
        </h1>
        <motion.p
          className="mt-4 text-sm font-extralight tracking-[0.3em] text-white/30 uppercase md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          A Development Studio
        </motion.p>
      </motion.div>
      <ScrollIndicator />
    </section>
  );
}
