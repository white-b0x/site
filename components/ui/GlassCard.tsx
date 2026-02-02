import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 transition-all duration-300 hover:border-orange-500/30 ${className}`}
    >
      {children}
    </div>
  );
}
