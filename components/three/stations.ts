import { PLACES, at, front, localPoint, type Place } from "./layout";

/**
 * Camera + scene state per story station. Sections declare `data-station`;
 * scroll position blends between consecutive stations in DOM order.
 */
export type SceneParams = {
  /** 0 = calm, 1 = paper chaos around the shop (Problem). */
  chaos: number;
  /** 0 = desaturated grey world, 1 = full color. */
  color: number;
  /** 0..1 reveal of the Nevira hub + data lines. */
  hub: number;
  /** 0 = day, 1 = dusk with lit windows. */
  dusk: number;
  /** 0..1 "Buka" sign glow. */
  sign: number;
  /** 0 = neutral daylight, 1 = low, warm early-morning light. */
  morning: number;
};

type V3 = [number, number, number];

export type Station = {
  pos: V3;
  target: V3;
  fov: number;
  /** Horizontal framing shift (-1..1): positive pushes the subject right, leaving room for left-side copy. */
  shift: number;
  scene: SceneParams;
  /** Track the courier: pos = [radial, height, tangential] offset from its live position; target = [_, height, _]. */
  followVan?: boolean;
  /** Borrow another station's flourishes (live.focus), e.g. the owner tooltip on a feature page. */
  focus?: string;
};

const DAY: SceneParams = { chaos: 0, color: 1, hub: 1, dusk: 0, sign: 0, morning: 0 };
/** Shop just opened: warm low sun, "BUKA" sign lit. */
const MORNING: SceneParams = { ...DAY, morning: 1, sign: 0.8 };
/** Per-page moods, so the same town reads differently on every feature page. */
const NOON = DAY;
const AFTERNOON: SceneParams = { ...DAY, morning: 0.7, dusk: 0.12 };
const EVENING: SceneParams = { ...DAY, dusk: 0.45, sign: 0.6 };
const NIGHT: SceneParams = { ...DAY, dusk: 0.75, sign: 1 };
const EARLY: SceneParams = { ...DAY, morning: 1 };

type Shot = {
  dist: number;
  h: number;
  side?: number;
  ty?: number;
  /** Aim at this point in the place's local frame instead of its center. */
  look?: [number, number, number];
  fov?: number;
  shift: number;
  focus?: string;
  scene?: SceneParams;
};

/** Camera framing a place from the front. Positive `shift` leaves room for a left-hand panel, negative for a right-hand one. */
function shot(place: Place, o: Shot): Station {
  return {
    pos: front(place, o.dist, o.h, o.side ?? 0),
    target: o.look ? localPoint(place, o.look) : at(place, o.ty ?? 1.2),
    fov: o.fov ?? 34,
    shift: o.shift,
    scene: o.scene ?? DAY,
    focus: o.focus,
  };
}

/**
 * Feature pages (/fitur/<slug>): a hero pose plus three station poses, panels alternating left/right.
 * Self-service and karyawan use stand-in buildings until their own 3D assets exist (phase 3) —
 * swap the poses here, nothing else needs to change.
 */
