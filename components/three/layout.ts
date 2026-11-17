// World layout for "Kota Nevira" (units ≈ meters, y up). Shared by models and camera stations.
export type V3 = [number, number, number];
export type Place = { pos: V3; /** Y rotation; the open facade faces local +z. */ rot: number };

export const PLACES = {
  hub: { pos: [0, 0, 0], rot: 0 }, // Nevira integration tower in the plaza
  shop: { pos: [-7.2, 0, 3.4], rot: 0.75 }, // storefront + cashier counter (POS Kasir)
  workshop: { pos: [-6.8, 0, -4.4], rot: 1.25 }, // washing machines (POS Produksi)
  office: { pos: [6.4, 0, -4.8], rot: -0.35 }, // owner's office (Website Admin)
  home: { pos: [7.8, 0, 4.4], rot: -0.2 }, // customer's home: hand-over + payment (step 4)
  coins: { pos: [0.6, 0, 8], rot: 0 }, // Saldo Koin stack
  selfService: { pos: [0.4, 0, -8.7], rot: 0 }, // self-service laundromat, north of the plaza, facing the hub
} satisfies Record<string, Place>;

export const ISLAND_RADIUS = 13;
/** Ring road around the plaza (ellipse radii). */
export const RING = { rx: 4.9, rz: 4.5 };

/** Camera position in front of a place: `dist` along its facing, `side` to its right, `height` up. */
export function front(place: Place, dist: number, height: number, side = 0): V3 {
  const [x, , z] = place.pos;
  const s = Math.sin(place.rot);
  const c = Math.cos(place.rot);
  return [x + s * dist + c * side, height, z + c * dist - s * side];
}

export const at = (place: Place, y: number): V3 => [place.pos[0], y, place.pos[2]];

/** World position of a point given in a place's local frame (+z = facade, +x = its right). */
export function localPoint(place: Place, [lx, ly, lz]: V3): V3 {
  const s = Math.sin(place.rot);
  const c = Math.cos(place.rot);
  return [place.pos[0] + lx * c + lz * s, ly, place.pos[2] - lx * s + lz * c];
}
