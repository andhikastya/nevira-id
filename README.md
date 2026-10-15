# Nevira — Landing Page (3D scroll diorama)

Next.js 16 + Tailwind 4 + React Three Fiber. Design system: Kilau (Red Hat Text, one purple, gold only for Saldo Koin).

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
```

## Where things live

- `content/copy.ts` — all copy and links. Items marked `placeholder` show a red **PLACEHOLDER** tag in dev; replace before launch.
- `content/screens.ts` — set `SCREENS_READY = true` after adding real screenshots to `public/screens/`
  (`pos-kasir.png`, `pos-produksi.png`, `pos-kurir.png`, `admin.png`, ~16:10).
- `components/sections/*` — the 10-section story (HTML, works without 3D).
- `components/three/stations.ts` — camera framing + scene mood per section (`data-station`).
- `components/three/world/*` — the procedural low-poly town.
- `components/ScrollDriver.tsx` — Lenis smooth scroll + scroll → station progress.

## Behaviour

- 3D is skipped for `prefers-reduced-motion`, missing WebGL, or `?no3d`; the hero then shows `public/fallback/hero.webp`.
- Phones / coarse pointers get the light tier (no shadows, lower DPR); `PerformanceMonitor` drops DPR on slow devices.
- Rendering pauses while the FAQ fully covers the viewport.

## Before launch

- Replace placeholders: WhatsApp number (`LINKS.whatsapp`), testimonials + stats (`PROOF`).
