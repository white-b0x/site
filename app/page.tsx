import { PageClient } from './PageClient';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <main className="relative">
      <PageClient />
      <div id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  );
}
