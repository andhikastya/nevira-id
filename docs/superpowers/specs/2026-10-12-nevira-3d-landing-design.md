# Nevira Landing Page — 3D Scroll Diorama (Kilau Design System)

## Context

nevira.id (laundry-business SaaS: Website Admin, POS Kasir, POS Produksi, POS Kurir, pay-per-use Saldo Koin) has a weak story:
- The hero talks to consumers, but the features and pricing talk to owners.
- No problem framing, no proof, and features are repeated twice.
- Dead CTAs: "Coba Gratis" goes nowhere, and the main CTA points to Login.
- Pricing (Rp50–500 per action) has no monthly estimate.

The goal is a new landing page that balances wow factor with conversion:
- A low-poly 3D "Kota Nevira" diorama in three.js, with the camera driven by scroll.
- Inspired by meet.farismuhtadi.com, whose models are built from primitives in code with cheap visual tricks. Faris is an explorable game; we chose a scroll format instead.
- The story runs from hero to footer, aimed at **laundry owners**.
- Design system: **Kilau**. Brand purple `#5A379D` ≈ Kilau `#5B369E`, and Red Hat Text is already in use.

Decisions agreed:
- Scroll diorama, one fixed canvas.
- Owner audience.
- Next.js + R3F.
- Indonesian copy, light mode first.
- Real app screenshots are available. Testimonials, numbers and the WhatsApp number are clearly marked placeholders.

## Approach

- **One fixed `<Canvas>`** behind the page, holding one world ("Kota Nevira").
- Each HTML section is a **camera station**. ScrollTrigger maps scroll progress to camera keyframes plus "scene state" scalars, and `useFrame` damps toward them.
- All copy is real HTML on top of the canvas, so SEO, a11y and the no-3D fallback come for free.
- Kilau rules applied:
  - Purple = action only.
  - **Gold only for Saldo Koin** (the coin value and the 3D coin stack).
  - Gradient allowed only in the hero stage.
  - Radius ≤16, Red Hat Text only, Remix Icon.
  - No emoji in headings.

## Story (section = camera station)

| # | Section | 3D station | Content |
|---|---|---|---|
| 1 | Hero | Wide shot of the living mini town (van driving, machines spinning) | Headline e.g. "Laundry Anda rapi, dari terima sampai antar." CTA **Coba Gratis** → `https://backoffice.nevira.id/daftar-baru`; secondary "Lihat cara kerjanya" (scroll) |
| 2 | Masalah | Zoom into a chaotic, desaturated shop: scattered receipts, WA bubbles, a lost bag | 3 pain cards: nota hilang, kurir nyasar, laba tak jelas |
| 3 | Titik balik | Nevira hub appears; papers fly into a tablet; color returns (wow moment) | "Satu sistem untuk semuanya" |
| 4 | Perjalanan order (pinned, scrubbed) | 5 sub-stops, each with a real screenshot on a 3D screen | Terima (POS Kasir) → Proses (POS Produksi) → Antar (POS Kurir, van route) → Notif (WA to customer) → Laporan (Website Admin, chart rises). Replaces the duplicated Features + System Environment |
| 5 | Semua terhubung | Top-down view: 4 buildings + glowing lines to the hub | Compact module grid |
| 6 | Saldo Koin | Gold coin stack grows with the slider | Kilau slider "transaksi/bulan" → monthly estimate in gold; transparent formula + toggles (print, WA); Rp100/500/75/50 rate table |
| 7 | Bukti | Town at dusk, many shops lit | Testimonials + numbers (**PLACEHOLDER**) |
| 8 | FAQ | Calm idle scene | Kilau accordion, rewritten for owners + new questions: keamanan data, onboarding, printer/hardware, migrasi data |
| 9 | CTA akhir | Shop sign lights up "Buka" | Coba Gratis + WhatsApp (**PLACEHOLDER number**) |
| 10 | Footer | — | Working links only (Login, Daftar, Terms, Privacy, help@nevira.id); no `#` placeholders |

Nav: logo, anchors (Cara Kerja, Harga, FAQ), Masuk (secondary), Coba Gratis (primary).

## Tech stack

- Next.js 16 (App Router, TS) + Tailwind 4 + pnpm, following `../laundrytogo-lp`.
- `three`, `@react-three/fiber`, `@react-three/drei`.
- `gsap` + `@gsap/react` (ScrollTrigger), `lenis`, `zustand` (scroll/scene state).
- Fonts: `next/font/google` Red_Hat_Text (400/500/600/700). Icons: `remixicon`.

