import { PLACES, at, front } from "./layout";

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
};

const DAY: SceneParams = { chaos: 0, color: 1, hub: 1, dusk: 0, sign: 0 };

export const STATIONS: Record<string, Station> = {
  hero: { pos: [19, 13.5, 21], target: [0, 0.5, 0], fov: 31, shift: 0.5, scene: DAY },
  problem: {
    pos: front(PLACES.shop, 10, 4.4, 1.5),
    target: at(PLACES.shop, 1.2),
    fov: 36,
    shift: 0.45,
    scene: { chaos: 1, color: 0.15, hub: 0, dusk: 0, sign: 0 },
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
};

export const FALLBACK_STATION = STATIONS.hero;
