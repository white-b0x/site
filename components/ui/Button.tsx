import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative px-8 py-3 rounded-lg font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030508]';

  const variants = {
    primary:
      'border border-white/20 bg-white/5 text-white/90 backdrop-blur-sm hover:border-white/40 hover:bg-white/10 hover:text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] active:scale-[0.98]',
    secondary:
      'border border-white/10 bg-transparent text-white/60 hover:border-white/20 hover:text-white/80',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
