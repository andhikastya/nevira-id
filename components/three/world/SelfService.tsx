"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MeshBasicMaterial, type Group, type Mesh } from "three";
import { PLACES } from "../layout";
import { M, canvasTexture, logoBoardTexture, mat, roundRect } from "../materials";
import { live } from "../runtime";
import { featureStation } from "../stations";
import { InfoBubble, damp, inFocus, usePage } from "./kit";
import { Person } from "./Person";
import { Box, Cyl, Room } from "./parts";

/**
 * Self-service laundromat ("Laundry Self Service 24 jam"), north of the plaza.
 * Always part of the town; the /fitur/self-service set piece (status lights cycling,
 * an operator starting a session) mounts only on that page.
 */
const W = 4.6;
const D = 2.8;
const H = 2.6;
const MACHINE_X = [-1.65, -0.55, 0.55, 1.65];
const MACHINE_Z = -D / 2 + 0.62;

const ST = {
  hero: featureStation("self-service", 0),
  s1: featureStation("self-service", 1),
  s2: featureStation("self-service", 2),
  s3: featureStation("self-service", 3),
};

// Status lamps are unlit materials so they read at night.
const LAMP = {
  green: new MeshBasicMaterial({ color: "#3BD27A", toneMapped: false }),
  amber: new MeshBasicMaterial({ color: "#F5B83D", toneMapped: false }),
  idle: new MeshBasicMaterial({ color: "#B3B7C1", toneMapped: false }),
};
const NEON = mat("#C3AEE7", { emissive: "#B79BF0", emissiveIntensity: 0 });

/** Front-loader with a spinning drum; `spin` is read every frame (rad/s). */
/** Per-machine spin speed + lamp. Module-level (there is one laundromat); the page scene mutates it. */
const MACHINES = {
  spins: [4, 3, 0, -5],
  lamps: [LAMP.green, LAMP.green, LAMP.amber, LAMP.green],
};

function SsMachine({ x, i }: { x: number; i: number }) {
  const drum = useRef<Group>(null);
  const bulb = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (drum.current) drum.current.rotation.z += dt * MACHINES.spins[i];
    const lamp = MACHINES.lamps[i];
    if (bulb.current && bulb.current.material !== lamp) bulb.current.material = lamp;
  });
  return (
    <group position={[x, 0.16, MACHINE_Z]}>
      <Box size={[0.95, 1.1, 0.85]} at={[0, 0.55, 0]} material={M.wall} />
      <Box size={[0.95, 0.14, 0.86]} at={[0, 1.04, 0.005]} material={M.lilac} />
      <mesh ref={bulb} position={[0.32, 1.17, 0.3]} material={LAMP.idle}>
        <sphereGeometry args={[0.07, 14, 10]} />
      </mesh>
      <group position={[0, 0.5, 0.43]}>
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

function Signboard() {
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        alphaTest: 0.35,
        map: canvasTexture(768, 192, (c, w, h) => {
          roundRect(c, 6, 6, w - 12, h - 12, 28);
          c.fillStyle = "#FFFFFF";
          c.fill();
          c.lineWidth = 10;
          c.strokeStyle = "#5B369E";
          c.stroke();
          c.fillStyle = "#5B369E";
          c.font = "700 54px 'Red Hat Text', sans-serif";
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillText("Laundry Self Service", w / 2, h / 2 - 18);
          c.fillStyle = "#818898";
          c.font = "600 34px 'Red Hat Text', sans-serif";
          c.fillText("buka 24 jam", w / 2, h / 2 + 40);
        }),
      }),
    [],
  );
  const logo = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        alphaTest: 0.35,
        map: logoBoardTexture("/brand/nevira-logo.png", { width: 512, height: 192, pad: 34, border: "#5B369E" }),
      }),
    [],
  );
  return (
    <group>
      <mesh position={[-0.55, H + 0.62, D / 2 + 0.02]} material={mat}>
        <planeGeometry args={[2.6, 0.65]} />
      </mesh>
      <mesh position={[1.45, H + 0.62, D / 2 + 0.02]} material={logo}>
        <planeGeometry args={[1.3, 0.49]} />
      </mesh>
    </group>
  );
}

