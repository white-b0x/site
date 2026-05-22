# whiteb0x

**A Development Studio** — full-stack engineering from web applications to blockchain protocols.

[whiteb0x.com](https://whiteb0x.com) · [contact@whiteb0x.com](mailto:contact@whiteb0x.com) · [GitHub](https://github.com/white-b0x)

---

## About

white b0x inc. designs and ships software. Web applications, blockchain protocols, interactive experiences — production-grade, from idea to deployment.

Founded 2022.

---

## This site

The studio's landing page. Dark chrome aesthetic: metallic 3D cube, topographic wireframe background, glass-morphism panels. Built for visual impact, not content volume.

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| 3D | React Three Fiber, drei, GLSL shaders |
| Animation | Framer Motion, GSAP ScrollTrigger, Lenis |
| Language | TypeScript (strict) |
| Email | Resend |

---

## Development

```bash
pnpm install
pnpm dev        # Turbopack dev server
pnpm build      # Production build
pnpm typecheck  # TypeScript checks
pnpm lint       # ESLint
```

---

## Structure

```
app/                        # Next.js App Router
  page.tsx                  # Single page (Hero → About → Contact → Footer)
  layout.tsx                # Root layout, metadata, JSON-LD
  globals.css               # Design tokens + brand animations
  icon.svg                  # Favicon — registration mark
  opengraph-image.tsx       # OG image (1200×630)
  twitter-image.tsx         # Twitter card (1200×675)
  sitemap.ts / robots.ts    # Crawl directives

components/
  sections/                 # HeroSection, AboutSection, ContactSection, FooterSection
  three/                    # GlassCubeScene, GlassCube, TopoBackground, CubeLighting, PostFX
  ui/                       # Button, GlassCard, ScrollIndicator

hooks/                      # useDeviceCapability, useScrollProgress, useMediaQuery
public/
  llms.txt                  # AI crawler summary

brand/                      # Design system and brand assets
  BRAND-GUIDELINES.md       # Full brand rules
  QUICK-REFERENCE.md        # Developer cheat sheet
  DESIGN-BRIEF.md           # Strategy, axes, competitive context
  tokens/                   # colors.json, motion.json, design-tokens.css
  assets/logo/              # SVG logo variants (mark, wordmark, lockups)
  assets/favicon/           # SVG favicon variants
  assets/og/                # OG image templates (SVG source)
```

---

## Brand

Design tokens and logo assets live in [`brand/`](./brand/). Import the CSS token file to use brand variables:

```css
@import "../brand/tokens/design-tokens.css";
```

Primary logo: [`brand/assets/logo/concept-b-registration.svg`](./brand/assets/logo/concept-b-registration.svg) — four corner brackets, `currentColor`, scales from 16px to print.

See [`brand/QUICK-REFERENCE.md`](./brand/QUICK-REFERENCE.md) for the one-page developer cheat sheet.
