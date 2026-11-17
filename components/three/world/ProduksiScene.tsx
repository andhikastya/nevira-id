"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, MeshBasicMaterial, type Group } from "three";
import { M, canvasTexture, roundRect } from "../materials";
import { live } from "../runtime";
import { featureStation } from "../stations";
import { InfoBubble, damp, inFocus } from "./kit";
import { Person } from "./Person";
import { Box } from "./parts";

/**
 * Set piece for /fitur/produksi, mounted inside the Workshop group (workshop-local:
 * W 4.4 × D 3, machines along the back wall at z ≈ -0.9, folding table at x 1.6).
 *   1 — order cards slide onto the work board;  2 — a staffer carries a basket between machines;
 *   3 — folded stacks land on a numbered rack.
 */
const ST = {
  hero: featureStation("produksi", 0),
  s1: featureStation("produksi", 1),
  s2: featureStation("produksi", 2),
  s3: featureStation("produksi", 3),
};

const D = 3;
const BOARD_Z = -D / 2 + 0.16;

function orderCard(n: string, status: string, color: string) {
  return new MeshBasicMaterial({
    toneMapped: false,
    map: canvasTexture(160, 200, (c, w, h) => {
      roundRect(c, 4, 4, w - 8, h - 8, 14);
      c.fillStyle = "#FFFFFF";
      c.fill();
      c.fillStyle = color;
      c.fillRect(4, 4, w - 8, 34);
      c.fillStyle = "#FFFFFF";
      c.font = "700 20px 'Red Hat Text', sans-serif";
      c.textAlign = "center";
      c.fillText(n, w / 2, 28);
      c.fillStyle = "#E6E7EA";
      c.fillRect(20, 62, w - 40, 12);
      c.fillRect(20, 86, w - 70, 12);
      c.fillStyle = "#32363E";
      c.font = "600 18px 'Red Hat Text', sans-serif";
      c.fillText(status, w / 2, 150);
    }),
  });
}

