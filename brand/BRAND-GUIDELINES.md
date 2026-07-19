# whiteb0x — Brand Guidelines

Version 1.0 · Established 2022 · Last revised 2026-05-22

This document defines how whiteb0x looks, sounds, moves, and feels across every surface. Read [DESIGN-BRIEF.md](./DESIGN-BRIEF.md) for the underlying strategic rationale; this file is the applied rules.

---

## 1. Brand position

### Mission
We build software that matters — from high-performance web applications to decentralized protocols. Full-stack engineering with precision, from idea to production.

### Personality
Precise · Spare · Capable · Considered · Unflashy

### Archetype
The senior engineer who's shipped at every major company, then opened a studio to do the work the right way. Doesn't post hot takes. Doesn't have a Medium. Has strong opinions and will tell you when your spec is wrong. Doesn't care about your funding round, cares about your data model.

### Differentiation
> We look like a watchmaker's specification sheet instead of a startup pitch deck because our craft is in the engineering substrate, not in the marketing surface.

---

## 2. Voice and tone

### Voice rules

| Do | Don't |
|----|-------|
| Use precise nouns | Use decorative adjectives |
| Active voice, present tense | Passive voice, future-conditional |
| Numbers when relevant | Vague magnitudes ("powerful," "many") |
| Technical terms without softening | Hand-holding analogies |
| One claim per sentence | Stacked superlatives |

### Vocabulary

**Words we use:**
build, ship, engineer, design, system, protocol, application, precise, deliberate, considered, careful, production, scale, performance, contract, schema, pipeline, deploy.

**Words we never use:**
solutions, journey, transform, leverage, synergy, cutting-edge, next-generation, revolutionary, powerful, robust, world-class, best-in-class, empower, enable, unleash, "passionate about," "We believe…", "next-level."

### Capitalization
- Brand name: lowercase `whiteb0x` in body, `whiteb0x` everywhere (never `Whiteb0x` or `WhiteB0x`)
- Legal: `white b0x inc.` (two words, lowercase, period)
- Sentence case for headings (`Engineering what's next`), not title case
- Acronyms keep their canonical case (`HTTP`, `SQL`, `ECDSA`)

### Punctuation
- Em dashes for emphasis are allowed but used sparingly (max one per paragraph)
- No Oxford comma in marketing copy (technical docs keep it)
- No exclamation marks anywhere — ever
- Ellipses only in transcribed speech

---

## 3. Color

### The palette

The brand operates on a 60-30-10 distribution. Anchored on near-black, with off-white doing the work, and a single warm gold as the only chromatic accent.

| Role | Token | Hex | OKLCH |
|------|-------|-----|-------|
| Background (60%) | `--color-ink-1000` | `#030508` | `oklch(0.03 0.007 245)` |
| Foreground (30%) | `--color-text-primary` | `#f5f5f5` | `oklch(0.96 0 0)` |
| Brand glow (10%) | `--color-aureate-200` | `#ffd9a0` | `oklch(0.91 0.078 78)` |
| Brand focus | `--color-aureate-400` | `#d4a574` | `oklch(0.78 0.108 73)` |
| Secondary accent | `--color-cerulean-400` | `#38bdf8` | `oklch(0.78 0.131 232)` |

Full scales and semantic colors are in [tokens/colors.json](./tokens/colors.json).

### Usage rules

- **Pure black (`#000000`) is forbidden.** Use `--color-ink-1000` which has a subtle cool tint.
- **Pure white (`#ffffff`) is forbidden.** Use `--color-text-primary` (`#f5f5f5`).
- **Gold is the only chromatic accent.** Reserve it for CTAs, focus rings, the hero glow, and the cube grid shader. Do not introduce additional brand colors.
- **Cerulean is the exception, not a primary.** Use only for info states, code highlight tokens, and where the existing cube fill light tone is referenced.
- **Tailwind defaults are forbidden** — they undermine the brand palette. Use the `ink`, `aureate`, `cerulean` tokens.

### Accessibility

All foreground/background combinations in the palette exceed WCAG AAA contrast on the brand background.

| Foreground | on `--color-ink-1000` | Ratio | Verdict |
|-----------|----------------------|-------|---------|
| `#f5f5f5` (text-primary) | 17.74:1 | AAA |
| `rgba(245,245,245,0.7)` (text-secondary) | 11.20:1 | AAA |
| `rgba(245,245,245,0.5)` (text-tertiary) | 6.95:1 | AAA-large |
| `#ffd9a0` (aureate-200) | 13.49:1 | AAA |
| `#d4a574` (aureate-400) | 9.34:1 | AAA |
| `#38bdf8` (cerulean-400) | 9.05:1 | AAA |

