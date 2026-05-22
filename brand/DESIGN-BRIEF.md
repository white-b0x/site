# whiteb0x — Design Brief

> This file is the canonical design context for this brand. The `/branding` skill reads it to generate the full kit. The `/design` skill reads it to stay consistent with existing decisions. Update it when visual direction evolves.

---

## Brand Identity

| Field | Value |
|-------|-------|
| **Name** | whiteb0x |
| **Legal entity** | white b0x inc. |
| **Tagline** | A Development Studio |
| **Domain** | whiteb0x.com |
| **Contact** | contact@whiteb0x.com |
| **GitHub** | white-b0x |
| **Founded** | 2022 |

**Core copy:** "Full-stack engineering from web applications to blockchain protocols. We build software that matters."

**About:** "We build software that matters — from high-performance web applications to decentralized protocols. Full-stack engineering with precision, from idea to production."

**CTA framing:** "Let's Build Something" / "Have a project in mind?"

---

## Brand Personality

**5 attributes:** Precise, Spare, Capable, Considered, Unflashy

**Archetype (specific, not generic):** _The senior engineer who's shipped at every major company, then opened a studio to do the work the right way. Doesn't post hot takes. Doesn't have a Medium. Has strong opinions and will tell you when your spec is wrong. Doesn't care about your funding round, cares about your data model._

**Voice:** Laconic and self-assured. No marketing fluff. Says "we build software that matters" not "we transform your digital journey." Code-fluent, speaks peer-to-peer with engineers and technical founders. Uses precise nouns over decorative adjectives. Uses numbers when relevant. Uses technical terms without softening.

**Words this brand uses:** build, ship, engineer, design, system, protocol, application, precise, deliberate, considered, careful, production, scale, performance.

**Words this brand never uses:** solutions, journey, transform, leverage, synergy, cutting-edge, next-generation, revolutionary, powerful, robust, world-class, best-in-class, empower, enable, unleash, "passionate about."

**Anti-voice:** Startup-speak, buzzwords, verbose self-promotion, exclamation marks, em-dashes used for drama, "We believe..." openings.

**Messaging pillars (3):**
1. **White box engineering** — Transparency by design. You see how we work, what we build, why.
2. **Full-stack from idea to production** — Not just frontend, not just contracts. Whole-system thinking.
3. **Made with care** — Every decision is deliberate. No template builds, no off-the-shelf solutions.

---

## Existing Color Palette

Extracted from `app/globals.css` and component code. These are the current values — `/branding` should formalize and extend them.

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#030508` | Page background, canvas bg, footer |
| `--foreground` | `#f5f5f5` | Primary text |
| `--gold-glow` | `rgba(255, 217, 160, 0.4)` | Hero breathe animation, text selection highlight |
| `--cyan-glow` | `rgba(56, 189, 248, 0.4)` | Secondary accent (used sparingly) |
| Focus gold | `#d4a574` | focus-visible ring on all interactive elements |
| Glass surface | `rgba(10, 13, 18, 0.6)` | Cards, panels (glass morphism base) |
| Glass border | `rgba(255, 255, 255, 0.08)` | Glass panel edges |
| Hover border | `rgba(251, 191, 36, 0.2)` | Card hover state (amber-200/20) |

**Derived pure gold:** `#ffd9a0` (the gold-glow without opacity) — treat as the brand's primary accent hue.

**Color strategy:** Near-black (`#030508`) carries 60% of all surfaces. Off-white (`#f5f5f5`) handles primary text. Gold is the 10% accent — used only on CTAs, focus rings, glow effects, and the cube's grid shader.

---

## Typography

| Role | Font | Source |
|------|------|--------|
| Heading + body | Geist Sans | `next/font/google`, Latin subset |
| Monospace | Geist Mono | `next/font/google`, Latin subset |

**CSS variables:** `--font-geist-sans` → `--font-sans`, `--font-geist-mono` → `--font-mono`

**Weight discipline (refined — REJECT 700/800 going forward):**
- `100` — extra-light: scroll indicator label, technical micro-copy
- `300` — light: tagline "A Development Studio", hero wordmark
- `500` — medium: body text, headings, CTA labels (default for everything substantive)
- `700` — **avoid going forward** — reads as marketing. Existing instances should be migrated to 500.

**Letter-spacing:**
- `0.3em` (widest) — tagline, scroll indicator (extremely wide, technical caps)
- `tight` (`-0.025em`) — headings, hero wordmark
- `wide` (`0.05em`) — small caps labels
- `normal` — body

