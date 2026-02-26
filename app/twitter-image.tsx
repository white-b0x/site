import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'whiteb0x — A Development Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
          backgroundColor: '#0a0e14',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '64px 80px',
        }}
      >
        {/* Topo wave lines — rainbow wireframe background */}
        {[
          { y: 420, c: '#40c040' },
          { y: 440, c: '#80d040' },
          { y: 460, c: '#ffd700' },
          { y: 480, c: '#ffa040' },
          { y: 500, c: '#ff8c00' },
          { y: 520, c: '#ff4040' },
          { y: 540, c: '#ff60a0' },
          { y: 560, c: '#c060ff' },
          { y: 580, c: '#00d4ff' },
          { y: 600, c: '#4080ff' },
        ].map((l) => (
          <div
            key={l.y}
            style={{
              position: 'absolute',
              top: l.y,
              left: 0,
              width: '100%',
              height: 1,
              backgroundColor: l.c,
              opacity: 0.15,
            }}
          />
        ))}

        {/* Top section: icon + brand */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Icon + brand name row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {/* Glass cube in rounded container */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                backgroundColor: '#151a22',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 5 L27 11.5 L16 18 L5 11.5Z"
                  fill="white"
                  opacity="0.18"
                />
                <path
                  d="M5 11.5 L16 18 L16 27 L5 20.5Z"
                  fill="white"
                  opacity="0.08"
                />
                <path
                  d="M16 18 L27 11.5 L27 20.5 L16 27Z"
                  fill="white"
                  opacity="0.12"
                />
                <path
                  d="M16 5 L27 11.5 L16 18 L5 11.5Z M5 11.5 L5 20.5 L16 27 L27 20.5 L27 11.5 M16 18 L16 27"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M16 5 L27 11.5 L16 18 L5 11.5Z"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="0.3"
                  fill="none"
                />
              </svg>
            </div>

            {/* Brand text */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.92)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                whiteb0x
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.45)',
                  marginTop: 6,
                }}
              >
                A Development Studio
              </div>
            </div>
          </div>

          {/* Feature dots */}
          <div
            style={{
              display: 'flex',
              fontSize: 16,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.30)',
              marginTop: 24,
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

        {/* CTA button — solid white */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 240,
              paddingTop: 14,
              paddingBottom: 14,
              borderRadius: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#0a0e14',
                letterSpacing: '0.01em',
              }}
            >
              Let&apos;s Build Something
            </span>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.25)',
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