/** Small pay terminal by the door. */
function Kiosk() {
  const screen = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        map: canvasTexture(128, 160, (c, w, h) => {
          c.fillStyle = "#FFFFFF";
          c.fillRect(0, 0, w, h);
          c.fillStyle = "#5B369E";
          c.fillRect(0, 0, w, 28);
          c.fillStyle = "#32363E";
          for (let i = 0; i < 4; i++) {
            c.fillStyle = i === 1 ? "#3BD27A" : "#E6E7EA";
            c.fillRect(12, 40 + i * 28, w - 24, 18);
          }
        }),
      }),
    [],
  );
  return (
    <group position={[W / 2 - 0.45, 0.16, D / 2 - 0.35]} rotation={[0, -0.5, 0]}>
      <Cyl r={0.06} h={0.95} at={[0, 0.48, 0]} material={M.ink} seg={8} />
      <Box size={[0.36, 0.44, 0.1]} at={[0, 1.15, 0]} material={M.ink} />
      <mesh position={[0, 1.16, 0.052]} material={screen}>
        <planeGeometry args={[0.3, 0.38]} />
      </mesh>
    </group>
  );
}

/** Page set piece: lamps cycle on the monitor station, an operator starts machine 2. */
function SsPageScene() {
  const op = useRef<Group>(null);
  const k = useRef(0);
  useFrame((_, dt) => {
    const t = live.time;
    const started = inFocus([ST.s2, ST.s3]);
    k.current = damp(k.current, inFocus(ST.s2) ? 1 : 0, dt, 2);
    // Machine 3 is in maintenance (amber). Machine 2 idles until the operator starts a session.
    const m = MACHINES;
    m.lamps[2] = Math.sin(t * 4) > 0 ? LAMP.amber : LAMP.idle;
    m.spins[2] = 0;
    m.lamps[1] = started ? LAMP.green : LAMP.idle;
    m.spins[1] = damp(m.spins[1], started ? 6 : 0, dt, 1.5);
    if (op.current) {
      op.current.position.z = MACHINE_Z + 0.95 + (1 - k.current) * 0.5;
      op.current.visible = k.current > 0.02;
    }
  });
  return (
    <group>
      <group ref={op} position={[MACHINE_X[1] + 0.2, 0.16, MACHINE_Z + 1.2]} rotation={[0, Math.PI, 0]} scale={1.5}>
        <Person shirt={M.purpleSoft} hair={M.ink} pose="hold" />
      </group>
      <InfoBubble stations={ST.s1} at={[0, 2.15, 0.6]} icon="●" tone="green" title="4 mesin · 2 aktif" sub="1 maintenance · 1 siap dipakai" />
      <InfoBubble stations={ST.s2} at={[-0.4, 2.15, 0.6]} icon="▶" title="Sesi dimulai · Mesin 2" sub="Mulai manual oleh operator" />
    </group>
  );
}

export function SelfService() {
  const { pos, rot } = PLACES.selfService;
  const page = usePage(ST.hero);
  useFrame(() => {
    NEON.emissiveIntensity = live.dusk * 1.8;
    if (!page) {
      MACHINES.spins[1] = 3;
      MACHINES.lamps[1] = LAMP.green;
      MACHINES.lamps[2] = LAMP.amber;
    }
  });
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <Room w={W} d={D} h={H} wall={M.wall} floor={M.floor}>
        <Box size={[W + 0.3, 0.22, D + 0.3]} at={[0, H + 0.11, 0]} material={M.purple} />
        {/* neon strip along the facade, glows after dusk */}
        <Box size={[W, 0.06, 0.06]} at={[0, H - 0.08, D / 2 - 0.02]} material={NEON} />
        <Signboard />
        {MACHINE_X.map((x, i) => (
          <SsMachine key={x} x={x} i={i} />
        ))}
        {/* bench + folding counter */}
        <Box size={[1.4, 0.08, 0.4]} at={[-1.3, 0.5, D / 2 - 0.5]} material={M.timber} />
        {[-1.85, -0.75].map((x) => (
          <Box key={x} size={[0.08, 0.34, 0.36]} at={[x, 0.33, D / 2 - 0.5]} material={M.slate} />
        ))}
        <Box size={[0.7, 0.3, 0.3]} at={[-1.3, 0.69, D / 2 - 0.55]} material={M.lilac} />
        <Kiosk />
        {page && <SsPageScene />}
      </Room>
    </group>
  );
}