**Mono usage rule:** Geist Mono is the brand's "engineering signal" font. Use it for technical metadata only — version numbers, contract addresses, status indicators, code, callouts in specifications. Never use mono for body or hero text.

**Tabular numerals:** Apply `font-variant-numeric: tabular-nums` to any displayed numbers (counts, dates, prices, technical specs). Aligned columns are part of the brand's precision identity.

**Note:** Geist is already less common than Inter/DM Sans/Poppins. Keep it. Do not add a third font family — the brand does not need an editorial serif. Tonal warmth comes from gold, not from a serif.

---

## Design Axes (refined)

Positions committed for this brand. `/design` must not deviate without explicit instruction.

| Axis | Position (1-10) | Direction | Evidence / Rationale |
|------|-----------------|-----------|----------------------|
| Density | 2 | Spacious | Full-viewport hero, py-16/py-24 sections, minimal elements |
| Temperature | 3 | Cool with single warm accent | #030508 base is cool; gold is the only warmth. Don't add second warm color. |
| Weight | 2 | Light/Airy | Font weights 300 (display) and 500 (body). Reject 700+ — reads as marketing. |
| Geometry | 3 | Precision (minimal radius) | rounded-md/lg on UI, no large radii. Sharp brackets in logo. |
| Motion | 7 | Animated but deliberate | R3F + GSAP + Lenis active; entrance reduced to y:24/600ms (less template-y) |
| Contrast | 9 | High/Vivid | #f5f5f5 on #030508, maximum readability |
| Era | 7 | Futuristic with classical engineering DNA | 3D + shaders, but informed by watchmaking and print-production heritage |

**One-sentence direction:** _A watchmaker's specification sheet rendered in real-time 3D — technically rigorous, visually minimal, quietly extraordinary._

**Differentiation statement:** _We look like a watchmaker's specification sheet instead of a startup pitch deck because our craft is in the engineering substrate, not in the marketing surface._

---

## 3D Visual Identity

This is the brand's most distinctive asset. All 2D brand assets should feel like they could coexist with the 3D scene.

**Hero object:** Dark chrome metallic cube
- Material: `meshStandardMaterial`, color `#1a1608` (dark warm brown-black), metalness `1.0`, roughness `0.3`, envMapIntensity `0.7`
- Grid overlay: 3×3 warm gold-white grid shader (`vec3(1.0, 0.85, 0.63)`), breathing intensity 0.03–1.0
- Animation: slow multi-axis rotation (irrational ratios 0.83/1.0/0.53), breathing scale ±1.5%, floating bob ±0.1Y

**Background:** Topographic wireframe terrain
- HSL hue-cycling full spectrum ~20s, saturation 0.7, opacity 0.20
- Three wave layers (broad/medium/fine detail), elevation-responsive lightness
- Distance-based radial edge fade

**Lighting rig:**
- Key: Directional `#ffa040` (warm amber), intensity 1.4, mouse-following
- Fill: Directional `#6070a0` (cool blue), intensity 0.3
- Rim: Point `#ffd4a0` (warm peach), intensity 0.8, distance 14
- Ambient: `#1a1a2e` (dark navy), intensity 0.15
- Environment: Studio preset 0.3, Fog: `#030508` density 0.015

**Post-processing:** Bloom + ChromaticAberration + Film grain (Noise) + Vignette

**Quality tiers:** High/Medium = full effects. Low/degraded = bloom-only. Segments 80/60/40.

---

## Logo System

Three distinct conceptual approaches were developed. **Concept B (Registration) is the recommended primary** — it solves the conceptual brief better than any cube-derivative could.

### Concept A — Aperture
File: `brand/assets/logo/concept-a-aperture.svg`
Square frame containing two interior horizontal lines. Reads as a viewfinder or an opened-box cross-section. References: technical drawings, telescope reticles. Best as an alternative if the registration brackets feel too austere.

### Concept B — Registration (PRIMARY)
File: `brand/assets/logo/concept-b-registration.svg`
Four corner brackets implying a square without drawing one. The "white box" is the literal negative space inside the brackets. References: print registration marks, camera framing brackets, crop marks. Conceptually distinct from all prior cube concepts because the box is INFERRED, not DRAWN — the brand IS the void.

