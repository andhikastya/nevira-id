"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Euler, Matrix4, MeshBasicMaterial, Quaternion, Vector3, type InstancedMesh, type Material } from "three";
import { rng } from "../geometry";
import { ISLAND_RADIUS, PLACES, RING } from "../layout";
import { M, glowTexture } from "../materials";

type Xf = { p: [number, number, number]; s: [number, number, number]; r: [number, number, number] };

/**
 * Canopy layout for one tree, in units of tree size: a big crown, mid clumps,
 * then small clumps that break the outline so it reads as foliage, not a dome.
 * [x, y, z, radius]
 */
const CLUMPS: [number, number, number, number][] = [
  [0, 0.4, 0, 0.5],
  [0.27, 0.24, 0.1, 0.37],
  [-0.25, 0.26, -0.1, 0.36],
  [0.04, 0.62, -0.12, 0.33],
  [-0.1, 0.18, 0.25, 0.31],
  [0.2, 0.5, 0.18, 0.29],
  [0.35, 0.46, -0.08, 0.2],
  [-0.32, 0.5, 0.12, 0.19],
  [0.02, 0.76, 0.06, 0.2],
  [-0.2, 0.34, -0.27, 0.18],
];

const GREENS = [M.leafA, M.leafB, M.leafC];
const PINKS = [M.pinkA, M.pinkB, M.pinkC];
const FOLIAGE = [...GREENS, ...PINKS];

function useInstances(ref: React.RefObject<InstancedMesh | null>, items: Xf[]) {
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new Matrix4();
    const q = new Quaternion();
    const e = new Euler();
    items.forEach((it, i) => {
      q.setFromEuler(e.set(...it.r));
      m.compose(new Vector3(...it.p), q, new Vector3(...it.s));
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [ref, items]);
}

function Instanced({ items, material, children, shadow = true }: { items: Xf[]; material: Material; children: React.ReactNode; shadow?: boolean }) {
  const ref = useRef<InstancedMesh>(null);
  useInstances(ref, items);
  if (!items.length) return null;
  return (
    <instancedMesh ref={ref} args={[undefined, material, items.length]} castShadow={shadow} receiveShadow={false}>
      {children}
    </instancedMesh>
  );
}

/** Storybook trees (puffy clustered canopies) + grass tufts, all instanced: ~10 draw calls total. */
export function Trees() {
  const data = useMemo(() => {
    const r = rng(7);
    const rand = (a: number, b: number) => a + r() * (b - a);
    const spots: { x: number; z: number; s: number }[] = [];
    let guard = 0;
    while (spots.length < 40 && guard++ < 3000) {
      const a = r() * Math.PI * 2;
      const d = 2.8 + r() * (ISLAND_RADIUS - 3.6);
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      // Trees only outside the ring road: keeps the plaza open and the courier camera unobstructed.
      if (Math.hypot(x / RING.rx, z / RING.rz) < 1.28) continue;
      if (Object.values(PLACES).some((p) => Math.hypot(p.pos[0] - x, p.pos[2] - z) < 3.6)) continue;
      if (spots.some((o) => Math.hypot(o.x - x, o.z - z) < 1.5)) continue;
      spots.push({ x, z, s: rand(0.95, 1.55) });
    }

    const foliage: Xf[][] = FOLIAGE.map(() => []);
    const trunks: Xf[] = [];
    const boughs: Xf[] = [];
    const pools: Xf[] = [];

    for (const t of spots) {
      const { x, z, s } = t;
      const yaw = rand(0, Math.PI * 2);
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const rot = (lx: number, lz: number): [number, number] => [x + lx * cy - lz * sy, z + lx * sy + lz * cy];
      const trunkH = 0.62 * s;
      trunks.push({ p: [x, trunkH / 2, z], s: [s, s, s], r: [0, yaw, 0] });
      // two stubby boughs so the crown looks attached
      [-1, 1].forEach((side, i) => {
        const [bx, bz] = rot(0.07 * s * side, 0.03 * s * (i ? -1 : 1));
        boughs.push({ p: [bx, (i ? 0.55 : 0.42) * s, bz], s: [s, s, s], r: [0, yaw, 0.72 * side] });
      });
      pools.push({ p: [x, 0.012, z], s: [0.9 * s, 0.9 * s, 1], r: [-Math.PI / 2, 0, 0] });

      const family = r() < 0.62 ? 0 : 3; // greens vs blossom
      const baseY = 0.53 * s;
      for (const [cx, cyy, cz, cr] of CLUMPS) {
        const jr = rand(0.88, 1.12);
        const [px, pz] = rot((cx + rand(-0.05, 0.05)) * s, (cz + rand(-0.05, 0.05)) * s);
        const rad = cr * s * jr;
        foliage[family + Math.floor(r() * 3)].push({
          p: [px, baseY + (cyy + rand(-0.04, 0.04)) * s, pz],
          s: [rad * rand(0.94, 1.12), rad * 0.88 * rand(0.9, 1.08), rad * rand(0.94, 1.12)],
          r: [rand(-0.5, 0.5), rand(0, 6.28), rand(-0.5, 0.5)],
        });
      }
    }

    // Grass tufts scattered over the lawn.
    const sprigs: Xf[] = [];
    guard = 0;
    while (sprigs.length < 90 && guard++ < 4000) {
      const a = r() * Math.PI * 2;
      const d = 2.8 + r() * (ISLAND_RADIUS - 3.2);
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      const ringD = Math.hypot(x / RING.rx, z / RING.rz);
      if (ringD > 0.82 && ringD < 1.22) continue;
      if (Object.values(PLACES).some((p) => Math.hypot(p.pos[0] - x, p.pos[2] - z) < 2.6)) continue;
      // grow in little clusters of 3
      for (let k = 0; k < 3; k++) {
        const h = rand(0.75, 1.2);
        sprigs.push({ p: [x + rand(-0.16, 0.16), 0.17 * h, z + rand(-0.16, 0.16)], s: [1, h, 1], r: [rand(-0.3, 0.3), rand(0, 6.28), rand(-0.3, 0.3)] });
      }
    }
    return { foliage, trunks, boughs, pools, sprigs };
  }, []);

  const poolMat = useMemo(
    () => new MeshBasicMaterial({ map: glowTexture(), color: "#1F3A16", transparent: true, opacity: 0.32, depthWrite: false }),
    [],
  );

  return (
    <group>
      {FOLIAGE.map((mat, i) => (
        <Instanced key={i} items={data.foliage[i]} material={mat}>
          <sphereGeometry args={[1, 10, 8]} />
        </Instanced>
      ))}
      <Instanced items={data.trunks} material={M.trunk}>
        <cylinderGeometry args={[0.055, 0.105, 0.62, 10]} />
      </Instanced>
      <Instanced items={data.boughs} material={M.trunk}>
        <cylinderGeometry args={[0.026, 0.045, 0.22, 7]} />
      </Instanced>
      <Instanced items={data.pools} material={poolMat} shadow={false}>
        <planeGeometry args={[1, 1]} />
      </Instanced>
      <Instanced items={data.sprigs} material={M.grassTuft} shadow={false}>
        {/* slim grass blade */}
        <coneGeometry args={[0.032, 0.34, 6]} />
      </Instanced>
    </group>
  );
}
