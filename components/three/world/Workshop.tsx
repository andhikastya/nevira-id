"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { PLACES } from "../layout";
import { M } from "../materials";
import { ScreenPanel } from "../ScreenPanel";
import { featureStation } from "../stations";
import { usePage } from "./kit";
import { ProduksiScene } from "./ProduksiScene";
import { Box, Cyl, Room } from "./parts";

const W = 4.4;
const D = 3;
const H = 2.5;

function Machine({ x, speed }: { x: number; speed: number }) {
  const drum = useRef<Group>(null);
  useFrame((_, dt) => {
    if (drum.current) drum.current.rotation.z += dt * speed;
  });
  return (
    <group position={[x, 0.16, -D / 2 + 0.6]}>
      <Box size={[0.95, 1.05, 0.85]} at={[0, 0.525, 0]} material={M.wall} />
      <Box size={[0.95, 0.16, 0.86]} at={[0, 0.98, 0.005]} material={M.wallSoft} />
      <Box size={[0.18, 0.06, 0.02]} at={[0.25, 0.98, 0.44]} material={M.purpleLight} />
      <group position={[0, 0.48, 0.43]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={M.slate}>
          <torusGeometry args={[0.3, 0.045, 6, 18]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.01]} material={M.glass}>
          <cylinderGeometry args={[0.28, 0.28, 0.02, 18]} />
        </mesh>
        <group ref={drum} position={[0, 0, 0.012]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]} material={M.lavender}>
              <boxGeometry args={[0.46, 0.05, 0.01]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export function Workshop() {
  const { pos, rot } = PLACES.workshop;
  const page = usePage(featureStation("produksi", 0));
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <Room w={W} d={D} h={H} wall={M.wallSoft} floor={M.floor}>
        <Box size={[W + 0.3, 0.2, D + 0.3]} at={[0, H + 0.1, 0]} material={M.purpleMid} />
        <Box size={[1.2, 0.5, 0.08]} at={[1.2, H - 0.4, -D / 2 + 0.16]} material={M.window} />
        <Machine x={-1.45} speed={4} />
        <Machine x={-0.4} speed={-3} />
        <Machine x={0.65} speed={5} />
        {/* folding table with clothes */}
        <Box size={[1.1, 0.06, 0.7]} at={[1.6, 0.85, 0.5]} material={M.wall} />
        {[-0.38, 0.38].map((dx) =>
          [-0.25, 0.25].map((dz) => <Box key={`${dx}${dz}`} size={[0.05, 0.7, 0.05]} at={[1.6 + dx, 0.5, 0.5 + dz]} material={M.slate} />),
        )}
        <Box size={[0.38, 0.12, 0.3]} at={[1.42, 0.94, 0.45]} material={M.lilac} />
        <Box size={[0.38, 0.1, 0.3]} at={[1.82, 0.93, 0.55]} material={M.lavender} />
        {/* baskets */}
        <Cyl r={0.26} rTop={0.3} h={0.38} at={[-1.3, 0.35, 0.6]} material={M.lilac} seg={8} />
        <Cyl r={0.26} rTop={0.3} h={0.38} at={[-0.6, 0.35, 0.8]} material={M.lavender} seg={8} />
        {/* wall tablet: POS Produksi */}
        <group position={[W / 2 - 0.09, 1.55, 0.2]} rotation={[0, -Math.PI / 2, 0]}>
          <Box size={[1.06, 0.7, 0.04]} at={[0, 0, -0.025]} material={M.ink} />
          <ScreenPanel kind="produksi" width={1} height={0.64} />
        </group>
        {/* work-order tags on a line (the produksi page swaps these for a full work board) */}
        {!page && (
          <>
            <Box size={[2.6, 0.015, 0.015]} at={[-0.4, 1.95, -D / 2 + 0.3]} material={M.slate} />
            {[-1.4, -0.9, -0.3, 0.3].map((x, i) => (
              <Box key={x} size={[0.2, 0.26, 0.01]} at={[x, 1.8, -D / 2 + 0.31]} material={i === 1 ? M.purpleLight : M.wall} />
            ))}
          </>
        )}
        {page && <ProduksiScene />}
      </Room>
    </group>
  );
}