export const FEATURE_STATIONS = {
  // Interior set piece: world/KasirScene.tsx. Morning; dolly straight in from the door.
  "kasir-pos": [
    shot(PLACES.shop, { dist: 13, h: 6, side: 2.5, shift: 0.45, scene: MORNING }),
    // 1: close-up of the POS tablet (catalogue, tiered prices)
    shot(PLACES.shop, { dist: 4.6, h: 2.5, side: 0.2, look: [0.5, 1.55, 0.5], fov: 30, shift: 0.4, scene: MORNING }),
    // 2: customer pays at the counter (QRIS stand), panel on the right
    shot(PLACES.shop, { dist: 6.2, h: 2.8, side: -1.8, look: [0.1, 1.35, 0.7], shift: -0.4, scene: MORNING }),
    // 3: receipt printer; seen from the left so the "BUKA" sign doesn't block it
    shot(PLACES.shop, { dist: 4.2, h: 2.6, side: -1.4, look: [1.3, 1.45, 0.55], fov: 30, shift: 0.4, scene: MORNING }),
  ],
  // world/ProduksiScene.tsx. Midday; the camera tracks along the row of machines.
  produksi: [
    shot(PLACES.workshop, { dist: 7.5, h: 3.6, side: 2, look: [0, 1.1, -0.6], shift: 0.45, scene: NOON }),
    shot(PLACES.workshop, { dist: 5.2, h: 2.4, side: -0.6, look: [-0.7, 1.6, -1.2], fov: 32, shift: 0.4, scene: NOON }),
    shot(PLACES.workshop, { dist: 5.8, h: 2.8, side: 1.6, look: [-0.4, 1.0, -0.3], shift: -0.4, scene: NOON }),
    shot(PLACES.workshop, { dist: 5, h: 2.6, side: 2.2, look: [1.5, 1.0, -0.6], fov: 32, shift: 0.4, scene: NOON }),
  ],
  // Afternoon light. Hero chases the courier; 1 = schedule on the office monitor; 2 = shop front; 3 = hand-over.
  "antar-jemput": [
    { pos: [-4.5, 5.6, 3.2], target: [0, 0.6, 0], fov: 36, shift: 0.45, scene: AFTERNOON, followVan: true, focus: "journey-antar" },
    shot(PLACES.office, { dist: 3.8, h: 2.1, side: -0.5, look: [-0.3, 1.55, -0.8], fov: 30, shift: 0.4, scene: AFTERNOON }),
    shot(PLACES.shop, { dist: 7.2, h: 3.4, side: 3.2, look: [1.3, 1.1, 2.4], shift: -0.4, scene: AFTERNOON }),
    shot(PLACES.home, { dist: 10.5, h: 4.8, side: 2.4, ty: 1.7, shift: 0.4, focus: "journey-selesai", scene: AFTERNOON }),
  ],
  // Evening: "pantau dari mana saja". Office windows light up.
  "aplikasi-owner": [
    shot(PLACES.office, { dist: 13, h: 6, side: 2, shift: 0.45, focus: "journey-laporan", scene: EVENING }),
    shot(PLACES.office, { dist: 7.5, h: 3.2, side: 1.5, look: [0.3, 1.3, 2.5], shift: 0.4, focus: "journey-laporan", scene: EVENING }),
    shot(PLACES.office, { dist: 5.6, h: 2.8, side: -1.1, look: [0.3, 1.5, 2.5], shift: -0.45, scene: EVENING }),
    { pos: [6.5, 9.5, 15.5], target: [0.4, 1.2, 1.5], fov: 38, shift: 0.42, scene: EVENING, focus: "pricing" },
  ],
  // Office interior: big monitor + growing bars, then the town as an outlet map.
  "back-office": [
    shot(PLACES.office, { dist: 12, h: 6.5, side: -1.5, shift: 0.45, focus: "office-bars" }),
    shot(PLACES.office, { dist: 4.4, h: 2.2, side: 0.6, look: [-0.3, 1.55, -0.8], fov: 30, shift: 0.4, focus: "office-bars" }),
    shot(PLACES.office, { dist: 3.8, h: 2.1, side: -0.9, look: [-0.3, 1.55, -0.8], fov: 30, shift: -0.4 }),
    { pos: [-3, 24, 8], target: [-2.5, 0, -1.5], fov: 40, shift: 0.3, scene: DAY },
  ],
  // world/SelfService.tsx. Night: the laundromat glows on its own.
  "self-service": [
    shot(PLACES.selfService, { dist: 12, h: 6, side: 3, ty: 1.6, shift: 0.45, scene: NIGHT }),
    shot(PLACES.selfService, { dist: 6.2, h: 2.8, side: 0.8, look: [0, 1.1, -0.7], shift: 0.4, scene: NIGHT }),
    shot(PLACES.selfService, { dist: 5, h: 2.5, side: 1.6, look: [-0.5, 1.0, -0.4], fov: 32, shift: -0.4, scene: NIGHT }),
    shot(PLACES.office, { dist: 3.8, h: 2.1, side: -0.5, look: [-0.3, 1.55, -0.8], fov: 30, shift: 0.4, scene: NIGHT }),
  ],
  // world/ShopExtras.tsx. Early morning: staff check in at the shop door.
  "karyawan-absensi": [
    shot(PLACES.shop, { dist: 9, h: 4.2, side: -3.5, look: [-1.4, 1.2, 2.4], shift: 0.45, scene: EARLY }),
    shot(PLACES.shop, { dist: 7, h: 3.1, side: -0.8, look: [-1.6, 1.5, 2.5], fov: 32, shift: 0.4, scene: EARLY }),
    shot(PLACES.office, { dist: 3.8, h: 2.1, side: -0.9, look: [-0.3, 1.55, -0.8], fov: 30, shift: -0.4, scene: EARLY }),
    shot(PLACES.office, { dist: 3.8, h: 2.1, side: 0.7, look: [-0.3, 1.55, -0.8], fov: 30, shift: 0.4, scene: EARLY }),
  ],
} satisfies Record<string, [Station, Station, Station, Station]>;

export type FeatureSlug = keyof typeof FEATURE_STATIONS;

/** Station key for a feature page section: index 0 = hero, 1..3 = stations. */
export const featureStation = (slug: FeatureSlug, i: 0 | 1 | 2 | 3) => `fitur-${slug}-${i === 0 ? "hero" : i}`;

const featureEntries = Object.fromEntries(
  (Object.keys(FEATURE_STATIONS) as FeatureSlug[]).flatMap((slug) =>
    FEATURE_STATIONS[slug].map((st, i) => [featureStation(slug, i as 0 | 1 | 2 | 3), st]),
  ),
);

