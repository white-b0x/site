import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'whiteb0x — A Development Studio';
export const size = { width: 1200, height: 675 };
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
          backgroundColor: '#030508',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '64px 80px',
        }}
      >
        {/* Topographic wave lines — references site background */}
        {[
          { y: 450, c: '#40c040' },
          { y: 470, c: '#80d040' },
          { y: 490, c: '#ffd700' },
          { y: 510, c: '#ffa040' },
          { y: 530, c: '#ff8c00' },
          { y: 550, c: '#ff4040' },
          { y: 570, c: '#ff60a0' },
          { y: 590, c: '#c060ff' },
          { y: 610, c: '#00d4ff' },
          { y: 630, c: '#4080ff' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {/* Registration mark in rounded container */}
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
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M8 22 L8 8 L22 8" stroke="#f5f5f5" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
                <path d="M42 8 L56 8 L56 22" stroke="#f5f5f5" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
                <path d="M56 42 L56 56 L42 56" stroke="#f5f5f5" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
                <path d="M22 56 L8 56 L8 42" stroke="#f5f5f5" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
            </div>

            {/* Brand text */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 500,
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

        {/* CTA button + URL */}
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
                fontWeight: 500,
                color: '#030508',
                letterSpacing: '0.01em',
              }}
            >
              Let&apos;s Build Something
            </span>
          </div>

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
