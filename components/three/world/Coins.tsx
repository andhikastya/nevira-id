"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, MathUtils, Matrix4, Quaternion, Vector3, type Group, type InstancedMesh, type Sprite } from "three";
import { useScene } from "@/lib/sceneStore";
import { PLACES } from "../layout";
import { M, canvasTexture, glowTexture } from "../materials";
import { live } from "../runtime";

const PER_STACK = 12;
const STACKS: [number, number][] = [
  [0, 0],
  [0.72, 0.2],
  [-0.62, 0.35],
];
const MAX = PER_STACK * STACKS.length;
const COIN_H = 0.085;

/** Saldo Koin: the one gold element in the world. Stack height follows the pricing calculator. */
export function Coins() {
  const inst = useRef<InstancedMesh>(null);
  const big = useRef<Group>(null);
  const glow = useRef<Sprite>(null);
  const shown = useRef(0);
  const m = useMemo(() => new Matrix4(), []);
  const q = useMemo(() => new Quaternion(), []);
  const face = useMemo(
    () =>
      canvasTexture(256, 256, (g, w, h) => {
        g.fillStyle = "#E8B723";
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#F1D378";
        g.lineWidth = 14;
        g.beginPath();
        g.arc(w / 2, h / 2, w / 2 - 22, 0, Math.PI * 2);
        g.stroke();
        g.fillStyle = "#8F6F0E";
        g.font = "700 130px 'Red Hat Text', sans-serif";
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("N", w / 2, h / 2 + 8);
      }),
    [],
  );

  useFrame((_, dt) => {
    const goal = useScene.getState().coinLevel * MAX;
    shown.current = MathUtils.lerp(shown.current, goal, 1 - Math.exp(-dt * 6));
    const count = Math.max(1, Math.round(shown.current));
    if (inst.current) {
      for (let i = 0; i < MAX; i++) {
        const s = i % STACKS.length;
        const level = Math.floor(i / STACKS.length);
        const visible = i < count;
        const [sx, sz] = STACKS[s];
        const wobble = Math.sin(i * 12.9898) * 0.03;
        m.compose(
          new Vector3(sx + wobble, 0.42 + level * COIN_H, sz + wobble * 0.7),
          q,
          visible ? new Vector3(1, 1, 1) : new Vector3(0, 0, 0),
        );
        inst.current.setMatrixAt(i, m);
      }
      inst.current.instanceMatrix.needsUpdate = true;
    }
    const top = 0.42 + Math.ceil(count / STACKS.length) * COIN_H;
    if (big.current) {
      big.current.position.y = top + 0.9 + Math.sin(live.time * 1.5) * 0.1;
      big.current.rotation.y = live.time * 1.2;
    }
    if (glow.current) {
      glow.current.position.y = big.current?.position.y ?? 2;
      glow.current.material.opacity = live.focus === "pricing" ? 0.7 : 0.35;
    }
  });

  const { pos } = PLACES.coins;
  return (
    <group position={pos}>
      {/* pedestal */}
      <mesh position={[0, 0.2, 0.1]} material={M.wall} castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.5, 0.4, 8]} />
      </mesh>
      <instancedMesh ref={inst} args={[undefined, M.gold, MAX]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, COIN_H * 0.9, 20]} />
      </instancedMesh>
      <group ref={big} position={[0, 2, 0.1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={M.gold} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 28]} />
        </mesh>
        {[1, -1].map((sgn) => (
          <mesh key={sgn} position={[0, 0, sgn * 0.052]} rotation={[0, sgn < 0 ? Math.PI : 0, 0]}>
            <circleGeometry args={[0.47, 28]} />
            <meshStandardMaterial map={face} metalness={0.5} roughness={0.35} />
          </mesh>
        ))}
      </group>
      <sprite ref={glow} position={[0, 2, 0.1]} scale={2.4}>
        <spriteMaterial map={glowTexture()} color="#F1D378" transparent opacity={0.4} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
    </group>
  );
}
