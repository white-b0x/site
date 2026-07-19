# GitHub Copilot Instructions: whiteb0x.com

This file is self-contained on purpose. Only some Copilot surfaces also read
[`AGENTS.md`](../AGENTS.md) — VS Code Chat, the cloud agent, code review and the
CLI do; Chat on github.com, JetBrains, Eclipse, Xcode and Visual Studio do not.
On those, this file is the only instruction Copilot gets, so everything that
matters is restated here.

Where both are read, both are supplied to the model — neither is dropped. So the
rule is **keep the two in agreement**, not "one overrides the other." If they
ever conflict, fix the conflict rather than relying on precedence: it differs by
surface, and github.com actually ranks *this* file above `AGENTS.md`.

`AGENTS.md` carries the same contract with more depth on architecture.

## Project

Single-page landing site for white b0x inc., a development studio. A fixed
full-screen React Three Fiber scene with scrollable HTML layered over it. No
backend, no database, no API routes, no test suite.

## Stack and commands

| Technology | Version |
|---|---|
| Node.js | >=24 |
| pnpm | 10.28.2 (pinned via `packageManager`) |
| Next.js | 16.2.6 (App Router) |
| React | 19.2.3 |
| TypeScript | 5.x strict |
| Tailwind CSS | 4.x (CSS-first — there is no `tailwind.config.ts`) |
| three.js | 0.182.x via React Three Fiber 9 + drei 10 |

```bash
pnpm dev          # Dev server (Turbopack is the Next 16 default)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

Never suggest Node 22, Next.js 14/15, or React 18. There is no `pnpm test`.

## Performance budgets — hard constraints

This is a heavy WebGL page. LCP < 2.5s · INP < 200ms · CLS < 0.1 · 60fps desktop ·
30fps mobile floor. Quality tiers come from `useDeviceCapability`: high (desktop,
80 topo segments, full post-processing) · medium (tablet, 60) · low (mobile, 40,
post-processing off, DPR capped to 1). `PerformanceMonitor` and `AdaptiveDpr`
degrade further at runtime.

Adding geometry, lights, or post-processing without checking the mobile tier is
the most likely way to regress this site.

## Key rules

1. Server Components by default; `'use client'` only for R3F, hooks, event
   handlers, and browser APIs.
2. Never import the 3D scene into a Server Component — it is dynamically imported
   with `ssr: false`.
3. Respect `prefers-reduced-motion` in any new animation (`useReducedMotion`).
4. Keep 3D additions behind the existing quality tiers — mobile runs 40 topo
   segments with post-processing off and DPR capped to 1.
5. Run `pnpm lint && pnpm typecheck` before committing. There is no CI, and a
   push to `main` deploys to production via Vercel.

## Code style

Single quotes, semicolons, 2-space indent, trailing commas in multiline. There is
no Prettier config — style is convention, so match the surrounding file rather
than reformatting it.

## Protected files

Do not modify without an explicit request: `package.json`, `pnpm-lock.yaml`,
`tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`.
Do not edit `ideation/` at all — it is historical design reference.

## Don't

- Commit `.env` files or secrets.
- Use `any` without justification, or `@ts-ignore` to silence an error.
- Disable ESLint rules inline to make a check pass.

## Copilot workflow notes

- `@workspace` for cross-file questions — useful here for tracing how a hook
  feeds the R3F components.
- `Ctrl+I` inline chat for local edits; sidebar chat for architectural questions.
- `/explain` is worth using on the GLSL in `TopoBackground.tsx` before editing it.
- Ask for a review before committing 3D changes: shader and quality-tier
  regressions do not surface in lint or typecheck.

## Response style

Code first. No pleasantries, no restating the prompt, concise bullets over
paragraphs.
