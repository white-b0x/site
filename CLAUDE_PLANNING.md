# White B0x Website Implementation Plan

> **Last Updated**: 2026-02-02
> **Tech Stack Verified**: All versions current as of research date

## Overview

A visually stunning, modern landing page for **White B0x** - "A Web3 Development Studio". The website prioritizes visual impact over text, showcasing professionalism through cutting-edge design that reflects 2026 web trends.

---

## Tech Stack (2026 LTS)

> Versions verified via [endoflife.date](https://endoflife.date) on 2026-02-02

| Layer | Technology | Version | EOL/Support | Justification |
|-------|------------|---------|-------------|---------------|
| Runtime | **Node.js** | 24.x LTS | Apr 2028 | Current LTS, required for Next.js 16 |
| Framework | **Next.js** | 16.1.x | Active LTS | SSR, Turbopack (stable), React Compiler built-in |
| UI Library | **React** | 19.x | Active | Required for R3F 9.x, concurrent features |
| 3D Graphics | **@react-three/fiber** | 9.5.x | Active | Declarative 3D, React 19 support |
| 3D Helpers | **@react-three/drei** | 10.7.x | Active | `MeshTransmissionMaterial`, utilities |
| Animation | **GSAP + ScrollTrigger** | 3.14.x | Active | 100% FREE, industry-standard scroll animations |
| Styling | **Tailwind CSS** | 4.1.x | Active | 5x faster builds, modern CSS features |
| Smooth Scroll | **Lenis** | latest | Active | Buttery smooth scrolling, GSAP integration |
| Transitions | **Framer Motion** | latest | Active | Page transitions, micro-interactions |
| Email | **Resend** | latest | Active | Simple email API for contact form |
| Hosting | **Vercel** | - | - | Optimal Next.js hosting, edge functions |

### Version Reference (as of 2026-02-02)

| Package | Latest Stable | Source |
|---------|---------------|--------|
| Node.js | 24.13.0 | [endoflife.date/nodejs](https://endoflife.date/nodejs) |
| Next.js | 16.1.6 | [endoflife.date/nextjs](https://endoflife.date/nextjs) |
| React | 19.2.4 | [endoflife.date/react](https://endoflife.date/react) |
| Tailwind CSS | 4.1.18 | [endoflife.date/tailwind-css](https://endoflife.date/tailwind-css) |

### Package.json Dependencies (Target)

```json
{
  "engines": {
    "node": ">=24.0.0"
  },
  "dependencies": {
    "next": "^16.1.6",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "@react-three/fiber": "^9.5.0",
    "@react-three/drei": "^10.7.0",
    "@react-three/postprocessing": "^3.0.0",
    "gsap": "^3.14.0",
    "lenis": "^1.0.0",
    "framer-motion": "^11.0.0",
    "resend": "^4.0.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^4.1.18",
    "@types/react": "^19.0.0",
    "@types/node": "^24.0.0"
  }
}
```

### .nvmrc (for Node version management)

```
24
```

---

## Site Structure (Single-Page)

```
[Hero]          - Full viewport, 3D translucent cube centerpiece
[Services]      - Abstract visual bento grid (icons/shapes, minimal text)
[Philosophy]    - Brief statement with ambient 3D background
[Contact CTA]   - "Get in Touch" with email notification form
[Footer]        - Minimal, social links
```

**Note**: Portfolio section omitted to keep the site minimal and visual-focused.

---

## Hero Design: "The Digital Frontier"

### Centerpiece: Translucent 3D Cube

**NOT a copy of the particle universe template** - a completely unique approach:

- **Glass-like cube** using `MeshTransmissionMaterial` (transmission, refraction, chromatic aberration)
- **Procedural mini-cityscape inside** - 30-50 randomized tower geometries with cyan/blue emissive glow
- **Orange ambient light** from "sun" position (matching logo aesthetic)
- **Sparse floating particles** (~500-1000, not 120k) drifting slowly around cube
- **Perspective grid floor** fading beneath

### Interactions (Different from Template)

| Instead of... | We use... |
|--------------|-----------|
| Hand tracking | Mouse parallax (cube subtly follows cursor) |
| Audio reactivity | Scroll-driven transformation |
| 120k particle modes | Hover glow intensification |
| Complex UI panels | Minimal kinetic typography overlay |

### Ambient Animations

- Gentle floating oscillation
- Slow continuous Y-axis rotation
- Occasional light pulse from city center

---

## Visual Design System

### Color Palette (from logo assets)

```
Orange/Amber:  #FB923C → #F97316 → #EA580C
Cyan/Blue:     #38BDF8 → #0EA5E9 → #0284C7
Dark Base:     #030508 (background), #0A0D12 (panels)
Glow Effects:  rgba(249, 115, 22, 0.4), rgba(56, 189, 248, 0.4)
```

### Typography

- **Headlines**: Space Grotesk (600-700 weight)
- **Body**: Inter (400-500 weight)
- **Labels**: JetBrains Mono (monospace accents)

### UI Treatment

- **Glassmorphism**: Semi-transparent panels with `backdrop-blur(20px)`
- **Subtle borders**: `rgba(255, 255, 255, 0.08)`
- **Glow shadows**: Orange/cyan tinted box-shadows on hover

---

## Responsive Strategy

| Breakpoint | 3D Handling | Layout |
|------------|-------------|--------|
| Desktop (1024px+) | Full effects, post-processing, mouse parallax | 4-column bento |
| Tablet (768-1023px) | Simplified (25 buildings, reduced effects) | 2-column bento |
| Mobile (<768px) | Minimal (15 buildings, no post-processing, static rotation, dpr=1) | Single column |

**Mobile Fallback**: Gyroscope-based rotation on supported devices, tap-to-interact.

---

## Project Structure

```
whiteb0x-com/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Tailwind v4 imports
│   └── api/
│       └── contact/
│           └── route.ts    # Email notification endpoint
├── components/
│   ├── three/              # 3D components
│   │   ├── CubeScene.tsx
│   │   ├── TranslucentCube.tsx
│   │   ├── ProceduralCity.tsx
│   │   ├── FloatingParticles.tsx
│   │   └── PostProcessing.tsx
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Philosophy.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/                 # Reusable components
│       ├── GlassCard.tsx
│       ├── Button.tsx
│       └── ContactModal.tsx
├── hooks/                  # Custom hooks
│   ├── useMediaQuery.ts
│   ├── useMousePosition.ts
│   └── useReducedMotion.ts
├── lib/                    # Utilities, constants
│   ├── gsap.ts
│   └── constants.ts
├── public/                 # Static assets
│   └── fonts/
├── ideation/               # Design references (existing)
├── CLAUDE_PLANNING.md      # This file
└── package.json
```

---

## Implementation Phases

### Phase 1: Foundation

- Initialize Next.js 16 with TypeScript (`npx create-next-app@latest`)
- Configure Tailwind CSS v4 (simplified setup, CSS-first config)
- Set up fonts (Space Grotesk, Inter, JetBrains Mono) via `next/font`
- Implement smooth scrolling with Lenis + GSAP integration
- Create base UI components (GlassCard, Button)

### Phase 2: Hero 3D Scene

- Set up React Three Fiber canvas with Suspense
- Create TranslucentCube with `MeshTransmissionMaterial`
- Build ProceduralCity (instanced geometries for performance)
- Add lighting (ambient, orange sun, cyan rim)
- Implement post-processing (bloom, vignette) via `@react-three/postprocessing`
- Add mouse parallax interaction
- Create sparse floating particles

### Phase 3: Hero Integration

- Overlay text with kinetic typography (GSAP SplitText - now FREE)
- Add "Get in Touch" CTA button
- Scroll-triggered cube transformation
- Scanline/vignette overlays
- Mobile responsive 3D adjustments

### Phase 4: Content Sections

- Services Bento Grid with abstract visuals (icons/shapes, minimal text)
- Philosophy section with ambient 3D background
- GSAP ScrollTrigger reveal animations

### Phase 5: Contact & Polish

- Contact CTA section with email notification
- Modal form with Zod validation + Resend API route
- Footer component
- Floating navbar (appears on scroll)
- Accessibility audit (focus states, ARIA, reduced motion)

### Phase 6: Performance & Deployment

- Lighthouse optimization (target: all green)
- Lazy load 3D scene with dynamic imports
- Mobile device testing (iOS Safari, Android Chrome)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- **Deploy to Vercel** (automatic CI/CD from git)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| Desktop FPS | 60fps |
| Mobile FPS | 30fps minimum |

### Optimization Strategies

- Geometry instancing for buildings (`<Instances>` from drei)
- Adaptive performance monitoring (`<PerformanceMonitor>`)
- Dynamic imports for heavy 3D libraries
- `frameloop="demand"` when canvas off-screen
- Respect `prefers-reduced-motion`
- WebGPU fallback to WebGL2 (automatic via Three.js)

---

## Critical Files Reference

| File | Purpose |
|------|---------|
| `ideation/concept-hero-bg.html` | Technical reference for shaders, post-processing (NOT to copy) |
| `ideation/logo.png` | Primary brand reference for cube-cityscape visual |
| `ideation/social-card.png` | Full composition reference for color grading |
| `ideation/favicon.png` | Isometric cube angle reference |

---

## Contact Form Implementation

- **Frontend**: Modal form with fields (Name, Email, Message)
- **Backend**: Next.js Route Handler (`/app/api/contact/route.ts`)
- **Email Service**: Resend (free tier: 100 emails/day)
- **Validation**: Zod schema for server-side validation
- **UX**: Loading state, success/error feedback with toast notifications

---

## Verification Plan

1. **Visual QA**: Compare rendered cube against logo assets for brand consistency
2. **Performance**: Run Lighthouse, test on throttled connections
3. **Responsiveness**: Test on actual mobile devices (iOS Safari, Android Chrome)
4. **Interactions**: Verify mouse parallax, scroll animations, hover states
5. **Cross-browser**: Chrome 111+, Firefox 128+, Safari 16.4+, Edge
6. **Accessibility**: Keyboard navigation, screen reader, reduced motion
7. **Contact Form**: Test email delivery to configured recipient

---

## Research Sources

### Version & EOL Reference
- [endoflife.date/nodejs](https://endoflife.date/nodejs) - Node.js 24 LTS
- [endoflife.date/nextjs](https://endoflife.date/nextjs) - Next.js 16 LTS
- [endoflife.date/react](https://endoflife.date/react) - React 19
- [endoflife.date/tailwind-css](https://endoflife.date/tailwind-css) - Tailwind CSS 4.1

### Documentation
- [Next.js 16 Release](https://nextjs.org/blog/next-16)
- [Next.js Support Policy](https://nextjs.org/support-policy)
- [React Three Fiber GitHub](https://github.com/pmndrs/react-three-fiber)
- [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

### Design Trends
- [Web Design Trends 2026 - TheeDigital](https://www.theedigital.com/blog/web-design-trends)
- [Bento Grids & UI Trends 2026 - WriterDock](https://writerdock.in/blog/bento-grids-and-beyond-7-ui-trends-dominating-web-design-2026)
