'use client';

import { GlassCard } from '@/components/ui/GlassCard';

const services = [
  { title: 'Smart Contracts', icon: '⬡' },
  { title: 'DeFi Protocols', icon: '◈' },
  { title: 'NFT Platforms', icon: '◇' },
  { title: 'Web3 Integration', icon: '⬢' },
];

export function Services() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <GlassCard key={service.title}>
              <span className="text-4xl text-orange-500">{service.icon}</span>
              <h3 className="mt-4 text-lg font-medium">{service.title}</h3>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