## File structure (in `nevira-lp/`)

```
app/layout.tsx            fonts, metadata, OG, JSON-LD
app/page.tsx              section order
app/globals.css           Kilau tokens (from kilau-design/references/platform-mapping.md) in @theme
content/copy.ts           all copy; placeholders flagged `PLACEHOLDER`
content/faq.ts
components/ui/            Button, Badge, Card, Chip, Accordion, Slider (specs from components.md)
components/sections/      Nav, Hero, Problem, Turn, Journey, Connected, Pricing, Proof, Faq, FinalCta, Footer
components/three/
  SceneRoot.tsx           dynamic(ssr:false) fixed Canvas, quality tier, visibility pause
  CameraRig.tsx           damped lerp between stations
  stations.ts             camera keyframes per station {pos, target, fov} + scene state
  palette.ts              scene colors derived from Kilau tokens
  world/                  Town, Shop, Machine, Van, House, Office, Hub, Coins, Papers, Trees (primitives + InstancedMesh)
  ScreenPanel.tsx         screenshot texture on 3D screen
lib/scroll.ts             Lenis ↔ ScrollTrigger sync, section→station triggers
lib/sceneStore.ts         zustand: station, progress, chaos, saturation, dusk, coinHeight
public/screens/           user's real screenshots (pos-kasir, pos-produksi, pos-kurir, wa-notif, admin)
public/fallback/          static render per station (no-WebGL / reduced-motion)
```

## Phases

0. **Setup.**
   - `git init`, scaffold Next 16 + Tailwind 4.
   - Kilau tokens in `globals.css`, plus fonts and Remix Icon.
   - UI primitives per `components.md`.
1. **HTML story first.**
   - All 10 sections with final Indonesian copy and working links.
   - The page must stand complete *without* 3D. This is the baseline fallback.
2. **Scroll infrastructure + blockout.**
   - Lenis + ScrollTrigger, fixed canvas.
   - Camera rig flying between grey-box stations. Tune pacing here before modeling.
3. **World modeling.**
   - Low-poly procedural town per station, Kilau-tinted palette.
   - Fake glow sprites, contact-shadow discs, frozen shadow map (Faris tricks).
4. **Scene states + Journey.**
   - Chaos/desaturation (2→3), pinned 5-step journey with screenshot screens, connected lines (5), dusk + lit shops (7), "Buka" sign (9).
5. **Saldo Koin.**
   - Slider calculator, gold estimate, instanced coin stack bound to the store.
6. **Performance & fallback.**
   - DPR cap at 1.6 plus drei `PerformanceMonitor` to drop it.
   - Mobile quality tier with fewer props.
   - Pause when the tab is hidden.
   - Mount the canvas after the hero text paints (LCP).
   - `prefers-reduced-motion` or no WebGL: don't mount the canvas, show `public/fallback/*` images instead.
7. **Polish + QA.**
   - Kilau squint test, a11y (focus rings, `aria-hidden` canvas, contrast), meta/OG.
   - Afterwards, copy this spec to `docs/superpowers/specs/2026-10-12-nevira-3d-landing-design.md`.

## Inputs needed from the user (not blocking phases 0–3)

- Real screenshots: POS Kasir, POS Produksi, POS Kurir, WA notification, Admin dashboard.
- Logo as SVG if available. The current one is a PNG.
- Later: WhatsApp number, testimonials, numbers, partner logos. They stay as placeholders until then.

## Verification

- `pnpm build` passes with no type or lint errors.
- `pnpm dev` + the in-app browser pane:
  - Scroll every station on desktop and on the `mobile` preset, screenshotting each.
  - Check that camera transitions are smooth and the journey pin doesn't jump.
  - Console must show 0 errors.
- Emulate `prefers-reduced-motion` and a no-WebGL case: the page reads fully with fallback images.
- Performance: stable FPS on desktop (r3f-perf in dev only). On mobile, the DPR drops automatically.
- Links: Coba Gratis → daftar-baru, Masuk → login, Terms/Privacy work, no `href="#"` left.
- Kilau audit: gold appears only on Saldo Koin, only Red Hat Text is used, card radius ≤16, no emoji in headings.
