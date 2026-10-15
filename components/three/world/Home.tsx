"use client";

import { Billboard, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { ExtrudeGeometry, MathUtils, MeshBasicMaterial, Shape, type Group, type Material } from "three";
import { PLACES } from "../layout";
import { M, canvasTexture, mat, roundRect, shingleTexture } from "../materials";
import { Cat } from "./Cat";
import { Courier, Person } from "./Person";
import { Vespa } from "./Van";
import { live } from "../runtime";
import { Box } from "./parts";

const FOCUS = "journey-selesai";

/** "Order selesai · lunas" card that pops when step 4 is in focus. */
function Bubble() {
  const g = useRef<Group>(null);
  const s = useRef(0);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        map: canvasTexture(640, 220, (c, w, h) => {
          c.shadowColor = "rgba(13,13,18,0.18)";
          c.shadowBlur = 24;
          c.shadowOffsetY = 6;
          roundRect(c, 20, 16, w - 40, h - 60, 28);
          c.fillStyle = "#FFFFFF";
          c.fill();
          c.shadowColor = "transparent";
          c.beginPath();
          c.moveTo(80, h - 46);
          c.lineTo(110, h - 12);
          c.lineTo(130, h - 46);
          c.fill();
          c.fillStyle = "#EAFFF0";
          c.beginPath();
          c.arc(80, 82, 30, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = "#277547";
          c.font = "700 30px 'Red Hat Text', sans-serif";
          c.textAlign = "center";
          c.fillText("✓", 80, 93);
          c.textAlign = "left";
          c.fillStyle = "#32363E";
          c.font = "700 30px 'Red Hat Text', sans-serif";
          c.fillText("Order #0412 · Selesai", 130, 70);
          c.fillStyle = "#4C515D";
          c.font = "500 26px 'Red Hat Text', sans-serif";
          c.fillText("Lunas Rp71.000 · QRIS", 130, 112);
        }),
      }),
    [],
  );
  useFrame((_, dt) => {
    const goal = live.focus === FOCUS ? 1 : live.focus === "connected" || live.focus === "hero" ? 0.55 : 0;
    s.current = MathUtils.lerp(s.current, goal, 1 - Math.exp(-dt * 5));
    if (g.current) {
      g.current.scale.setScalar(Math.max(0.0001, s.current));
      g.current.position.y = 3.7 + Math.sin(live.time * 1.6) * 0.08;
    }
  });
  return (
    <group ref={g} position={[-0.3, 3.7, 1.2]}>
      <Billboard>
        <mesh material={mat}>
          <planeGeometry args={[2.6, 0.9]} />
        </mesh>
      </Billboard>
    </group>
  );
}

const W = 2.6; // width (x)
const D = 2.4; // depth (z); front door faces +z
const H = 1.7; // wall height
const RISE = 1.0; // gable rise
const OV = 0.24; // roof overhang

/** One sloped roof plane (side = +1 right, -1 left). */
function RoofPlane({ side, material }: { side: 1 | -1; material: Material }) {
  const a = Math.atan2(RISE, W / 2);
  const hw = W / 2 + OV;
  const len = hw / Math.cos(a);
  const t = 0.12;
  const cx = side * (hw / 2 + Math.sin(a) * t * 0.5);
  const cy = H + RISE - (hw / 2) * Math.tan(a) + Math.cos(a) * t * 0.5;
  return (
    <mesh position={[cx, cy, 0]} rotation={[0, 0, -side * a]} material={material} castShadow receiveShadow>
      <boxGeometry args={[len, t, D + OV * 2]} />
    </mesh>
  );
}

function Window({ at, rotY = 0 }: { at: [number, number, number]; rotY?: number }) {
  return (
    <group position={at} rotation={[0, rotY, 0]}>
      <Box size={[0.66, 0.6, 0.05]} at={[0, 0, 0]} material={M.frame} />
      <Box size={[0.52, 0.46, 0.06]} at={[0, 0, 0.005]} material={M.window} />
      <Box size={[0.04, 0.46, 0.07]} at={[0, 0, 0.01]} material={M.frame} />
      <Box size={[0.52, 0.04, 0.07]} at={[0, 0, 0.01]} material={M.frame} />
      {/* shutters */}
      <Box size={[0.2, 0.6, 0.04]} at={[-0.45, 0, 0]} material={M.timber} />
      <Box size={[0.2, 0.6, 0.04]} at={[0.45, 0, 0]} material={M.timber} />
      {/* flower box */}
      <Box size={[0.66, 0.12, 0.16]} at={[0, -0.36, 0.06]} material={M.timber} />
      {[-0.22, -0.07, 0.08, 0.23].map((x, i) => (
        <mesh key={x} position={[x, -0.27, 0.07]} material={i % 2 ? M.pinkA : M.lavenderSprig}>
          <sphereGeometry args={[0.07, 10, 8]} />
        </mesh>
      ))}
    </group>
  );
}

const DOOR_X = -0.55;

/**
 * Courier hands the laundry bag to the customer at the door. The bag travels
 * between their hands as step 4 comes into focus.
 */
