'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
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
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/70 via-[#030508]/90 to-[#030508]/70" />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white/90 md:text-4xl">
          Let&apos;s Build Something
        </h2>
        <p className="mt-4 text-lg text-white/50">
          Have a project in mind? We&apos;d love to hear about it.
        </p>
        <a href="mailto:contact@whiteb0x.com">
          <Button className="mt-8">
            Get in Touch
          </Button>
        </a>
      </div>
    </section>
  );
}
