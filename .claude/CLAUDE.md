# White B0x Website - Claude Instructions

## Project Goal
A visually stunning single-page landing site for **White B0x** — "A Development Studio".
Visual impact over text, showcasing professionalism through cutting-edge 3D design. Web2 + Web3.

**Hero**: Dark chrome cube (meshStandardMaterial, metalness=1, roughness=0.15) with animated topographic wave background (custom GLSL shaders with hue cycling).

## Global Standards Alignment

This project adheres to global agentic coding standards maintained in `/media/dev/2tb/dev/claude-global-settings/`.

**Reference:** `@~/.claude/rules/lts-versions.md` for current LTS framework versions and model selection guidance.

**Tech Stack Compliance:**
- Node.js 24.x (global LTS)
- Next.js 16.x (global LTS)
- React 19.x (global LTS)
- TypeScript 5.x (global LTS)
- Tailwind CSS 4.x (global LTS)

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
- **Always respect `prefers-reduced-motion`** — disable animations/rotation when enabled
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus visible states

### Mobile Degradation Strategy
- DPR capped to 1
- Fewer topo background segments (40 vs 80)
- No post-processing effects (bloom, vignette, CA disabled)
- `PerformanceMonitor` + `AdaptiveDpr` auto-degrade on low FPS

## Architecture

### Page Structure
- Fixed fullscreen R3F Canvas (z-0) as persistent 3D background
- Scrollable HTML content (z-10) overlays the 3D scene
- Glass-morphism panels with semi-transparent dark overlays for readability
- Lenis smooth scrolling, GSAP ScrollTrigger for section entrance animations

### 3D Scene Composition
- **GlassCubeScene.tsx** — Canvas wrapper with PerformanceMonitor + AdaptiveDpr
- **GlassCube.tsx** — RoundedBox + dark chrome meshStandardMaterial, auto-rotation on all axes, scroll-driven scale/position
- **TopoBackground.tsx** — Custom GLSL vertex/fragment shaders: wave displacement (3 layers), HSL hue cycling, wireframe, edge fade
- **CubeLighting.tsx** — Warm amber key light (mouse-following) + cool fill + rim + spot + Environment (studio preset)
- **ScenePostProcessing.tsx** — Bloom, ChromaticAberration, Noise, Vignette

### Quality Tiers
- **high** (desktop): 80 topo segments, full post-processing
- **medium** (tablet): 60 topo segments, full post-processing
- **low** (mobile): 40 topo segments, no post-processing

### Interaction
- Scroll → cube scale down + move up (0-30% range)
- Key light follows mouse position
- Breathing scale animation + floating bob on cube

## Coding Standards

### Server/Client Component Boundaries
- Server Components: Default for pages, layouts, static content
- Client Components: Required for R3F, event handlers, hooks, browser APIs

### R3F Rules
- Canvas only in client components (`'use client'` directive)
- Use `<Suspense>` wrapper for 3D content
- Dynamic import for scene: `dynamic(() => import('./GlassCubeScene'), { ssr: false })`

### Import Alias
- Use `@/*` for absolute imports from project root

## Project Structure
```
app/                  # Next.js App Router
  page.tsx            # Main page (Hero → About → Contact → Footer)
  layout.tsx          # Root layout with fonts and metadata
  globals.css         # Global styles + hero text animation
  api/contact/        # Resend email API route
  icon.svg            # Favicon (isometric cube)
  apple-icon.png      # Apple touch icon
  opengraph-image.tsx # OG social image (generated)
  twitter-image.tsx   # Twitter card image (re-exports OG)
  sitemap.ts          # XML sitemap
  robots.ts           # Robots.txt
components/
  three/              # R3F 3D components (5 files)
  sections/           # Page sections (4: Hero, About, Contact, Footer)
  ui/                 # Reusable UI (3: Button, GlassCard, ScrollIndicator)
hooks/                # Custom hooks (4 files)
scripts/              # Utility scripts
ideation/             # Design reference files (DO NOT MODIFY)
public/
  llms.txt            # LLM crawler info
```

## Key Dependencies
- `@react-three/fiber` — Declarative 3D with React
- `@react-three/drei` — RoundedBox, Environment, PerformanceMonitor, AdaptiveDpr
- `@react-three/postprocessing` — Post-processing effects
- `gsap` + `ScrollTrigger` — Scroll-driven section animations
- `lenis` — Smooth scrolling
- `framer-motion` — Hero entrance animations, scroll indicator
- `resend` — Contact form email delivery
- `zod` — Schema validation

## Design Reference
See `ideation/` folder for early concept art. Current site uses dark chrome aesthetic, not the glass-city concept in those images.
