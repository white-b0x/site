'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/70 via-[#030508]/90 to-[#030508]/70" />
      <div className="relative mx-auto max-w-3xl text-center">
        <GlassCard className="py-12 px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white/90 md:text-4xl">
            Engineering What&apos;s Next
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            We build software that matters — from high-performance web applications
            to decentralized protocols. Full-stack engineering with precision,
            from idea to production.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
