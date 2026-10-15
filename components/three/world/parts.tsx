"use client";

import type { ReactNode } from "react";
import type { Material } from "three";

type V3 = [number, number, number];

/** Box with shadows, positioned by its center. */
export function Box({ size, at, material, rot }: { size: V3; at: V3; material: Material; rot?: V3 }) {
  return (
    <mesh position={at} rotation={rot} material={material} castShadow receiveShadow>
      <boxGeometry args={size} />
    </mesh>
  );
}

export function Cyl({
  r,
  h,
  at,
  material,
  seg = 12,
  rot,
  rTop,
}: {
  r: number;
  h: number;
  at: V3;
  material: Material;
  seg?: number;
  rot?: V3;
  rTop?: number;
}) {
  return (
    <mesh position={at} rotation={rot} material={material} castShadow receiveShadow>
      <cylinderGeometry args={[rTop ?? r, r, h, seg]} />
    </mesh>
  );
}

/** Open-front room: floor, back + side walls. Facade faces +z. */
export function Room({ w, d, h, wall, floor, children }: { w: number; d: number; h: number; wall: Material; floor: Material; children?: ReactNode }) {
  const t = 0.14;
  return (
    <group>
      <Box size={[w, 0.16, d]} at={[0, 0.08, 0]} material={floor} />
      <Box size={[w, h, t]} at={[0, h / 2, -d / 2 + t / 2]} material={wall} />
      <Box size={[t, h, d]} at={[-w / 2 + t / 2, h / 2, 0]} material={wall} />
      <Box size={[t, h, d]} at={[w / 2 - t / 2, h / 2, 0]} material={wall} />
      {children}
    </group>
  );
}