/** Work board on the back wall; new order cards slide in from the right on station 1. */
function WorkBoard() {
  const cards = useMemo(
    () => [
      orderCard("#0409", "Cuci", "#916ED4"),
      orderCard("#0410", "Kering", "#916ED4"),
      orderCard("#0411", "Setrika", "#5B369E"),
      orderCard("#0412", "Baru", "#277547"),
    ],
    [],
  );
  const refs = useRef<(Group | null)[]>([]);
  const k = useRef(0);
  useFrame((_, dt) => {
    k.current = damp(k.current, inFocus(ST.s1) ? 1 : 0, dt, 1.6);
    refs.current.forEach((g, i) => {
      if (!g) return;
      // last card is the new order: it slides in from the right
      const target = -1.5 + i * 0.5;
      const from = i === 3 ? 2.4 : target;
      const t = i === 3 ? MathUtils.smoothstep(k.current, 0.2, 1) : 1;
      g.position.x = MathUtils.lerp(from, target, t);
      g.visible = i < 3 || t > 0.02;
      g.position.y = 1.62 + (i === 3 ? Math.sin(t * Math.PI) * 0.08 : 0);
    });
  });
  return (
    <group position={[0, 0, BOARD_Z + 0.02]}>
      <Box size={[2.4, 0.62, 0.04]} at={[-0.75, 1.62, -0.02]} material={M.wallSoft} />
      {cards.map((m, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[-1.5 + i * 0.5, 1.62, 0.01]}
        >
          <mesh material={m}>
            <planeGeometry args={[0.38, 0.48]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Staffer walking a basket from machine 1 to machine 3 and back (station 2). */
function Carrier() {
  const g = useRef<Group>(null);
  const k = useRef(0);
  useFrame((_, dt) => {
    k.current = damp(k.current, inFocus(ST.s2) ? 1 : 0, dt, 2);
    if (!g.current) return;
    const walk = (Math.sin(live.time * 0.7) + 1) / 2; // 0..1 back and forth
    g.current.position.x = MathUtils.lerp(-1.45, 0.65, walk);
    g.current.position.y = 0.16 + Math.abs(Math.sin(live.time * 6)) * 0.025 * k.current;
    const dir = Math.cos(live.time * 0.7) >= 0 ? 1 : -1;
    g.current.rotation.y = MathUtils.lerp(Math.PI, Math.PI - dir * 0.9, 0.6);
    g.current.visible = k.current > 0.02;
  });
  return (
    <group ref={g} position={[-1.45, 0.16, -0.05]}>
      <group scale={1.5}>
        <Person shirt={M.purpleSoft} hair={M.timber} pose="stand" />
      </group>
    </group>
  );
}

/** Numbered rack in the back-right corner; folded stacks pop onto it on station 3. */
function Rack() {
  const stacks = useRef<(Group | null)[]>([]);
  const k = useRef(0);
  const label = useMemo(
    () =>
      ["A1", "A2", "B1", "B2"].map(
        (s) =>
          new MeshBasicMaterial({
            toneMapped: false,
            map: canvasTexture(96, 48, (c, w, h) => {
              c.fillStyle = "#5B369E";
              c.fillRect(0, 0, w, h);
              c.fillStyle = "#FFFFFF";
              c.font = "700 30px 'Red Hat Text', sans-serif";
              c.textAlign = "center";
              c.textBaseline = "middle";
              c.fillText(s, w / 2, h / 2 + 2);
            }),
          }),
      ),
    [],
  );
  useFrame((_, dt) => {
    k.current = damp(k.current, inFocus(ST.s3) ? 1 : 0, dt, 1.4);
    stacks.current.forEach((g, i) => {
      if (!g) return;
      const t = MathUtils.smoothstep(k.current, 0.1 + i * 0.15, 0.4 + i * 0.15);
      g.scale.setScalar(Math.max(0.0001, t));
    });
  });
  const slots: [number, number][] = [
    [-0.2, 0.62],
    [0.2, 0.62],
    [-0.2, 1.12],
    [0.2, 1.12],
  ];
  return (
    <group position={[1.6, 0.16, -0.95]}>
      {[0.42, 0.92, 1.42].map((y) => (
        <Box key={y} size={[0.9, 0.05, 0.5]} at={[0, y, 0]} material={M.wallSoft} />
      ))}
      {[-0.43, 0.43].map((x) => (
        <Box key={x} size={[0.05, 1.5, 0.5]} at={[x, 0.75, 0]} material={M.slate} />
      ))}
      {slots.map(([x, y], i) => (
        <group key={i}>
          <mesh position={[x, y - 0.17, 0.26]} material={label[i]}>
            <planeGeometry args={[0.16, 0.08]} />
          </mesh>
          <group
            ref={(el) => {
              stacks.current[i] = el;
            }}
            position={[x, y - 0.12, 0]}
          >
            <RoundedBox args={[0.32, 0.14, 0.3]} radius={0.03} smoothness={2} material={i % 2 ? M.lavender : M.lilac} castShadow />
          </group>
        </group>
      ))}
    </group>
  );
}

export function ProduksiScene() {
  return (
    <group>
      <WorkBoard />
      <Carrier />
      <Rack />
      <InfoBubble stations={ST.s1} at={[-0.6, 2.2, 0.2]} icon="＋" title="Daftar kerja · 4 order" sub="#0412 masuk dari antrean" />
      <InfoBubble stations={ST.s2} at={[-0.4, 2.2, 0.4]} icon="⟳" title="Tahap: Kering → Setrika" sub="Dicatat oleh staf yang mengerjakan" />
      <InfoBubble stations={ST.s3} at={[1.1, 2.2, 0.2]} icon="✓" tone="green" title="Packing selesai · Rak B2" sub="Order #0412 siap diambil" />
    </group>
  );
}
