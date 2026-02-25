import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'whiteb0x — A Development Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030508',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Isometric cube */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 32 32"
          fill="none"
          style={{ marginBottom: 40 }}
        >
          <path d="M16 4 L28 11 L16 18 L4 11 Z" fill="#e0e0e0" opacity="0.9" />
          <path d="M4 11 L16 18 L16 28 L4 21 Z" fill="#888888" opacity="0.85" />
          <path d="M16 18 L28 11 L28 21 L16 28 Z" fill="#aaaaaa" opacity="0.85" />
          <path
            d="M16 4 L28 11 L16 18 L4 11 Z M4 11 L4 21 L16 28 L28 21 L28 11"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />
        </svg>

        {/* Brand name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 200,
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '0.1em',
            marginBottom: 16,
          }}
        >
          white b0x
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.05em',
          }}
        >
          A Development Studio
        </div>
      </div>
    ),
    { ...size },
  );
}
