# whiteb0x — Quick Reference

One-page cheat sheet. Read [BRAND-GUIDELINES.md](./BRAND-GUIDELINES.md) for the rationale.

---

## Colors (cheatsheet)

```css
/* Brand anchors */
--color-background:    #030508;  /* near-black with cool tint */
--color-foreground:    #f5f5f5;  /* off-white */
--color-aureate-200:   #ffd9a0;  /* brand glow (10% accent) */
--color-aureate-400:   #d4a574;  /* brand focus ring */
--color-cerulean-400:  #38bdf8;  /* secondary, sparingly */

/* Glow tokens */
--glow-aureate-soft:   rgba(255, 217, 160, 0.15);
--glow-aureate-medium: rgba(255, 217, 160, 0.30);

/* Surfaces */
--color-surface-glass: rgba(10, 13, 18, 0.6);  /* + backdrop-blur(20px) */
--color-border:        rgba(255, 255, 255, 0.08);
```

**60-30-10:** ink-1000 (60%) → text-primary (30%) → aureate (10%).
**Forbidden:** `#000`, `#fff`, Tailwind defaults (slate/gray/amber/sky).

Full palette → [tokens/colors.json](./tokens/colors.json)

---

## Typography

```css
font-family: var(--font-sans);  /* Geist Sans */
font-family: var(--font-mono);  /* Geist Mono — for technical signals only */
```

| Weight | Use |
|--------|-----|
| 300 | Tagline, hero wordmark |
| 500 | Body, headings, CTAs (default) |
| ~~700~~ | **Forbidden** — reads as marketing |

```css
font-variant-numeric: tabular-nums;  /* always on displayed numbers */
letter-spacing: -0.025em;            /* headings */
letter-spacing: 0.3em;               /* uppercase taglines */
```

---

## Logo

| Asset | File | Use |
|-------|------|-----|
| Mark (primary) | [`logo/concept-b-registration.svg`](./assets/logo/concept-b-registration.svg) | Default — corner brackets, currentColor |
| Mark (alt 1) | [`logo/concept-a-aperture.svg`](./assets/logo/concept-a-aperture.svg) | Frame + viewfinder lines |
| Mark (alt 2) | [`logo/concept-c-glyph.svg`](./assets/logo/concept-c-glyph.svg) | w0 monogram |
| Wordmark | [`logo/wordmark.svg`](./assets/logo/wordmark.svg) | Standalone wordmark |
| Lockup H | [`logo/lockup-horizontal.svg`](./assets/logo/lockup-horizontal.svg) | Header default |
| Lockup V | [`logo/lockup-vertical.svg`](./assets/logo/lockup-vertical.svg) | Mobile, square crops |

**Minimum sizes:** mark 16px · horizontal lockup 120px · vertical lockup 80px
**Clear space:** 1 bracket-arm (1/8 of mark width) on all sides
**Don't:** rotate, fill the interior, add shadows/glows, recolor outside palette

---

## Motion

```css
/* Easings */
--ease-precise:     cubic-bezier(0.32, 0.72, 0, 1);     /* Apple-style */
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);      /* entrance default */
--ease-in-out:      cubic-bezier(0.65, 0, 0.35, 1);     /* loops */
--ease-mechanical:  cubic-bezier(0.4, 0, 0.6, 1);       /* hover/focus */

/* Durations */
--duration-fast:    150ms;   /* hover, focus */
--duration-base:    250ms;   /* default transitions */
--duration-slow:    600ms;   /* entrances — NOT 800ms */
--duration-ambient: 4000ms;  /* breathing signature */
```

