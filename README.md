# whiteb0x.com

Corporate site for white b0x inc. — a development studio.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **3D:** React Three Fiber, drei, Three.js, postprocessing
- **Animation:** GSAP ScrollTrigger, Lenis smooth scroll
- **Language:** TypeScript (strict)

## Development

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript checks |

## Structure

```
app/
  page.tsx              # Main page (Hero → About → Contact → Footer)
  layout.tsx            # Root layout with fonts and metadata
  globals.css           # Global styles + hero text animation
  api/contact/          # Contact form API route

components/
  sections/             # Page sections (Hero, About, Contact, Footer)
  three/                # R3F components (GlassCube, TopoBackground, Lighting, PostFX)
  ui/                   # Shared UI (Button, GlassCard, ScrollIndicator)

hooks/
  useDeviceCapability   # Quality tier detection (high/medium/low)
  useScrollProgress     # Normalized scroll position (0→1)
  useReducedMotion      # Prefers-reduced-motion check
```
