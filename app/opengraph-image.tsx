import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'whiteb0x — A Development Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const AUREATE = '#ffd9a0';
const AUREATE_400 = '#d4a574';
const INK = '#030508';
const FRAME_GRAY = '#1a1f28';
const WHITE = '#f5f5f5';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: INK,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '64px 80px',
        }}
      >
        {/* Radial aureate glow behind center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,217,160,0.13) 0%, rgba(255,217,160,0.04) 45%, transparent 70%)`,
          }}
        />

        {/* Gold topo lines — bottom third, brand-aligned */}
        {[
          { y: 390, o: 0.10 },
          { y: 415, o: 0.12 },
          { y: 442, o: 0.13 },
          { y: 471, o: 0.11 },
          { y: 502, o: 0.10 },
          { y: 535, o: 0.09 },
          { y: 570, o: 0.07 },
        ].map((l) => (
          <div
            key={l.y}
            style={{
              position: 'absolute',
              top: l.y,
              left: 0,
              width: '100%',
              height: 1,
              backgroundColor: AUREATE,
              opacity: l.o,
            }}
          />
        ))}

        {/* Outer corner brackets — frames the entire card */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1200 630"
          fill="none"
        >
          <g stroke={FRAME_GRAY} strokeWidth="2" strokeLinecap="square">
            <path d="M 48 120 L 48 40 L 128 40" />
            <path d="M 1072 40 L 1152 40 L 1152 120" />
            <path d="M 1152 510 L 1152 590 L 1072 590" />
            <path d="M 128 590 L 48 590 L 48 510" />
          </g>
          {/* Middle aureate brackets */}
          <g stroke={AUREATE_400} strokeWidth="1.5" strokeLinecap="square" opacity="0.55">
            <path d="M 116 176 L 116 120 L 172 120" />
            <path d="M 1028 120 L 1084 120 L 1084 176" />
            <path d="M 1084 454 L 1084 510 L 1028 510" />
            <path d="M 172 510 L 116 510 L 116 454" />
          </g>
          {/* Inner white registration mark — centered vertically, left-offset */}
          <g stroke={WHITE} strokeWidth="3" strokeLinecap="square">
            <path d="M 256 282 L 256 234 L 304 234" />
            <path d="M 394 234 L 442 234 L 442 282" />
            <path d="M 442 354 L 442 402 L 394 402" />
            <path d="M 304 402 L 256 402 L 256 354" />
          </g>
        </svg>

        {/* Top section: brand text */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 200 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 300,
              color: WHITE,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            whiteb0x
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: AUREATE_400,
              marginTop: 8,
              letterSpacing: '0.08em',
            }}
          >
            A DEVELOPMENT STUDIO
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 15,
              fontWeight: 400,
              color: 'rgba(245,245,245,0.30)',
              marginTop: 20,
              gap: 8,
            }}
          >
            <span>Web</span>
            <span>·</span>
            <span>Blockchain</span>
            <span>·</span>
            <span>Full-Stack</span>
          </div>
        </div>

        {/* Bottom: CTA + URL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 200 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 8,
              backgroundColor: 'rgba(245,245,245,0.92)',
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: INK,
                letterSpacing: '0.01em',
              }}
            >
              Let&apos;s Build Something
            </span>
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(245,245,245,0.22)',
            }}
          >
            whiteb0x.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
