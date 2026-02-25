'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';

const GlassCubeScene = dynamic(
  () => import('@/components/three/GlassCubeScene').then(mod => ({ default: mod.GlassCubeScene })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-[#030508]" />,
  }
);

export default function Home() {
  const scrollProgress = useScrollProgress();
  const quality = useDeviceCapability();

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative">
      {/* Fixed fullscreen 3D background */}
      <div className="fixed inset-0 z-0">
        <GlassCubeScene quality={quality} scrollProgress={scrollProgress} />
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  );
}
