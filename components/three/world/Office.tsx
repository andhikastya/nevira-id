"use client";

import { Billboard, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, MeshBasicMaterial, type Group, type Mesh } from "three";
import { PLACES } from "../layout";
import { M, canvasTexture, mat, roundRect } from "../materials";
import { live } from "../runtime";
import { ScreenPanel } from "../ScreenPanel";
import { Box, Cyl, Room } from "./parts";
import { Person } from "./Person";

const W = 3.6;
const D = 3;
const H = 2.4;
const BARS = [0.35, 0.5, 0.45, 0.7, 0.95];

/** "Monitor anywhere" tooltip over the owner; pops when step 5 is in focus. */
function OwnerTooltip() {
  const g = useRef<Group>(null);
  const k = useRef(0);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        map: canvasTexture(680, 250, (c, w, h) => {
          c.shadowColor = "rgba(13,13,18,0.18)";
          c.shadowBlur = 24;
          c.shadowOffsetY = 6;
          roundRect(c, 20, 16, w - 40, h - 60, 28);
          c.fillStyle = "#FFFFFF";
          c.fill();
          c.shadowColor = "transparent";
          c.beginPath();
          c.moveTo(w / 2 - 22, h - 46);
          c.lineTo(w / 2, h - 12);
          c.lineTo(w / 2 + 22, h - 46);
          c.fill();
          c.fillStyle = "#EBE5F6";
          c.beginPath();
          c.arc(84, 92, 34, 0, Math.PI * 2);
          c.fill();
          // phone glyph
          c.strokeStyle = "#5B369E";
          c.lineWidth = 5;
          roundRect(c, 70, 68, 28, 48, 6);
          c.stroke();
          c.fillStyle = "#5B369E";
          c.fillRect(80, 106, 8, 4);
          c.fillStyle = "#32363E";
          c.font = "700 30px 'Red Hat Text', sans-serif";
          c.fillText("Pantau bisnis kapan saja,", 140, 76);
          c.fillText("di mana saja", 140, 114);
          c.fillStyle = "#4C515D";
          c.font = "500 24px 'Red Hat Text', sans-serif";
          c.fillText("Omzet hari ini Rp2,4 jt · 48 order", 140, 158);
        }),
      }),
    [],
  );
  useFrame((_, dt) => {
    const goal = live.focus === "journey-laporan" ? 1 : 0;
    k.current = MathUtils.lerp(k.current, goal, 1 - Math.exp(-dt * 5));
    if (g.current) {
      g.current.scale.setScalar(Math.max(0.0001, k.current));
      g.current.position.y = 1.85 + Math.sin(live.time * 1.6) * 0.06;
    }
  });
  return (
    <group ref={g} position={[0, 1.85, 0]}>
      <Billboard>
        <mesh material={mat}>
          <planeGeometry args={[2.3, 0.85]} />
        </mesh>
      </Billboard>
    </group>
  );
}

/** Owner checking the business on a phone, in front of the office (step 5). */
function Owner() {
  const screen = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        map: canvasTexture(90, 180, (c, w, h) => {
          c.fillStyle = "#FFFFFF";
          c.fillRect(0, 0, w, h);
          c.fillStyle = "#5B369E";
          c.fillRect(0, 0, w, 26);
          [0.35, 0.55, 0.45, 0.75, 0.9].forEach((v, i) => {
            c.fillStyle = i === 4 ? "#5B369E" : "#C3AEE7";
            const bh = v * 70;
            c.fillRect(10 + i * 15, 150 - bh, 10, bh);
          });
          c.fillStyle = "#E6E7EA";
          c.fillRect(10, 40, 70, 12);
          c.fillRect(10, 58, 50, 10);
        }),
      }),
    [],
  );
  return (
    <group position={[0.3, 0.0, D / 2 + 1.0]} rotation={[0, -0.1, 0]}>
      <Person shirt={OWNER_SHIRT} hair={M.ink} pose="phone" />
      {/* phone in the right hand, screen tilted toward the owner's face */}
      <group position={[0.07, 0.6, 0.2]} rotation={[-0.9, Math.PI, 0]}>
        <RoundedBox args={[0.085, 0.16, 0.014]} radius={0.01} smoothness={2} material={M.ink} />
        <mesh position={[0, 0, 0.008]} material={screen}>
          <planeGeometry args={[0.072, 0.142]} />
        </mesh>
      </group>
      <OwnerTooltip />
    </group>
  );
}

