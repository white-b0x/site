import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'whiteb0x — A Development Studio',
    short_name: 'whiteb0x',
    description:
      'Full-stack engineering from web applications to blockchain protocols.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030508',
    theme_color: '#030508',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
