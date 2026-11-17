"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, MeshBasicMaterial, type Mesh, type Sprite } from "three";
import { PLACES } from "../layout";
import { M, canvasTexture, glowTexture, logoBoardTexture, roundRect } from "../materials";
import { live } from "../runtime";
import { ScreenPanel } from "../ScreenPanel";
import { featureStation } from "../stations";
import { KasirScene } from "./KasirScene";
import { AbsensiScene, AntarShopScene, AttendanceDevice } from "./ShopExtras";
import { usePage } from "./kit";
import { Box, Cyl, Room } from "./parts";

const W = 4.2;
const D = 3.2;
const H = 2.6;

function Sign() {
  const glow = useRef<Sprite>(null);
  const openSign = useRef<Mesh>(null);
  // Rooftop board with the Nevira logo on white, purple border.
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        // the board has rounded, transparent corners: without this they render solid black
        transparent: true,
        alphaTest: 0.35,
        map: logoBoardTexture("/brand/nevira-logo.png", { width: 768, height: 256, pad: 44, border: "#5B369E" }),
      }),
    [],
  );
  const open = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        map: canvasTexture(256, 128, (g, w, h) => {
          roundRect(g, 8, 8, w - 16, h - 16, 24);
          g.fillStyle = "#FFFFFF";
          g.fill();
          g.fillStyle = "#5B369E";
          g.font = "700 64px 'Red Hat Text', sans-serif";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText("BUKA", w / 2, h / 2 + 4);
        }),
      }),
    [],
  );
  useFrame(() => {
    if (openSign.current) (openSign.current.material as MeshBasicMaterial).opacity = 0.35 + live.sign * 0.65;
    if (glow.current) glow.current.material.opacity = live.sign * 0.85;
  });
  return (
    <group>
      <mesh position={[0, H + 0.82, D / 2 + 0.02]} material={mat}>
        <planeGeometry args={[2.6, 0.87]} />
      </mesh>
      <group position={[1.35, 1.75, D / 2 + 0.25]}>
        <mesh ref={openSign} material={open}>
          <planeGeometry args={[0.9, 0.45]} />
        </mesh>
        <sprite ref={glow} scale={[2.2, 1.4, 1]} position={[0, 0, -0.05]}>
          <spriteMaterial map={glowTexture()} color="#C3AEE7" transparent opacity={0} depthWrite={false} blending={AdditiveBlending} />
        </sprite>
      </group>
    </group>
  );
}

function Awning() {
  const n = 8;
  return (
    <group position={[0, H - 0.05, D / 2 + 0.35]} rotation={[0.45, 0, 0]}>
      {Array.from({ length: n }, (_, i) => (
        <Box key={i} size={[W / n, 0.05, 0.9]} at={[-W / 2 + W / n / 2 + (i * W) / n, 0, 0]} material={i % 2 ? M.wall : M.purpleMid} />
      ))}
    </group>
  );
}

function Shelves() {
  const stacks = [M.lilac, M.wall, M.lavender, M.floor, M.lilac, M.wall];
  return (
    <group position={[-0.6, 0, -D / 2 + 0.4]}>
      {[0.55, 1.2, 1.85].map((y) => (
        <Box key={y} size={[2.6, 0.06, 0.5]} at={[0, y, 0]} material={M.wallSoft} />
      ))}
      {stacks.map((m, i) => (
        <Box key={i} size={[0.36, 0.2 + (i % 3) * 0.06, 0.36]} at={[-1.05 + (i % 6) * 0.42, 0.58 + 0.13 + Math.floor(i / 3) * 0.65, 0]} material={m} />
      ))}
      {stacks.slice(0, 4).map((m, i) => (
        <Box key={`t${i}`} size={[0.4, 0.22, 0.36]} at={[-0.9 + i * 0.6, 1.98, 0]} material={m} />
      ))}
    </group>
  );
}

export function Shop() {
  const { pos, rot } = PLACES.shop;
  // The kasir set piece only exists while /fitur/kasir-pos is the active page.
  const kasirPage = usePage(featureStation("kasir-pos", 0));
  const absensiPage = usePage(featureStation("karyawan-absensi", 0));
  const antarPage = usePage(featureStation("antar-jemput", 0));
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <Room w={W} d={D} h={H} wall={M.wall} floor={M.floor}>
        {/* roof */}
        <Box size={[W + 0.3, 0.22, D + 0.3]} at={[0, H + 0.11, 0]} material={M.purple} />
        {/* side window */}
        <Box size={[0.16, 0.9, 1.4]} at={[W / 2 - 0.07, 1.5, 0.2]} material={M.window} />
        <Awning />
        <Sign />
        <Shelves />
        {/* counter */}
        <Box size={[2.2, 1, 0.6]} at={[0.5, 0.58, 0.55]} material={M.wall} />
        <Box size={[2.35, 0.07, 0.72]} at={[0.5, 1.11, 0.55]} material={M.purpleLight} />
        {/* POS screen on stand */}
        <group position={[0.75, 1.15, 0.5]}>
          <Cyl r={0.05} h={0.3} at={[0, 0.15, 0]} material={M.ink} seg={6} />
          <group position={[0, 0.58, 0]} rotation={[-0.12, -0.2, 0]}>
            <Box size={[1.02, 0.66, 0.05]} at={[0, 0, -0.03]} material={M.ink} />
            <group position={[0, 0, 0.001]}>
              <ScreenPanel kind="kasir" width={0.96} height={0.6} />
            </group>
          </group>
        </group>
        {/* scale with laundry basket */}
        <Box size={[0.5, 0.06, 0.4]} at={[-0.25, 1.17, 0.55]} material={M.slate} />
        <Cyl r={0.24} rTop={0.28} h={0.26} at={[-0.25, 1.33, 0.55]} material={M.lilac} seg={8} />
        {/* receipt printer */}
        <Box size={[0.22, 0.14, 0.2]} at={[1.45, 1.22, 0.55]} material={M.ink} />
        {/* laundry bags (cleared on the kasir page, where the customer stands there) */}
        {!kasirPage && [
          [-1.4, 0.4, 0.9, M.lavender],
          [-1.0, 0.36, 1.2, M.wallSoft],
          [-1.6, 0.32, 1.35, M.lilac],
        ].map(([x, s, z, m], i) => (
          <mesh key={i} position={[x as number, (s as number) * 0.9 + 0.16, z as number]} scale={[1, 0.9, 1]} material={m as never} castShadow>
            <icosahedronGeometry args={[s as number, 0]} />
          </mesh>
        ))}
        <AttendanceDevice />
        {kasirPage && <KasirScene />}
        {absensiPage && <AbsensiScene />}
        {antarPage && <AntarShopScene />}
      </Room>
    </group>
  );
}
