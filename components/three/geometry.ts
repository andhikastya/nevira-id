import { BufferGeometry, Float32BufferAttribute, Vector3, type Curve } from "three";

/**
 * Flat ribbon (road) following a curve on the XZ plane.
 * UV: u runs along the curve as `uRepeats` texture tiles end to end, v goes 0→1 across.
 */
export function ribbon(curve: Curve<Vector3>, width: number, segments: number, closed: boolean, y = 0.02, uRepeats = 1) {
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const n = closed ? segments : segments + 1;
  for (let i = 0; i < n; i++) {
    const t = i / segments;
    const p = curve.getPointAt(t);
    const tan = curve.getTangentAt(t);
    const nx = -tan.z;
    const nz = tan.x;
    const len = Math.hypot(nx, nz) || 1;
    const hx = (nx / len) * (width / 2);
    const hz = (nz / len) * (width / 2);
    pos.push(p.x + hx, y, p.z + hz, p.x - hx, y, p.z - hz);
    const u = t * uRepeats;
    uv.push(u, 0, u, 1);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = ((i + 1) % n) * 2;
    idx.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Deterministic PRNG so the town is identical on every load. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
