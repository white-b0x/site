import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Philosophy } from '@/components/sections/Philosophy';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  );
}