**Entrance pattern (use this — don't copy old GSAP defaults):**
```js
from: { opacity: 0, y: 24 }  // not y: 60
to:   { opacity: 1, y: 0 }
duration: 0.6                // not 0.8
easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
stagger: 0.08
```

**Signature:** `.aureate-breathe` — 4s gold text-shadow pulse. Apply to hero wordmark only.

Full motion tokens → [tokens/motion.json](./tokens/motion.json)

---

## Surfaces

```css
.surface-glass {
  background: var(--color-surface-glass);    /* rgba(10,13,18,0.6) */
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);     /* 8% white */
}
```

**Framed variant** — adds registration mark corner brackets to any glass card:
```css
/* add 'glass-framed' class to any .glass element */
/* renders 1.5px aureate corner brackets via ::before pseudo-element */
```

**Gold grid texture** — near-invisible 80px grid referencing the cube's GLSL shader:
```css
.grid-bg-aureate {  /* apply to section backgrounds */
  background-image: linear-gradient(rgba(255,217,160,0.032) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,217,160,0.032) 1px, transparent 1px);
  background-size: 80px 80px;
}
```

**Forbidden:** drop shadows, gradient meshes, inner shadows, large radii on buttons.

---

## Spacing

4px base. Use tokens, not arbitrary px.
```
--space-1  4px    --space-6   24px   --space-16  64px
--space-2  8px    --space-8   32px   --space-20  80px
--space-3  12px   --space-10  40px   --space-24  96px
--space-4  16px   --space-12  48px   --space-32  128px
```

| Context | Mobile | Desktop |
|---------|--------|---------|
| Section padding | `py-16` | `py-24` – `py-32` |
| Within section | `gap-8` | `gap-12` |
| Within component | `gap-3` – `gap-6` | `gap-4` – `gap-8` |

---

## Radius

```
--radius-sm   4px    (focus rings)
--radius-md   8px    (buttons — default)
--radius-lg   12px   (inputs)
--radius-xl   16px   (cards)
--radius-2xl  24px   (large panels)
```

**Don't:** pill-shaped buttons. Use `--radius-md`.

---

## Social Avatars

**Canonical:** [`assets/avatars/avatar-lockup.svg`](./assets/avatars/avatar-lockup.svg) — also at `public/avatar.svg`

| Pick | File | When |
|------|------|------|
| Default | `avatar-lockup.svg` | Any social profile |
| Icon-only | `avatar-mark.svg` | Small 20–32px contexts |
| No wordmark | `avatar-aureate-echo.svg` | When mark alone reads better |
| Most textured | `avatar-lockup-topo.svg` | Decks, editorial use |

All 12 in `brand/assets/avatars/`. 1024×1024, circular-crop safe.

---

## Voice — words to use / never use

**Use:** build · ship · engineer · design · system · protocol · application · precise · deliberate · production · scale

**Never:** solutions · journey · transform · leverage · synergy · cutting-edge · revolutionary · powerful · robust · world-class · empower · enable · "passionate about"

---

## HTML meta

```html
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-icon.png">
<meta name="theme-color" content="#030508">

<meta property="og:image" content="https://whiteb0x.com/opengraph-image">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<meta name="twitter:card" content="summary_large_image">
```

---

## Files

```
brand/
├── DESIGN-BRIEF.md         ← strategy + axes
├── BRAND-GUIDELINES.md     ← full rules
├── QUICK-REFERENCE.md      ← this file
├── tokens/
│   ├── colors.json
│   ├── motion.json
│   └── design-tokens.css   ← @theme block ready to import
├── assets/logo/            ← 3 concepts + wordmark + lockups
├── assets/favicon/         ← SVG (currentColor + aureate)
├── assets/og/              ← OG 1200×630 + Twitter 1200×675
├── assets/avatars/         ← 12 social avatars (3 families, 1024×1024)
└── assets/references/      ← prior concepts (don't use)
```

---

## Quick wire-up

```css
/* app/globals.css */
@import "../brand/tokens/design-tokens.css";

/* now use brand tokens everywhere */
body {
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

.hero-text {
  /* replace breathe-glow with the formal signature */
  @apply aureate-breathe;
}
```

**Version:** 1.0 · **Last updated:** 2026-05-22
