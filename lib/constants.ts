export const colors = {
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  dark: {
    background: '#030508',
    panel: '#0a0d12',
    border: 'rgba(255, 255, 255, 0.08)',
  },
  glow: {
    orange: 'rgba(249, 115, 22, 0.4)',
    cyan: 'rgba(56, 189, 248, 0.4)',
  },
} as const;

export const typography = {
  fonts: {
    heading: 'Space Grotesk',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
