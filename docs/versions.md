# Dependency Versions

> Verified: 2026-02-02
> Method: Resolved from `pnpm list --depth=0` after installation

## Runtime

| Package | Version | Official Source |
|---------|---------|-----------------|
| Node.js | 24.13.0 | [nodejs.org](https://nodejs.org/) |
| pnpm | 10.28.2 | [pnpm.io](https://pnpm.io/) |

## Framework

| Package | Version | Official Source |
|---------|---------|-----------------|
| Next.js | 16.1.6 | [nextjs.org](https://nextjs.org/) |
| React | 19.2.3 | [react.dev](https://react.dev/) |
| React DOM | 19.2.3 | [react.dev](https://react.dev/) |
| TypeScript | 5.9.3 | [typescriptlang.org](https://www.typescriptlang.org/) |

## Styling

| Package | Version | Official Source |
|---------|---------|-----------------|
| Tailwind CSS | 4.1.18 | [tailwindcss.com](https://tailwindcss.com/) |

## 3D Graphics

| Package | Version | Official Source |
|---------|---------|-----------------|
| Three.js | 0.182.0 | [threejs.org](https://threejs.org/) |
| @react-three/fiber | 9.5.0 | [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber/) |
| @react-three/drei | 10.7.7 | [github.com/pmndrs/drei](https://github.com/pmndrs/drei) |
| @react-three/postprocessing | 3.0.4 | [github.com/pmndrs/react-postprocessing](https://github.com/pmndrs/react-postprocessing) |

## Animation

| Package | Version | Official Source |
|---------|---------|-----------------|
| GSAP | 3.14.2 | [gsap.com](https://gsap.com/) |
| Lenis | 1.3.17 | [github.com/darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) |
| Framer Motion | 12.30.0 | [framer.com/motion](https://www.framer.com/motion/) |

## Utilities

| Package | Version | Official Source |
|---------|---------|-----------------|
| Resend | 6.9.1 | [resend.com](https://resend.com/) |
| Zod | 4.3.6 | [zod.dev](https://zod.dev/) |

## Verification Command

```bash
pnpm check:versions
```

This runs `scripts/print-versions.mjs` which outputs all resolved versions from the installed dependencies.
