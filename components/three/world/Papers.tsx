"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, Euler, MeshStandardMaterial, Matrix4, Quaternion, Vector3, type InstancedMesh } from "three";
import { rng } from "../geometry";
import { PLACES } from "../layout";
import { live } from "../runtime";

const N = 42;
const HUB_TOP = new Vector3(0, 3.95, 0);

/** Scattered receipts swirling around the shop (Problem). As chaos → 0 they fly into the Nevira hub. */
export function Papers() {
  const inst = useRef<InstancedMesh>(null);
  const material = useMemo(() => new MeshStandardMaterial({ color: "#FFFFFF", side: DoubleSide, roughness: 0.9 }), []);
  const seeds = useMemo(() => {
    const r = rng(99);
    return Array.from({ length: N }, () => ({
      a: r() * Math.PI * 2,
      rad: 1.2 + r() * 2.4,
      y: 0.4 + r() * 2.6,
      spd: 0.25 + r() * 0.5,
      spin: new Vector3(r() * 2, r() * 2, r() * 2),
      delay: r() * 0.35,
    }));
  }, []);
  const m = useMemo(() => new Matrix4(), []);
  const q = useMemo(() => new Quaternion(), []);
  const e = useMemo(() => new Euler(), []);
  const p = useMemo(() => new Vector3(), []);
  const s = useMemo(() => new Vector3(), []);
  const shop = PLACES.shop.pos;

  useFrame(() => {
    const mesh = inst.current;
    if (!mesh) return;
    mesh.visible = live.chaos > 0.01;
    if (!mesh.visible) return;
    const t = live.time;
    seeds.forEach((d, i) => {
      // Stagger: each sheet leaves for the hub at a slightly different moment.
      const c = Math.min(1, Math.max(0, (live.chaos - d.delay) / (1 - d.delay)));
      const a = d.a + t * d.spd;
      p.set(shop[0] + Math.cos(a) * d.rad, d.y + Math.sin(t * 1.3 + i) * 0.25, shop[2] + Math.sin(a) * d.rad);
      p.lerp(HUB_TOP, 1 - c);
      e.set(t * d.spin.x + i, t * d.spin.y, t * d.spin.z);
      q.setFromEuler(e);
      s.setScalar(0.25 + 0.75 * c);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={inst} args={[undefined, material, N]} castShadow frustumCulled={false}>
      <planeGeometry args={[0.28, 0.36]} />
    </instancedMesh>
  );
}