---

## 4. Typography

### Font stack

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display, body, UI | Geist Sans (`--font-sans`) | 300 / 500 | Loaded via `next/font/google` |
| Technical, mono | Geist Mono (`--font-mono`) | 500 | The "engineering signal" font |

**No serif.** This brand does not use serifs. Tonal warmth comes from gold, not from type.

### Weight discipline

| Weight | Use |
|--------|-----|
| 100 (extra-light) | Scroll indicator labels, technical micro-copy |
| 300 (light) | Tagline, hero wordmark, breathing display type |
| 500 (medium) | Headings, body, CTAs — the default for substantive content |
| 700+ | **Forbidden.** Reads as marketing. Existing instances must be migrated to 500. |

### Type scale (Major Third, 1.25)

Fluid sizes using `clamp()` — see [tokens/design-tokens.css](./tokens/design-tokens.css) for exact values.

| Token | Mobile → Desktop | Common use |
|-------|------------------|------------|
| `--text-xs` | 12px → 13px | Captions, metadata |
| `--text-sm` | 14px → 15px | Secondary, labels |
| `--text-base` | 16px | Body |
| `--text-lg` | 18px → 20px | Lead paragraphs |
| `--text-xl` | 20px → 24px | Section subheads |
| `--text-2xl` | 24px → 32px | Section headings (h3) |
| `--text-3xl` | 32px → 44px | Page headings (h2) |
| `--text-4xl` | 40px → 60px | Hero subheads |
| `--text-5xl` | 56px → 88px | Hero display |

### Letter-spacing

| Token | Value | Where |
|-------|-------|-------|
| `--tracking-tight` | -0.025em | Headings, hero wordmark |
| `--tracking-normal` | 0 | Body |
| `--tracking-wide` | 0.05em | Small caps labels |
| `--tracking-widest` | 0.3em | Taglines, scroll indicators, mono labels |

### Tabular numerals

Apply `font-variant-numeric: tabular-nums` to any displayed number (counts, dates, prices, technical specs). Aligned columns are part of the brand's precision identity.

---

## 5. Logo system

### Primary mark: Registration (Concept B)

[concept-b-registration.svg](./assets/logo/concept-b-registration.svg)

Four corner brackets implying a square without drawing one. The "white box" IS the interior negative space.

**Why this mark wins:**
- The brand IS the void — conceptually rich
- Scales cleanly to 16px (4 simple L-shapes)
- Differentiates from every prior cube concept
- References print-production craft (registration marks)
- Works in monochrome on any background

### Alternative concepts

| Concept | File | Use when |
|---------|------|----------|
| **Registration** (primary) | `concept-b-registration.svg` | Default for all applications |
| Aperture | `concept-a-aperture.svg` | When registration feels too austere; secondary mark for editorial contexts |
| Glyph (w0 monogram) | `concept-c-glyph.svg` | When a purely typographic mark is desired |

### Variants

| File | Use |
|------|-----|
| `wordmark.svg` | Wordmark alone — for headers where the mark would compete |
| `lockup-horizontal.svg` | Mark + wordmark side-by-side — default header treatment |
| `lockup-vertical.svg` | Mark above wordmark — square crops, mobile, social avatars |

### Minimum sizes

| Format | Minimum |
|--------|---------|
| Mark (icon only) | 16px |
| Horizontal lockup | 120px wide |
| Vertical lockup | 80px wide |
| Wordmark only | 96px wide |

### Clear space

Maintain clear space equal to **one bracket-arm** (1/8 of the mark width) on all sides. The mark must never be cropped or have other elements within its clear space.

### Color treatment

