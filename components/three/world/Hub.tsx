"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, MathUtils, QuadraticBezierCurve3, TubeGeometry, Vector3, type Group, type Mesh, type Sprite } from "three";
import { PLACES } from "../layout";
import { M, glowTexture, mat } from "../materials";
import { live } from "../runtime";

const TOP = new Vector3(0, 3.6, 0);
const lineMat = mat("#916ED4", { emissive: "#916ED4", emissiveIntensity: 0.6, transparent: true, opacity: 0.9 });
const pulseMat = mat("#FFFFFF", { emissive: "#C3AEE7", emissiveIntensity: 1 });

const TARGETS = (["shop", "workshop", "office", "home", "selfService"] as const).map((k) => {
  const p = PLACES[k].pos;
  return new Vector3(p[0], k === "office" ? 4.4 : k === "selfService" ? 3.2 : 3, p[2]);
});

// Tower body: hexagonal prism, radius 0.85 at the base (y=0.4) tapering to 0.55 at the top (y=3.4).
const TOWER_BOTTOM = 0.4;
const TOWER_HEIGHT = 3;
const R_BOTTOM = 0.85;
const R_TOP = 0.55;
const APOTHEM = Math.cos(Math.PI / 6); // face-center distance per unit radius
/** Inward lean of each face, from the taper. */
const FACE_TILT = Math.atan(((R_BOTTOM - R_TOP) * APOTHEM) / TOWER_HEIGHT);

/** Framed windows sitting flush on every hexagon face, three floors, following the taper. */
function TowerWindows() {
  const floors = [1.0, 1.85, 2.7];
  return (
    <group>
      {Array.from({ length: 6 }, (_, k) => {
        const phi = Math.PI / 6 + (k * Math.PI) / 3; // face centers sit between the prism's vertices
        return (
          <group key={k} rotation={[0, phi, 0]}>
            {floors.map((y) => {
              const r = R_BOTTOM + ((R_TOP - R_BOTTOM) * (y - TOWER_BOTTOM)) / TOWER_HEIGHT;
              return (
                <group key={y} position={[0, y, r * APOTHEM + 0.005]} rotation={[-FACE_TILT, 0, 0]}>
                  <mesh material={M.purpleLight}>
                    <boxGeometry args={[0.3, 0.4, 0.03]} />
                  </mesh>
                  <mesh position={[0, 0, 0.012]} material={M.window}>
                    <boxGeometry args={[0.22, 0.32, 0.02]} />
                  </mesh>
                  <mesh position={[0, 0, 0.024]} material={M.purpleLight}>
                    <boxGeometry args={[0.22, 0.025, 0.012]} />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

/** Nevira integration tower + glowing data lines to every module. Revealed by live.hub. */
export function Hub() {
  const tower = useRef<Group>(null);
  const orb = useRef<Mesh>(null);
  const halo = useRef<Sprite>(null);
  const lines = useRef<Group>(null);
  const pulses = useRef<(Mesh | null)[]>([]);
  const lineFade = useRef(1);

  const curves = useMemo(
    () =>
      TARGETS.map((t) => {
        const mid = TOP.clone().lerp(t, 0.5);
        mid.y += 2.2;
        return new QuadraticBezierCurve3(TOP.clone(), mid, t);
      }),
    [],
  );
  const tubes = useMemo(() => curves.map((c) => new TubeGeometry(c, 40, 0.035, 5, false)), [curves]);

  useFrame(() => {
    const h = live.hub;
    if (tower.current) {
      tower.current.scale.set(1, Math.max(0.001, h), 1);
    }
    if (orb.current) {
      orb.current.rotation.y = live.time * 0.8;
      orb.current.rotation.x = live.time * 0.5;
      orb.current.position.y = TOP.y + 0.35 + Math.sin(live.time * 1.4) * 0.12;
      orb.current.scale.setScalar(Math.max(0.001, h));
    }
    if (halo.current) {
      halo.current.position.y = orb.current?.position.y ?? TOP.y;
      halo.current.material.opacity = h * (0.55 + live.dusk * 0.35);
    }
    // The courier camera (Antar) flies through the arcs, so fade them out there.
    lineFade.current = MathUtils.lerp(lineFade.current, live.focus === "journey-antar" ? 0 : 1, 0.08);
    const lineReveal = MathUtils.smoothstep(h, 0.55, 1) * lineFade.current;
    if (lines.current) lines.current.visible = lineReveal > 0.01;
    lineMat.opacity = lineReveal * 0.9;
    pulses.current.forEach((p, i) => {
      if (!p) return;
      const u = (live.time * 0.35 + i * 0.25) % 1;
      p.position.copy(curves[i].getPointAt(u));
      p.scale.setScalar(lineReveal);
    });
  });

  return (
    <group>
      <group ref={tower}>
        {/* plinth + tower */}
        <mesh position={[0, 0.2, 0]} material={M.wall} castShadow receiveShadow>
          <cylinderGeometry args={[1.25, 1.4, 0.4, 6]} />
        </mesh>
        <mesh position={[0, 1.9, 0]} material={M.purple} castShadow>
          <cylinderGeometry args={[R_TOP, R_BOTTOM, TOWER_HEIGHT, 6]} />
        </mesh>
        <mesh position={[0, 3.45, 0]} material={M.purpleLight} castShadow>
          <cylinderGeometry args={[0.7, 0.55, 0.3, 6]} />
        </mesh>
        <TowerWindows />
      </group>
      <mesh ref={orb} position={[0, TOP.y + 0.35, 0]} material={pulseMat}>
        <icosahedronGeometry args={[0.38, 0]} />
      </mesh>
      <sprite ref={halo} position={[0, TOP.y + 0.35, 0]} scale={2.6}>
        <spriteMaterial map={glowTexture()} color="#C3AEE7" transparent opacity={0} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      <group ref={lines}>
        {tubes.map((g, i) => (
          <mesh key={i} geometry={g} material={lineMat} />
        ))}
        {curves.map((_, i) => (
          <mesh
            key={`p${i}`}
            ref={(el) => {
              pulses.current[i] = el;
            }}
            material={pulseMat}
          >
            <sphereGeometry args={[0.1, 10, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
