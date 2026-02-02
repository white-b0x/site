'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ContactModal } from '@/components/ui/ContactModal';

export function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
        <p className="mt-4 text-neutral-400">
          Ready to start your next Web3 project?
        </p>
        <div className="mt-8">
          <Button onClick={() => setIsOpen(true)}>Contact Us</Button>
        </div>
      </div>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
