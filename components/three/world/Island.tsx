"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, CatmullRomCurve3, Group, LineCurve3, Sprite, Vector3 } from "three";
import { ribbon, rng } from "../geometry";
import { Trees } from "./Trees";
import { ISLAND_RADIUS, PLACES, RING } from "../layout";
import { DASH_PERIOD, M, glowTexture, roadMaterials } from "../materials";
import { live } from "../runtime";

export const ringCurve = new CatmullRomCurve3(
  Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return new Vector3(Math.cos(a) * RING.rx, 0, Math.sin(a) * RING.rz);
  }),
  true,
  "catmullrom",
  0.5,
);

const RING_WIDTH = 1.1;
const SPOKE_WIDTH = 0.8;

/** Short road from the ring's outer edge to the front of each place (so its dashes never cross the ring). */
function spoke(key: keyof typeof PLACES, dist = 1.9) {
  const p = PLACES[key];
  const f = new Vector3(p.pos[0] + Math.sin(p.rot) * dist, 0, p.pos[2] + Math.cos(p.rot) * dist);
  const dir = f.clone().normalize();
  const onRing = new Vector3(dir.x * RING.rx, 0, dir.z * RING.rz);
  // Start just inside the ring's outer edge so asphalt overlaps without a seam.
  const start = onRing.add(f.clone().sub(onRing).normalize().multiplyScalar(RING_WIDTH / 2 - 0.05));
  return new LineCurve3(start, f);
}

/** Whole number of dash periods so a closed loop meets itself cleanly. */
const repeatsFor = (length: number, closed: boolean) =>
  closed ? Math.max(1, Math.round(length / DASH_PERIOD)) : length / DASH_PERIOD;

function Lamps() {
  const spots = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 + 0.2;
        return [Math.cos(a) * (RING.rx + 0.9), Math.sin(a) * (RING.rz + 0.9)] as const;
      }),
    [],
  );
  const glows = useRef<(Sprite | null)[]>([]);
  useFrame(() => {
    for (const s of glows.current) if (s) s.material.opacity = live.dusk * 0.9;
  });
  return (
    <group>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh material={M.ink} position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 1.2, 5]} />
          </mesh>
          <mesh material={M.window} position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.1, 8, 6]} />
          </mesh>
          <sprite
            ref={(el) => {
              glows.current[i] = el;
            }}
            position={[0, 1.25, 0]}
            scale={1.4}
          >
            <spriteMaterial map={glowTexture()} color="#F1D378" transparent opacity={0} depthWrite={false} blending={AdditiveBlending} />
          </sprite>
        </group>
      ))}
    </group>
  );
}

function Clouds() {
  const g = useRef<Group>(null);
  const puffs = useMemo(() => {
    const r = rng(21);
    return Array.from({ length: 11 }, (_, i) => {
      const a = (i / 11) * Math.PI * 2 + r() * 0.4;
      const d = ISLAND_RADIUS + 1 + r() * 6;
      return {
        x: Math.cos(a) * d,
        y: -2.2 + r() * 1.6,
        z: Math.sin(a) * d,
        s: 1 + r() * 1.4,
        balls: Array.from({ length: 4 }, () => [(r() - 0.5) * 2.4, (r() - 0.3) * 0.6, (r() - 0.5) * 1.2, 0.6 + r() * 0.6] as const),
      };
    });
  }, []);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.012;
  });
  return (
    <group ref={g}>
      {puffs.map((p, i) => (
        <group key={i} position={[p.x, p.y, p.z]} scale={p.s}>
          {p.balls.map(([x, y, z, s], j) => (
            <mesh key={j} position={[x, y, z]} material={M.cloud}>
              <icosahedronGeometry args={[s, 2]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export function Island() {
  const surfaces = useMemo(() => roadMaterials(), []);
  const roads = useMemo(() => {
    const ring = ribbon(ringCurve, RING_WIDTH, 160, true, 0.02, repeatsFor(ringCurve.getLength(), true));
    const spokes = (["shop", "workshop", "office", "home", "coins", "selfService"] as const).map((k) => {
      // The home has a front path, so its road stops at the curb where the van parks.
      const c = spoke(k, k === "coins" ? 0 : k === "home" ? 3.6 : 1.9);
      // Each tile starts with a quarter-period gap, so the first dash sits clear of the junction.
      return ribbon(c, SPOKE_WIDTH, 8, false, 0.021, repeatsFor(c.getLength(), false));
    });
    return [ring, ...spokes];
  }, []);

  return (
    <group>
      {/* top */}
      <mesh position={[0, -0.2, 0]} material={M.ground} receiveShadow>
        <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS - 0.4, 0.4, 40]} />
      </mesh>
      {/* rocky underside */}
      <mesh position={[0, -2.6, 0]} rotation={[Math.PI, 0.3, 0]} material={M.rock}>
        <coneGeometry args={[ISLAND_RADIUS - 0.4, 4.4, 11, 2]} />
      </mesh>
      <mesh position={[1.5, -4.6, -1]} rotation={[Math.PI, 0.8, 0]} material={M.rockDeep}>
        <coneGeometry args={[5, 4, 7]} />
      </mesh>
      {/* plaza */}
      <mesh position={[0, 0.01, 0]} material={surfaces.plaza} receiveShadow>
        <cylinderGeometry args={[2.6, 2.6, 0.04, 40]} />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]} material={M.floor}>
        <ringGeometry args={[1.9, 2.15, 40]} />
      </mesh>
      {roads.map((g, i) => (
        <mesh key={i} geometry={g} material={surfaces.road} receiveShadow />
      ))}
      <Trees />
      <Lamps />
      <Clouds />
    </group>
  );
}
