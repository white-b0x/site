import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'whiteb0x — A Development Studio';
export const size = { width: 1200, height: 675 };
export const contentType = 'image/png';

const AUREATE = '#ffd9a0';
const AUREATE_400 = '#d4a574';
const INK = '#030508';
const FRAME_GRAY = '#1a1f28';
const WHITE = '#f5f5f5';

export default function TwitterImage() {
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
        {/* Radial aureate glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 750,
            height: 750,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,217,160,0.13) 0%, rgba(255,217,160,0.04) 45%, transparent 70%)`,
          }}
        />

        {/* Gold topo lines — bottom third */}
        {[
          { y: 430, o: 0.10 },
          { y: 456, o: 0.12 },
          { y: 484, o: 0.13 },
          { y: 514, o: 0.11 },
          { y: 546, o: 0.10 },
          { y: 580, o: 0.09 },
          { y: 616, o: 0.07 },
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

        {/* Outer corner brackets */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1200 675"
          fill="none"
        >
          <g stroke={FRAME_GRAY} strokeWidth="2" strokeLinecap="square">
            <path d="M 48 130 L 48 40 L 148 40" />
            <path d="M 1052 40 L 1152 40 L 1152 130" />
            <path d="M 1152 545 L 1152 635 L 1052 635" />
            <path d="M 148 635 L 48 635 L 48 545" />
          </g>
          {/* Middle aureate brackets */}
          <g stroke={AUREATE_400} strokeWidth="1.5" strokeLinecap="square" opacity="0.55">
            <path d="M 116 192 L 116 130 L 176 130" />
            <path d="M 1024 130 L 1084 130 L 1084 192" />
            <path d="M 1084 483 L 1084 545 L 1024 545" />
            <path d="M 176 545 L 116 545 L 116 483" />
          </g>
          {/* Inner white registration mark */}
          <g stroke={WHITE} strokeWidth="3" strokeLinecap="square">
            <path d="M 256 304 L 256 252 L 308 252" />
            <path d="M 402 252 L 454 252 L 454 304" />
            <path d="M 454 382 L 454 434 L 402 434" />
            <path d="M 308 434 L 256 434 L 256 382" />
          </g>
        </svg>

        {/* Brand text */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 210 }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 210 }}>
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
