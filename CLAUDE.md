# White B0x Website - Claude Instructions

## Project Goal
A visually stunning single-page landing site for **White B0x** - "A Web3 Development Studio".
Visual impact over text, showcasing professionalism through cutting-edge 3D design.

**Hero**: Translucent 3D cube with procedural mini-cityscape inside, glass-like transmission material, sparse floating particles.

## Quick Commands
- `pnpm dev` - Start development server (Turbopack)
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - TypeScript type checking
- `pnpm check:versions` - Print runtime and dependency versions

## Non-Negotiables

### Performance Targets
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- Desktop: 60fps
- Mobile: 30fps minimum

### Accessibility
- **Always respect `prefers-reduced-motion`** - disable animations/rotation when enabled
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus visible states

### Mobile Degradation Strategy
- DPR capped to 1
- Fewer building instances (15 vs 50)
- No post-processing effects (bloom, vignette disabled)
- Static or slower rotation
- Consider gyroscope-based rotation on supported devices

## Coding Standards

### Server/Client Component Boundaries
- Server Components: Default for pages, layouts, static content
- Client Components: Required for:
  - React Three Fiber canvas and all 3D components
  - Event handlers (onClick, onSubmit, etc.)
  - Hooks (useState, useEffect, useRef)
  - Browser APIs (window, document)

### R3F Rules
- Canvas only in client components (`'use client'` directive)
- Use `<Suspense>` wrapper for 3D content
- Dynamic import for heavy 3D scenes: `dynamic(() => import('./CubeScene'), { ssr: false })`

### Import Alias
- Use `@/*` for absolute imports from project root

## Project Structure
```
app/              # Next.js App Router
  api/contact/    # Resend email API route
components/
  three/          # R3F 3D components
  sections/       # Page sections (Hero, Services, etc.)
  ui/             # Reusable UI components
hooks/            # Custom React hooks
lib/              # Utilities (constants, gsap registration)
docs/             # Version documentation
scripts/          # Build scripts
ideation/         # Design reference files (DO NOT MODIFY)
```

## Workflow
- Run `pnpm lint`, `pnpm typecheck`, `pnpm build` before committing
- Keep commits small and clearly named
- Test on mobile devices (real or emulated) for 3D performance

## Version Truth Policy
- For Next/React/Tailwind/Node: trust official docs + live installed versions
- Record resolved versions in `/docs/versions.md`
- Verify via `pnpm check:versions`

## Key Dependencies
- `@react-three/fiber` - Declarative 3D with React
- `@react-three/drei` - R3F helpers (MeshTransmissionMaterial, Instances)
- `@react-three/postprocessing` - Post-processing effects
- `gsap` + `ScrollTrigger` - Scroll-driven animations
- `lenis` - Smooth scrolling
- `framer-motion` - Page transitions, micro-interactions
- `resend` - Contact form email delivery
- `zod` - Schema validation

## Design Reference
See `ideation/` folder and `CLAUDE_PLANNING.md` for full design specifications.
