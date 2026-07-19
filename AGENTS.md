# whiteb0x.com

Single-page landing site for white b0x inc., a development studio. The site is a
fixed full-screen WebGL scene with scrollable HTML content layered over it. Visual
impact is the product; there is very little text and no application logic.

This file is the cross-tool agent contract ([agents.md](https://agents.md)). It is
self-contained on purpose — assume you have no access to any configuration outside
this repository.

## Commands

```bash
pnpm install          # Install dependencies (lockfile is committed)
pnpm dev              # Dev server — Turbopack is the Next 16 default, no flag needed
pnpm build            # Production build
pnpm start            # Serve the production build
pnpm lint             # ESLint (flat config, eslint.config.mjs)
pnpm typecheck        # tsc --noEmit
pnpm check:versions   # Print runtime and dependency versions
```

There is **no test suite** and no `pnpm test` script. Do not write test files
expecting a runner to exist; propose adding one first.

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node.js | >=24 | Enforced by `engines`; `.nvmrc` pins it |
| pnpm | 10.28.2 | Pinned via `packageManager` — use pnpm, not npm or yarn |
| Next.js | 16.2.6 | App Router |
| React | 19.2.3 | Server Components by default |
| TypeScript | 5.x | `strict` |
| Tailwind CSS | 4.x | CSS-first config, no `tailwind.config.js` |
| three.js | 0.182.x | via React Three Fiber 9 + drei 10 |
| Animation | — | GSAP ScrollTrigger, Lenis, Framer Motion |

Do not introduce Node 22, Next.js 14/15, or React 18. Check
[endoflife.date](https://endoflife.date) before proposing any version change.

## Structure

```
app/                  # App Router
  page.tsx            # Server Component shell — metadata, JSON-LD
  PageClient.tsx      # Client entry: Lenis, GSAP, section composition
  layout.tsx          # Root layout, fonts, metadata
  globals.css         # Design tokens + brand animations
  not-found.tsx  manifest.ts  sitemap.ts  robots.ts
  icon.svg  apple-icon.png  opengraph-image.tsx  twitter-image.tsx
components/
  three/              # GlassCubeScene, GlassCube, TopoBackground,
                      #   CubeLighting, ScenePostProcessing
  sections/           # Hero, About, Contact, Footer
  ui/                 # Button, GlassCard, ScrollIndicator
hooks/                # useDeviceCapability, useScrollProgress,
                      #   useMediaQuery, useReducedMotion
brand/                # Design tokens, logo/favicon/OG assets, guidelines
scripts/              # print-versions.mjs
```

There is **no `app/api/`**. The site has no backend, no database, and no
environment variables required to run. The contact form validates inline and then
opens a pre-filled `mailto:` link — see `components/sections/ContactSection.tsx`.
An earlier Resend-backed API route was removed in commit `4934d21`.

## Architecture

- A fixed full-screen React Three Fiber `<Canvas>` sits at `z-0`; scrollable HTML
  content overlays it at `z-10` on glass-morphism panels.
- Server Components are the default. `'use client'` is required for anything
  touching R3F, event handlers, hooks, or browser APIs.
- The 3D scene is dynamically imported with `ssr: false` and wrapped in
  `<Suspense>`. It must never be imported into a Server Component.
- Absolute imports use the `@/*` alias, rooted at the repo root.

## Performance and accessibility are non-negotiable

This is a heavy WebGL page, so these are hard constraints, not aspirations:

- **Budgets:** LCP < 2.5s · INP < 200ms · CLS < 0.1 · 60fps desktop · 30fps mobile floor.
- **Quality tiers** driven by `useDeviceCapability`: high (desktop, 80 topo
  segments, full post-processing) · medium (tablet, 60) · low (mobile, 40, post-
  processing disabled). `PerformanceMonitor` and `AdaptiveDpr` degrade further at
  runtime; mobile caps DPR at 1.
- **`prefers-reduced-motion` must be respected** — `useReducedMotion` gates
  rotation and entrance animation. Any new animation has to honour it.
- Keyboard navigation, ARIA labels on interactive elements, visible focus states.

Adding geometry, lights, or post-processing effects without checking the mobile
tier is the most likely way to regress this site.

## Boundaries

**Always**

- Run `pnpm lint && pnpm typecheck` before committing.
- Follow the existing component patterns rather than introducing new ones.
- Keep changes to the 3D scene behind the existing quality-tier checks.

**Ask first**

- Any dependency add, removal, or version bump — including transitive changes
  that would rewrite `pnpm-lock.yaml`.
- Changes to `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, or
  `postcss.config.mjs`.
- Anything that pushes to the remote: `main` deploys to production on push.

**Never**

- Commit secrets or `.env` files.
- Use `any` without justification, or silence errors with `@ts-ignore`.
- Disable ESLint rules inline to make a check pass.
- Edit `ideation/` — it is historical design reference.

## Validation

```bash
pnpm lint && pnpm typecheck && pnpm build
```

All three must pass. There are no CI workflows, so this is the only gate before a
push, and a push to `main` is a production deploy via Vercel.

## Response style

Code first. Skip pleasantries and preamble, don't restate the prompt, and prefer
concise bullets to paragraphs.
