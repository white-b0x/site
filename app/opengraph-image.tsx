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
          backgroundColor: INK,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Aureate radial glow — upper center (ellipse cx=600 cy=240 rx=500 ry=340) */}
        <div
          style={{
            position: 'absolute',
            left: 100,
            top: -100,
            width: 1000,
            height: 680,
            background:
              'radial-gradient(ellipse at center, rgba(255,217,160,0.14) 0%, rgba(255,217,160,0.04) 45%, transparent 75%)',
          }}
        />

        {/* Topo lines — horizontal, bottom 55% of canvas, fading in then out */}
        {[
          { y: 264, o: 0.04 },
          { y: 284, o: 0.05 },
          { y: 306, o: 0.07 },
          { y: 330, o: 0.08 },
          { y: 357, o: 0.09 },
          { y: 387, o: 0.11 },
          { y: 420, o: 0.12 },
          { y: 456, o: 0.13 },
          { y: 491, o: 0.12 },
          { y: 524, o: 0.10 },
          { y: 552, o: 0.08 },
          { y: 576, o: 0.06 },
          { y: 597, o: 0.04 },
          { y: 616, o: 0.03 },
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

        {/* Corner brackets + registration mark */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1200 630"
          fill="none"
        >
          {/* Outer corner brackets */}
          <g stroke={FRAME_GRAY} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M 140 35 L 35 35 L 35 140" />
            <path d="M 1060 35 L 1165 35 L 1165 140" />
            <path d="M 1060 595 L 1165 595 L 1165 490" />
            <path d="M 140 595 L 35 595 L 35 490" />
          </g>
          {/* Aureate accent brackets */}
          <g stroke={AUREATE_400} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" opacity="0.45">
            <path d="M 155 80 L 80 80 L 80 155" />
            <path d="M 1045 80 L 1120 80 L 1120 155" />
            <path d="M 1045 550 L 1120 550 L 1120 475" />
            <path d="M 155 550 L 80 550 L 80 475" />
          </g>
          {/* Registration mark — centered */}
          <g stroke={WHITE} strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M 584 134 L 544 134 L 544 174" />
            <path d="M 616 134 L 656 134 L 656 174" />
            <path d="M 616 246 L 656 246 L 656 206" />
            <path d="M 584 246 L 544 246 L 544 206" />
          </g>
        </svg>

        {/* Centered content block */}
        <div
          style={{
            position: 'absolute',
            top: 270,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 300,
              color: WHITE,
              letterSpacing: '-1.8px',
              lineHeight: 1,
            }}
          >
            whiteb0x
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: AUREATE_400,
              letterSpacing: '4.5px',
              marginTop: 14,
            }}
          >
            A DEVELOPMENT STUDIO
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(245,245,245,0.30)',
              marginTop: 14,
              gap: 6,
            }}
          >
            <span>Web</span>
            <span>·</span>
            <span>Blockchain</span>
            <span>·</span>
            <span>Full-Stack</span>
          </div>
          <div
            style={{
              width: 240,
              height: 1,
              backgroundColor: 'rgba(255,217,160,0.12)',
              marginTop: 14,
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 300,
              height: 48,
              borderRadius: 8,
              backgroundColor: 'rgba(245,245,245,0.92)',
              marginTop: 16,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: INK,
                letterSpacing: '0.2px',
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
              marginTop: 36,
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