export const STATIONS: Record<string, Station> = {
  hero: { pos: [19, 13.5, 21], target: [0, 0.5, 0], fov: 31, shift: 0.5, scene: DAY },
  problem: {
    pos: front(PLACES.shop, 10, 4.4, 1.5),
    target: at(PLACES.shop, 1.2),
    fov: 36,
    shift: 0.45,
    scene: { chaos: 1, color: 0.15, hub: 0, dusk: 0, sign: 0, morning: 0 },
  },
  turn: { pos: [0, 19, 20], target: [0, 5.5, 0], fov: 38, shift: 0, scene: { ...DAY, hub: 1 } },
  "journey-intro": { pos: [-2, 9, 13], target: [-2, 0, 0], fov: 36, shift: 0.2, scene: DAY },
  "journey-terima": {
    pos: front(PLACES.shop, 10, 4.2, 1.2),
    target: at(PLACES.shop, 1.2),
    fov: 34,
    shift: 0.4,
    scene: DAY,
  },
  "journey-proses": {
    pos: front(PLACES.workshop, 10, 4.6, 1.2),
    target: at(PLACES.workshop, 1.1),
    fov: 34,
    shift: 0.4,
    scene: DAY,
  },
  "journey-antar": { pos: [-3.2, 4.6, 1.4], target: [0, 0.55, 0], fov: 36, shift: 0.35, scene: DAY, followVan: true },
  "journey-selesai": {
    pos: front(PLACES.home, 10.5, 4.8, 2.4),
    target: at(PLACES.home, 1.7),
    fov: 34,
    shift: 0.4,
    scene: DAY,
  },
  "journey-laporan": {
    pos: front(PLACES.office, 9, 4, 1.2),
    target: at(PLACES.office, 1.3),
    fov: 34,
    shift: 0.4,
    scene: DAY,
  },
  connected: { pos: [0, 28, 9], target: [0, 0, -2.2], fov: 34, shift: 0, scene: DAY },
  /** Home USP: the town at night around the Nevira tower (support never sleeps). */
  usp: { pos: [11, 8.5, 15], target: [0, 3.2, 0], fov: 38, shift: 0, scene: NIGHT },
  pricing: {
    pos: [PLACES.coins.pos[0] + 3, 6.5, PLACES.coins.pos[2] + 5.5],
    target: at(PLACES.coins, 1.4),
    fov: 34,
    shift: 0.42,
    scene: DAY,
  },
  proof: { pos: [-15, 9, 15], target: [0, 1.5, 0], fov: 34, shift: 0, scene: { ...DAY, dusk: 1 } },
  faq: { pos: [-15, 9, 15], target: [0, 1.5, 0], fov: 34, shift: 0, scene: { ...DAY, dusk: 1 } },
  cta: {
    pos: front(PLACES.shop, 13, 3.2, 0),
    target: at(PLACES.shop, 4.6),
    fov: 38,
    shift: 0,
    scene: { ...DAY, dusk: 1, sign: 1 },
  },
  ...featureEntries,
  /** Wide overhead of the whole town (feature hub, capability grids). */
  overview: { pos: [0, 26, 14], target: [0, 0, -1], fov: 36, shift: 0, scene: DAY },
  /** Calm establishing shot for text pages (bantuan, tentang, kontak, legal). */
  quiet: { pos: [21, 15, 23], target: [0, 0.5, 0], fov: 30, shift: 0.3, scene: DAY },
  /** Home: "Bukan cuma kasir" — the self-service laundromat and the shop-door attendance terminal. */
  peran: shot(PLACES.selfService, { dist: 9.5, h: 5, side: 2.5, ty: 1.4, shift: 0.42 }),
  /** /fitur hero: whole town from above, every building pinned (world/PagePieces.tsx). */
  "fitur-map": { pos: [2, 33, 17], target: [-0.5, 0, -0.5], fov: 40, shift: 0.55, scene: DAY },
  /** /harga hero: close-up of the Saldo Koin stack. */
  "harga-hero": {
    pos: [PLACES.coins.pos[0] + 1.6, 2.6, PLACES.coins.pos[2] + 3.2],
    target: at(PLACES.coins, 0.9),
    fov: 32,
    shift: 0.42,
    scene: DAY,
    focus: "pricing",
  },
  /** /bantuan: above the plaza, the hub tower as the town's info tower. */
  bantuan: { pos: [7, 13, 12], target: [0, 3, 0], fov: 36, shift: 0.35, scene: DAY },
  /** /tentang: morning panorama. */
  tentang: { pos: [24, 10, 19], target: [0, 0.5, -1.5], fov: 34, shift: 0.3, scene: { ...DAY, morning: 1 } },
  /** /kontak: the office with its lights on. */
  kontak: shot(PLACES.office, { dist: 10, h: 4.6, side: 2, ty: 2.2, shift: 0.4, scene: { ...DAY, dusk: 0.55 } }),
};

export const FALLBACK_STATION = STATIONS.hero;
