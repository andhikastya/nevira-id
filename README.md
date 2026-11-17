# Nevira — Website (3D scroll diorama)

Next.js 16 + Tailwind 4 + React Three Fiber. Design system: Kilau (Red Hat Text, one purple, gold only for Saldo Koin).

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
```

## Pages

`/` beranda · `/fitur` (clickable town map) + seven feature pages `/fitur/<slug>` · `/harga` · `/bantuan` · `/tentang` ·
`/kontak` · `/legal/syarat-ketentuan` · `/legal/kebijakan-privasi`. Layout follows the Figma wireframe "Opsi A"
(file `fqJnsJjKacZkcWK5CPCLkm`, node `439:23`).

## Where things live

- `app/layout.tsx` — shared chrome: backdrops, the 3D canvas (`SceneRoot`), `ScrollDriver`, `Nav`, `Footer`.
  Because it lives in the root layout, the town persists across client navigation; only the camera moves.
- `content/copy.ts` — home page copy, nav, footer, links.
- `content/features.ts` — the seven feature pages (data only; rendered by `components/sections/feature/FeaturePage.tsx`).
- `content/pages.ts` — harga, bantuan, tentang, kontak copy.
- `content/screens.ts` — set `SCREENS_READY = true` after adding real screenshots to `public/screens/`
  (`pos-kasir.png`, `pos-produksi.png`, `pos-kurir.png`, `admin.png`, ~16:10).
- `components/three/stations.ts` — camera framing + scene mood per section (`data-station`).
  `FEATURE_STATIONS` holds the four poses (hero + 3 stations) per feature page; a station may set `focus`
  to borrow another station's flourish (owner tooltip, courier lines, Saldo Koin glow).
- `components/three/world/*` — the procedural low-poly town. Per-page set pieces mount only on their page
  (`usePage(heroStation)` in `world/kit.tsx`): `KasirScene`, `ProduksiScene`, `ShopExtras` (attendance terminal,
  absensi + petty cash, courier hand-off), `OfficeScreens` (desk monitor content per station), `SelfService`
  (laundromat building + session scene), `PagePieces` (map pins, help-tower question marks, outlet pins).
  Each page has its own light (`SceneParams.morning` / `dusk`) — see the mood constants in `stations.ts`.
- `content/legal.ts` — Indonesian legal texts copied verbatim from nevira.id (2026-11-17).
- `components/ScrollDriver.tsx` — Lenis smooth scroll + scroll → station progress; re-measures on route change
  and ignores routes Next keeps mounted but hidden.

## Behaviour

- 3D is skipped for `prefers-reduced-motion`, missing WebGL, or `?no3d`; pages then show screenshots (`no3d-only`).
- Phones / coarse pointers get the light tier (no shadows, lower DPR); `PerformanceMonitor` drops DPR on slow devices.
- Rendering pauses while any `[data-opaque]` section fully covers the viewport (FAQ, help, contact, price details).

## Claims policy

Copy only states features found in the `lessworry-fe` / `lessworry-mobile` repos. Not claimed on purpose:
automatic WhatsApp notifications (menu says "Coming Soon"), couriers taking payment, stock/inventory.

## Before launch

- Placeholders: WhatsApp number (`LINKS.whatsapp`), testimonials + stats (`PROOF`).
- Team must confirm or supply (nothing is flagged on the site itself):
  - Saldo Koin tariffs still valid.
  - Self-service availability for all merchants.
  - FAQ answers: monthly fee, how self-service bills are calculated.
  - Kontak: real WhatsApp number (`LINKS.whatsapp`).
  - Offline mode before mentioning it anywhere.
  - Tentang: timeline, real stats, legal entity & address. Kontak: office hours.
- Real screenshots (see `content/screens.ts`).
- Social links in the footer (wireframe shows Instagram · Facebook · YouTube) need real URLs.

## Where features live (don't mix them up)

- **Petty cash** = kas kecil outlet (record income/expense, daily summary, PIN check). In the back office it sits under
  *Pengaturan*, not *Karyawan*; in the mobile app it is its own module (tablet POS routes + a self-service variant).
  On the site it belongs to **Kasir & POS Tablet** (and Back Office settings), not to Karyawan & Absensi.
- **Karyawan & Absensi** = attendance (GPS, QR, RFID, NIP), attendance/performance reports, employee list, access levels.

## Waiting on release

- **Laporan Kurir** — back office `/laporan-kurir` (delivery KPIs, per-courier performance, daily trend, per-outlet
  volume) exists in `lessworry-fe` but is hidden on production until it passes QA on staging
  (see `src/lib/constants/menu.tsx` there). The site deliberately only mentions delivery history for now.
  Once the menu ships to production, add it to `content/features.ts` (`antar-jemput` and `back-office`
  capabilities) and, optionally, a "Laporan kurir" screen in `components/three/world/OfficeScreens.tsx`.