| Background | Mark color | Token |
|-----------|-----------|-------|
| Dark (#030508) | White or off-white | `var(--color-text-primary)` |
| Dark, emphasis | Aureate | `var(--color-aureate-200)` or `--aureate-400` |
| Light | Dark ink | `var(--color-ink-1000)` |
| Photographic | Solid panel behind | Use mark on a `--surface-glass-strong` panel |

The default SVG uses `currentColor` — set the parent's color and the mark inherits.

### Don'ts

- Don't rotate, skew, or distort
- Don't fill the interior (the void IS the brand)
- Don't add shadows, glows (other than the hero `aureate-breathe`), or outlines
- Don't change stroke weights — they are tuned for legibility at small sizes
- Don't place on busy photographic backgrounds without a glass overlay
- Don't combine with another logomark unless explicitly in a partnership lockup
- Don't recolor outside the approved palette

### Social avatars

12 brand-aligned avatars in `assets/avatars/`. Three families optimized for circular crop at 1024×1024:

**Canonical pick:** `avatar-lockup.svg` — vertical lockup (mark + wordmark + tagline), warm radial glow. Use wherever a single avatar is requested.

| Family | Files | Use |
|--------|-------|-----|
| **A — Mark only** | `avatar-mark.svg` | Tiny contexts (Discord, Slack, GitHub); maximum legibility |
| **B — Vertical lockups** | `avatar-lockup.svg` ★, `avatar-lockup-framed.svg`, `avatar-lockup-topo.svg`, `avatar-lockup-aureate.svg` | Social profiles, email footers, presentation covers |
| **C — Aureate mark** | `avatar-aureate.svg`, `avatar-aureate-echo.svg` ★★, `avatar-aureate-grid.svg`, `avatar-aureate-bold.svg`, `avatar-aureate-echo-grid.svg`, `avatar-aureate-echo-grain.svg`, `avatar-aureate-echo-topo.svg` | Brand mark expressions without wordmark |

★ Canonical — use by default  
★★ Recommended wordmark-free alternative (`avatar-aureate-echo.svg` — three concentric rings, aperture motif)

**Palette used across all avatars:** `#030508` background · `#f5f5f5` mark strokes · `#ffd9a0` halos/grid lines · `#e9c47a` middle rings · `#d4a574` outer rings / tagline text

**PNG rasters:** Generate via `scripts/raster-avatars.mjs` if needed for contexts that don't accept SVG.

**Public canonical:** `public/avatar.svg` → links to `brand/assets/avatars/avatar-lockup.svg`

---

## 6. Iconography

Custom icons should match these specifications:

- **ViewBox:** `0 0 24 24`
- **Style:** Stroke-based, no fills
- **Stroke:** 1.5px
- **Caps:** square (`stroke-linecap="square"`)
- **Joins:** miter (`stroke-linejoin="miter"`)
- **Color:** `currentColor`
- **Padding:** 2px clear space from viewBox edges

When using a library, prefer **Lucide** with `strokeWidth={1.5}` and `strokeLinecap="square"`. Override the default `round` caps to match the brand's precision feel.

Use icons sparingly. The brand's iconography is restrained — icons appear only when they replace text, not when they decorate it.

---

## 7. Motion identity

### Principles

1. **Reduced amplitude** — entrances move 24px, not 60px. The brand moves like a watchmaker, not a TikTok.
2. **Deliberate durations** — 600ms maximum for entrances. No luxurious slow-mo except the signature breathe.
3. **One signature** — `aureate-breathe` is the only ambient animation. Everything else supports it.
4. **Respect `prefers-reduced-motion`** — fall back to instant.

### Easing curves

| Token | Use |
|-------|-----|
| `--ease-precise` | Layout transitions, modals, drawers |
| `--ease-out-quart` | Entrance reveals (default) |
| `--ease-in-out` | Ambient loops (breathing) |
| `--ease-mechanical` | Interactive feedback (hover, focus) |
| `--ease-linear` | Continuous rotation (3D cube, shaders) |

### Duration tokens

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 150ms | Hover, focus ring, color changes |
| `--duration-base` | 250ms | Default transitions |
| `--duration-slow` | 600ms | Entrance reveals |
| `--duration-ambient` | 4000ms | Breathing (signature only) |

### Signature: `aureate-breathe`

A three-layer gold text-shadow that pulses opacity every 4 seconds. Applied to the hero wordmark and selected focal text. Reads as: the mark is alive, the studio is awake, precision is breathing.

```css
.aureate-breathe {
  animation: aureate-breathe var(--duration-ambient) var(--ease-in-out) infinite;
}
```

The 3D cube and the text breathe at the same 4-second cadence — the studio has a heartbeat.

### Entrance pattern

```js
// Default GSAP/Framer entrance — use this, not y:60/duration:0.8
from: { opacity: 0, y: 24 }
to:   { opacity: 1, y: 0 }
duration: 0.6
easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
stagger: 0.08
```

---

## 8. Surfaces and depth

The brand uses three surface treatments. **Do not introduce additional treatments.**

| Surface | Token | Where |
|---------|-------|-------|
| Void (flat) | `--color-surface-base` | Page background |
| Glass | `.surface-glass` | Cards, panels, info containers |
| Wireframe | (R3F line geometry) | Topographic background only |

**Forbidden:** gradient meshes, drop shadows, soft inner shadows, grain overlays (other than the in-canvas film grain post-processing).

### Glass utility

The brand's recurring panel treatment. Use sparingly — over-use becomes the "AI-generated SaaS" look.

```css
background: rgba(10, 13, 18, 0.6);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

## 9. The 3D scene

The brand's signature visual is the dark chrome metallic cube floating against a topographic wireframe terrain. This is not decoration — it's the brand's identity expressed as a real-time system.

### Cube
- Material: `meshStandardMaterial`, color `#1a1608` (dark warm brown-black), metalness `1.0`, roughness `0.3`
- Grid overlay: 3×3 warm gold grid shader at `vec3(1.0, 0.85, 0.63)`
- Rotation ratios: `{x: 0.83, y: 1.0, z: 0.53}` — irrational, prevents flat-face alignment
- Breathing: ±1.5% scale at 0.25 Hz (4-second period, matches `aureate-breathe`)

### Background
- Topographic wireframe terrain, HSL hue-cycling full spectrum every ~20s
- Opacity 0.20, three wave layers (broad, medium, fine)
- Distance-based radial edge fade

### Lighting
- Key: directional `#ffa040` warm amber, intensity 1.4, mouse-following
- Fill: directional `#6070a0` cool blue, intensity 0.3
- Rim: point `#ffd4a0` warm peach, intensity 0.8
- Ambient: `#1a1a2e` dark navy, intensity 0.15

### Post-processing tiers
- High/medium: Bloom + ChromaticAberration + Film grain + Vignette
- Low/degraded: Bloom only

Don't change the cube material or lighting rig without explicit reason — these values define the brand's perceptual surface.

---

## 10. Open Graph and social

### Image specs

| Platform | Dimensions | File |
|----------|-----------|------|
| Open Graph | 1200 × 630 | `assets/og/og-default.svg` |
| Twitter summary_large_image | 1200 × 675 | `assets/og/twitter-card.svg` |

### Composition rules

- Dark `--color-ink-1000` background
- Oversized registration brackets as background motif (low contrast, `#1a1f28`)
- Inner aureate brackets for accent (`#d4a574` at 85% opacity)
- Centered wordmark in Geist Sans 300, white
- Tagline in Geist Mono uppercase, aureate, widest tracking
- URL bottom-right in muted secondary
- A short aureate accent rule under the wordmark

Don't use the ETCswap-style left-aligned layout — that's used on other projects in this portfolio.

### HTML meta

```html
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-icon.png">
<meta name="theme-color" content="#030508">

<meta property="og:image" content="https://whiteb0x.com/opengraph-image">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://whiteb0x.com/twitter-image">
```

---

## 11. Layout primitives

### Spacing scale

4px base. Use the spacing tokens, not arbitrary pixel values.

```
4   8   12   16   20   24   32   40   48   64   80   96   128
```

### Section rhythm

| Context | Mobile | Desktop |
|---------|--------|---------|
| Between major sections | `py-16` | `py-24` to `py-32` |
| Within a section | `gap-8` to `gap-12` | `gap-12` to `gap-16` |
| Within a component | `gap-3` to `gap-6` | `gap-4` to `gap-8` |

### Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Focus rings |
| `--radius-md` | 8px | Buttons (default) |
| `--radius-lg` | 12px | Inputs |
| `--radius-xl` | 16px | Cards |
| `--radius-2xl` | 24px | Large panels |

Do not use `--radius-full` for anything other than circles (avatars, dots). The brand does not use pill-shaped buttons.

### Container

Don't use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — it's the Tailwind/Next.js default and recognizable. Use intentional max-widths per section. The hero is full-bleed; content sections use `max-w-2xl` or `max-w-3xl` for reading.

---

## 12. Maintenance

### Quarterly review

- Audit asset consistency across platforms (favicon, OG, social profiles)
- Re-check competitive landscape — has Linear, Vercel, or a peer shifted into our position?
- Audit token drift — are components using off-brand values?
- Verify `aureate-breathe` still appears only where intended

### Versioning

Brand assets are versioned with this document. Increment major version on any change to:
- Primary mark
- Brand color anchors
- Voice rules
- Differentiation statement

Increment minor for refinements (new variants, asset additions, scale extensions).

---

## 13. Files

| File | Purpose |
|------|---------|
| [DESIGN-BRIEF.md](./DESIGN-BRIEF.md) | Strategic context, design axes, competitive audit |
| [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) | One-page developer cheat sheet |
| [tokens/colors.json](./tokens/colors.json) | Machine-readable palette |
| [tokens/motion.json](./tokens/motion.json) | Animation tokens |
| [tokens/design-tokens.css](./tokens/design-tokens.css) | CSS custom properties + Tailwind @theme |
| [assets/logo/](./assets/logo/) | SVG logo variants |
| [assets/favicon/](./assets/favicon/) | Favicon SVGs |
| [assets/og/](./assets/og/) | OG and Twitter card SVGs |
| [assets/avatars/](./assets/avatars/) | 12 social avatar SVGs (3 families) |
| [assets/social/](./assets/social/) | Social header and card SVGs |