Why this wins:
- Scales to 16px cleanly (4 simple L-shapes)
- Differentiates from every prior cube concept (no central shape)
- Conceptually rich (the white = the box's interior = the work we do)
- Works in monochrome, on light, on dark
- References print-production craft, fits the "watchmaker" brand DNA

### Concept C — Glyph
File: `brand/assets/logo/concept-c-glyph.svg`
Custom monogram combining the "w" of white (4 angular strokes) with the "0" of b0x (a perfect circle). References: industrial nameplates, modernist monograms. Best as a typographic alternative when an icon is unwanted.

### Prior rejected concepts (in `brand/assets/references/`)

| File | Approach | Why rejected |
|------|----------|--------------|
| `concept-logo.png` | dark chrome + gold grid | too similar to 3D hero scene at small sizes |
| `concept-logo1.jpeg` | white cube on charcoal | too generic, indistinguishable from other dev brands |
| `concept-logo2.jpeg` | cube-in-box | unclear at 16px |
| `concept-logo3.png` | glass holographic iridescent | too colorful, conflicts with brand temperature |
| `current-favicon.png` | translucent clear glass cube | user verdict: "fine for now, not great" — replaced by Concept B |

**Design constraint that produced Concept B:** No more cubes in the 2D mark. The 3D cube is the hero of the site; the 2D mark needs to play a different role — to frame, not to fill.

---

## Anti-Patterns

### Never use (industry clichés)

**From dev-tools/studio space:**
- GitHub-dark aesthetic clone
- Terminal/CLI as the hero visual
- Monospace body text (we use mono ONLY for technical signals)
- Code syntax highlighting as decoration
- "Built by developers, for developers"

**From Web3/blockchain space:**
- Hexagonal grids
- Abstract node networks (dots connected by lines)
- Infinity loops, Möbius strips
- "Trust blue" #2A7DE1 and relatives
- Generic shield/lock icons
- Isometric 3D block illustrations

**From SaaS/startup space:**
- Inter, Roboto, Montserrat, Space Grotesk, Poppins, DM Sans
- Purple gradients on white or dark
- Isometric undraw-style illustrations
- Feature grids with Lucide icons in colored circles
- Stripe-clone pricing tables
- "Get Started Free" CTAs
- Gradient text headlines
- Dashboard screenshots at an angle with drop shadow

**Project-specific:**
- Generic tech cube as a 2D logo (the 3D cube is the hero — 2D mark needs to be different)
- "Holographic" rainbow iridescent effects (rejected in prior concepts)
- ETCswap-style left-aligned OG layout (used on other projects in this portfolio)
- Bold heading weights (700/800) — read as marketing, brand uses 500 medium max

### Converging patterns already in use (justify before adding more)

These patterns are intentional here but globally overused. Flag if they appear in NEW assets without specific justification:

| Pattern | Status here | Rationale |
|---------|-------------|-----------|
| `#030508` background | KEEP | Already the brand's foundational color anchor |
| `.surface-glass` utility | KEEP, use sparingly | One surface signature is enough — don't proliferate |
| Breathing glow on text | KEEP, formalized as `aureate-breathe` | The brand's signature animation |
| GSAP `y:60, opacity:0` entrance | REDUCE to y:24, 600ms | Less Awwwards-template, more engineered |
| Lenis `{ lerp: 0.1, smoothWheel: true }` | KEEP | Default works; document if changed |
| R3F fixed canvas + scroll overlay | KEEP | This is the brand's distinguishing visual |

---

## Competitive Landscape

### Triple-overlap problem

whiteb0x sits at the intersection of three industries with heavily converging clichés. The brand must differentiate from **all three** simultaneously:

| Industry | Cliché to reject |
|----------|------------------|
| Dev tools / studios | GitHub-dark, terminal-as-hero, mono-everything body text, "Built by developers for developers" |
| Web3 / blockchain | Hexagons, node networks, gradient meshes, infinity loops, neon-on-black |
| SaaS | Inter, purple gradients, isometric illustrations, feature grids with colored-circle icons, Stripe-clone pricing tables, "Get Started Free" |

### Peer reference points

**Tier 1 — direct peers (dev studios):**
- Basement Studio — playful, animated, primary colors (whiteb0x is the opposite: restrained, monochromatic)
- Active Theory — black with film grain (closest to us — differentiator is precision over atmosphere)
- Resn — playful 3D, character (whiteb0x is more austere)
- Hello Monday — bold typography (whiteb0x is light/airy)

**Tier 2 — adjacent (devtools, premium SaaS):**
- Vercel — stark black/white, Geist (we share Geist but use gold accent instead of no-color)
- Linear — dark with purple (we use gold instead of purple, no marketing copy)
- Stripe — gradient meshes (we use wireframes, no meshes)
- Raycast — macOS native (we share the precise feel)

### Differentiation statement

> _"We look like a watchmaker's specification sheet instead of a startup pitch deck because our craft is in the engineering substrate, not in the marketing surface."_

whiteb0x is warmer than Linear/Vercel (gold vs. purple/blue), more austere than Basement/Resn (precision vs. play), more spatial than Stripe (real-time 3D vs. illustration), and more laconic than all peers (fewer words, fewer sections, no pricing page).

### Cross-industry inspiration

- **Watchmaking** — technical diagrams, tolerance specs, sub-millimeter callouts (e.g., Patek Philippe service docs)
- **Architectural drawings** — axonometric projection, fine line weights, measurement annotations
- **Scientific instruments** — knurled edges, calibration marks, monochromatic precision (e.g., Leica Microsystems)
- **Print production** — registration marks, crop marks, color bars (the source of the Concept B logo)

---

## File Map (delivered)

```
brand/
├── DESIGN-BRIEF.md                       ← this file (context for /design)
├── BRAND-GUIDELINES.md                   ← full guidelines
├── QUICK-REFERENCE.md                    ← one-page developer cheat sheet
├── assets/
│   ├── references/                       ← prior concepts + current assets (for context)
│   │   ├── current-logo.png              (translucent glass cube — to be replaced)
│   │   ├── current-favicon.png
│   │   ├── concept-logo.png              (rejected: chrome+gold grid)
│   │   ├── concept-logo1.jpeg            (rejected: white cube on charcoal)
│   │   ├── concept-logo2.jpeg            (rejected: cube-in-box)
│   │   ├── concept-logo3.png             (rejected: holographic iridescent)
│   │   ├── social-card.png
│   │   └── social-card-og.png
│   ├── logo/
│   │   ├── concept-a-aperture.svg        (frame + viewfinder)
│   │   ├── concept-b-registration.svg    ★ RECOMMENDED PRIMARY (corner brackets)
│   │   ├── concept-c-glyph.svg           (w0 monogram)
│   │   ├── wordmark.svg                  (Geist Sans 300, "whiteb0x")
│   │   ├── lockup-horizontal.svg         (mark + wordmark)
│   │   └── lockup-vertical.svg           (mark above wordmark)
│   ├── favicon/
│   │   ├── favicon.svg                   (currentColor — adapts to light/dark)
│   │   └── favicon-aureate.svg           (fixed aureate-400 + ink-1000 bg)
│   └── og/
│       ├── og-default.svg                (1200×630 OpenGraph)
│       └── twitter-card.svg              (1200×675 Twitter summary_large_image)
└── tokens/
    ├── colors.json                       (OKLCH palette + WCAG audit)
    ├── motion.json                       (easings, durations, signature)
    └── design-tokens.css                 (CSS variables + Tailwind @theme block)
```

PNG rasters of logo and favicon should be exported from the SVGs at the sizes required by `/seo`'s favicon step (16/32/48/180px, plus 192/512 for the web manifest). The SVG is the source of truth.

---

## How to Use This Brief

**For `/design`:** This file is automatically read for context. To generate consistent assets:
```
/design component button — use brand tokens
/design section features — match the watchmaker direction
/design palette — already done, see tokens/colors.json
```

**For wiring tokens into the app:**
1. Import `brand/tokens/design-tokens.css` from `app/globals.css` (or copy the `@theme` block inline)
2. Map existing app variables (`--background`, `--foreground`, `--gold-glow`, `--cyan-glow`) to the new formal tokens
3. Replace hardcoded `#030508` and `#f5f5f5` with `var(--color-background)` / `var(--color-text-primary)`
4. Migrate the `breathe-glow` keyframe and `.hero-text` class to use the new `.aureate-breathe` utility

**For favicon installation:**
1. Copy `brand/assets/favicon/favicon.svg` → `app/icon.svg` (replaces existing isometric glass cube)
2. Export PNG variants at 16/32/48/192/512 via your favicon tool of choice
3. Update `app/manifest.ts` if icon paths change

**For OG image installation:**
1. Use `brand/assets/og/og-default.svg` as the visual reference for `app/opengraph-image.tsx`
2. The dynamic Next.js OG should render the same composition: dark bg, oversized registration brackets, inner aureate brackets, centered wordmark, mono tagline, URL bottom-right