function Handoff() {
  const bag = useRef<Group>(null);
  const courier = useRef<Group>(null);
  const k = useRef(0);
  useFrame((_, dt) => {
    const goal = live.focus === FOCUS ? 1 : 0;
    k.current = MathUtils.lerp(k.current, goal, 1 - Math.exp(-dt * 1.6));
    const t = MathUtils.smoothstep(k.current, 0.15, 0.9);
    if (bag.current) {
      // from the courier's arms (z≈1.0) to the customer's (z≈0.45), with a small lift
      bag.current.position.set(DOOR_X + 0.02, 0.62 + Math.sin(t * Math.PI) * 0.12, D / 2 + 1.0 - t * 0.5);
    }
    if (courier.current) courier.current.position.z = D / 2 + 1.25 - t * 0.12;
  });
  return (
    <group>
      {/* customer at the door */}
      <group position={[DOOR_X, 0.24, D / 2 + 0.3]}>
        <Person shirt={M.mint} hair={M.timber} pose="hold" />
      </group>
      {/* courier in Nevira purple with a cap */}
      <group ref={courier} position={[DOOR_X, 0.04, D / 2 + 1.25]} rotation={[0, Math.PI, 0]}>
        <Courier pose="hold" />
      </group>
      <group ref={bag}>
        {/* folded laundry, delivered boxed */}
        <RoundedBox args={[0.3, 0.2, 0.24]} radius={0.03} smoothness={3} material={M.purpleSoft} castShadow />
        <RoundedBox args={[0.31, 0.04, 0.25]} radius={0.015} smoothness={2} position={[0, 0.09, 0]} material={M.purpleLightSoft} />
      </group>
    </group>
  );
}

/** Customer's cottage where the order is handed over and paid (step 4: Selesai & lunas). */
export function Home() {
  const { pos, rot } = PLACES.home;
  const roof = useMemo(
    () => mat("#FFFFFF", { map: shingleTexture([124, 86, 196], "rgba(43,25,77,0.55)", [3, 3]), flatShading: false, roughness: 0.85 }),
    [],
  );
  const gable = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-W / 2, 0);
    shape.lineTo(W / 2, 0);
    shape.lineTo(0, RISE);
    shape.closePath();
    const g = new ExtrudeGeometry(shape, { depth: D, bevelEnabled: false });
    g.translate(0, 0, -D / 2);
    return g;
  }, []);

  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <Box size={[W + 0.14, 0.24, D + 0.14]} at={[0, 0.12, 0]} material={M.stone} />
      <Box size={[W, H, D]} at={[0, H / 2, 0]} material={M.plaster} />
      <mesh geometry={gable} position={[0, H, 0]} material={M.plaster} castShadow receiveShadow />
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => <Box key={`${sx}${sz}`} size={[0.12, H, 0.12]} at={[sx * (W / 2), H / 2, sz * (D / 2)]} material={M.timber} />),
      )}
      <Box size={[W + 0.1, 0.1, 0.06]} at={[0, H - 0.03, D / 2 + 0.03]} material={M.timber} />
      <Box size={[0.08, RISE * 0.62, 0.05]} at={[0, H + RISE * 0.31, D / 2 + 0.03]} material={M.timber} />
      <mesh position={[0, H + 0.38, D / 2 + 0.03]} rotation={[Math.PI / 2, 0, 0]} material={M.window}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 20]} />
      </mesh>
      <mesh position={[0, H + 0.38, D / 2 + 0.05]} material={M.frame}>
        <torusGeometry args={[0.17, 0.03, 8, 24]} />
      </mesh>
      <RoofPlane side={1} material={roof} />
      <RoofPlane side={-1} material={roof} />
      <mesh position={[0, H + RISE + 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={M.purple} castShadow>
        <cylinderGeometry args={[0.08, 0.08, D + OV * 2, 10]} />
      </mesh>
      <Box size={[0.34, 1.0, 0.34]} at={[0.62, H + RISE * 0.62, -0.45]} material={M.stone} />
      <Box size={[0.42, 0.08, 0.42]} at={[0.62, H + RISE * 0.62 + 0.52, -0.45]} material={M.stone} />
      {/* open front door */}
      <group position={[DOOR_X, 0.24, D / 2]}>
        <Box size={[0.66, 0.98, 0.04]} at={[0, 0.49, 0.01]} material={M.stone} />
        <Box size={[0.5, 0.86, 0.05]} at={[0, 0.43, 0.02]} material={M.ink} />
        <Box size={[0.06, 0.86, 0.5]} at={[-0.25, 0.43, 0.26]} material={M.timber} />
        <Box size={[0.7, 0.1, 0.32]} at={[0, -0.19, 0.2]} material={M.stone} />
      </group>
      <Window at={[0.6, 1.05, D / 2 + 0.03]} />
      <Window at={[W / 2 + 0.03, 1.05, 0.1]} rotY={Math.PI / 2} />
      {[0.75, 1.15, 1.55, 1.95].map((z, i) => (
        <mesh key={z} position={[DOOR_X + (i % 2 ? 0.06 : -0.04), 0.03, D / 2 + z]} material={M.stone} receiveShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.05, 9]} />
        </mesh>
      ))}
      {[
        [-1.3, D / 2 + 0.35, 0.3, M.leafA],
        [1.35, D / 2 + 0.3, 0.28, M.leafB],
        [W / 2 + 0.35, -0.7, 0.3, M.pinkA],
      ].map(([x, z, r, m], i) => (
        <mesh key={i} position={[x as number, (r as number) * 0.8, z as number]} scale={[1, 0.85, 1]} material={m as Material} castShadow>
          <sphereGeometry args={[r as number, 14, 11]} />
        </mesh>
      ))}
      {/* courier's vespa parked at the curb, side-on to the house */}
      <group position={[DOOR_X + 1.1, 0.04, D / 2 + 2.45]} rotation={[0, Math.PI / 2, 0]}>
        <Vespa />
      </group>
      {/* the household cat, sitting on the lawn by the window */}
      <group position={[0.45, 0.0, D / 2 + 0.6]} rotation={[0, 0.35, 0]} scale={1.4}>
        <Cat focus={FOCUS} />
      </group>
      <Handoff />
      <Bubble />
    </group>
  );
}