const OWNER_SHIRT = mat("#4A7FB5", { flatShading: false, roughness: 0.8 });

export function Office() {
  const { pos, rot } = PLACES.office;
  const bars = useRef<(Mesh | null)[]>([]);
  const grow = useRef(0.25);

  useFrame((_, dt) => {
    const goal = live.focus === "journey-laporan" ? 1 : 0.25;
    grow.current = MathUtils.lerp(grow.current, goal, 1 - Math.exp(-dt * 2.5));
    bars.current.forEach((b, i) => {
      if (!b) return;
      const h = BARS[i] * 1.1 * grow.current;
      b.scale.y = Math.max(0.01, h);
      b.position.y = h / 2;
    });
  });

  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <Room w={W} d={D} h={H} wall={M.wall} floor={M.floor}>
        {/* upper floor */}
        <Box size={[W, 1.7, D]} at={[0, H + 0.85, 0]} material={M.wall} />
        {[-1, 0, 1].map((x) => (
          <Box key={x} size={[0.7, 0.8, 0.05]} at={[x * 1.05, H + 0.9, D / 2 + 0.01]} material={M.window} />
        ))}
        <Box size={[W + 0.3, 0.2, D + 0.3]} at={[0, H + 1.8, 0]} material={M.purple} />
        <Box size={[0.8, 0.4, 0.6]} at={[0.9, H + 2.1, -0.5]} material={M.wallSoft} />
        {/* desk + monitor (Website Admin) */}
        <Box size={[2, 0.07, 0.8]} at={[-0.3, 0.86, -0.6]} material={M.wall} />
        <Box size={[0.07, 0.7, 0.7]} at={[-1.2, 0.5, -0.6]} material={M.slate} />
        <Box size={[0.07, 0.7, 0.7]} at={[0.6, 0.5, -0.6]} material={M.slate} />
        <Cyl r={0.06} h={0.3} at={[-0.3, 1.05, -0.8]} material={M.ink} seg={6} />
        <group position={[-0.3, 1.58, -0.78]} rotation={[0, 0.15, 0]}>
          <Box size={[1.36, 0.86, 0.05]} at={[0, 0, -0.03]} material={M.ink} />
          <ScreenPanel kind="admin" width={1.3} height={0.8} />
        </group>
        {/* chair */}
        <Box size={[0.5, 0.08, 0.5]} at={[-0.3, 0.55, 0.1]} material={M.purpleMid} />
        <Box size={[0.5, 0.55, 0.08]} at={[-0.3, 0.85, 0.36]} material={M.purpleMid} />
        <Cyl r={0.04} h={0.4} at={[-0.3, 0.33, 0.1]} material={M.ink} seg={6} />
        {/* growing 3D bar chart */}
        <group position={[1.15, 0.16, 0.6]}>
          <Box size={[1.1, 0.04, 0.5]} at={[0, 0.02, 0]} material={M.wallSoft} />
          {BARS.map((_, i) => (
            <mesh
              key={i}
              ref={(el) => {
                bars.current[i] = el;
              }}
              position={[-0.4 + i * 0.2, 0.2, 0]}
              material={i === BARS.length - 1 ? M.purple : M.lavender}
              castShadow
            >
              <boxGeometry args={[0.14, 1, 0.14]} />
            </mesh>
          ))}
        </group>
        {/* plant */}
        <Cyl r={0.16} h={0.3} at={[-1.4, 0.31, 0.9]} material={M.wallSoft} seg={8} />
        <mesh position={[-1.4, 0.7, 0.9]} material={M.leafA} castShadow>
          <icosahedronGeometry args={[0.32, 0]} />
        </mesh>
      </Room>
      <Owner />
    </group>
  );
}
