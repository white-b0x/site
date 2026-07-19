# GitHub Copilot Instructions: whiteb0x.com

**[`AGENTS.md`](../AGENTS.md) at the repository root is the authoritative agent
contract.** Copilot reads it alongside this file. Read it first — it carries the
full stack, structure, architecture, performance budgets, and boundaries. Where
the two disagree, `AGENTS.md` wins and this file is the one to fix.

This file holds the quick summary plus the Copilot-specific workflow notes.

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
