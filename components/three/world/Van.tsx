"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { ExtrudeGeometry, MeshBasicMaterial, Shape, type Group } from "three";
import { RoundedBox } from "@react-three/drei";
import { M, logoBoardTexture, mat } from "../materials";
import { vanPos } from "../runtime";
import { Courier } from "./Person";
import { ringCurve } from "./Island";

/** Courier vespa looping the ring road. */
export function Van() {
  const g = useRef<Group>(null);
  const u = useRef(0.1);
  useFrame((_, dt) => {
    u.current = (u.current + dt * 0.035) % 1;
    const p = ringCurve.getPointAt(u.current);
    const t = ringCurve.getTangentAt(u.current);
    if (g.current) {
      // Drive on the right-hand lane offset from center.
      g.current.position.set(p.x - t.z * 0.25, 0.04, p.z + t.x * 0.25);
      g.current.rotation.y = Math.atan2(t.x, t.z);
      vanPos.copy(g.current.position);
    }
  });
  return (
    <group ref={g}>
      <Vespa />
      {/* rider: hips on the seat, feet on the floorboard, hands on the grips (vespa is at VESPA_SCALE) */}
      {/* sits toward the front of the seat so the back stays upright */}
      <group position={[0, 0.14, -0.04]}>
        <Courier pose="ride" />
      </group>
    </group>
  );
}

const CREAM = mat("#F1E6C8", { flatShading: false, roughness: 0.5 });
const TIRE = mat("#3A2265", { flatShading: false, roughness: 0.9 });
const CHROME = mat("#CDCFD6", { flatShading: false, roughness: 0.3, metalness: 0.6 });

/** Side silhouette of the body (u = forward, v = up), extruded across the width. */
function bodyGeometry() {
  const s = new Shape();
  s.moveTo(-0.56, 0.24);
  s.quadraticCurveTo(-0.66, 0.44, -0.46, 0.6); // rounded rear
  s.lineTo(-0.06, 0.6); // under the seat
  s.quadraticCurveTo(0.02, 0.6, 0.02, 0.48);
  s.lineTo(0.03, 0.27); // step down to the floorboard
  s.lineTo(0.3, 0.27);
  s.quadraticCurveTo(0.37, 0.6, 0.39, 0.94); // leg shield rises to the headset
  s.lineTo(0.47, 0.94);
  s.quadraticCurveTo(0.52, 0.55, 0.44, 0.2); // front of the shield curves down
  s.lineTo(0.3, 0.16);
  s.lineTo(-0.18, 0.16);
  s.quadraticCurveTo(-0.3, 0.2, -0.56, 0.24);
  const width = 0.24;
  const g = new ExtrudeGeometry(s, { depth: width, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 5, curveSegments: 18 });
  g.translate(0, 0, -width / 2);
  g.rotateY(-Math.PI / 2); // shape u → world +z (forward), extrusion → x (width)
  return g;
}

function Wheel({ z }: { z: number }) {
  return (
    <group position={[0, 0.16, z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh material={TIRE} castShadow>
        <torusGeometry args={[0.11, 0.055, 12, 24]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={CHROME}>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 18]} />
      </mesh>
    </group>
  );
}

/** Vespa is modelled at real-ish size, then scaled to sit with the storybook people. */
const VESPA_SCALE = 0.72;

/** Nevira logo on a white rounded label plate, stuck on the delivery box. */
function useBoxLabel() {
  return useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        alphaTest: 0.35,
        map: logoBoardTexture("/brand/nevira-logo.png", { width: 360, height: 140, pad: 22, radius: 26 }),
      }),
    [],
  );
}

/** Cream vespa with purple accents carrying a Nevira delivery box (+z is forward). */
export function Vespa() {
  const body = useMemo(() => bodyGeometry(), []);
  const label = useBoxLabel();
  return (
    <group scale={VESPA_SCALE}>
      <Wheel z={0.42} />
      <Wheel z={-0.36} />
      <mesh geometry={body} material={CREAM} castShadow receiveShadow />
      {/* bulging rear side cowls (the classic vespa hips) */}
      {[-1, 1].map((sx) => (
        <mesh key={sx} position={[sx * 0.13, 0.38, -0.3]} scale={[0.55, 0.62, 1]} material={CREAM} castShadow>
          <sphereGeometry args={[0.24, 20, 16]} />
        </mesh>
      ))}
      {/* front fender hugging the wheel */}
      <mesh position={[0, 0.2, 0.42]} rotation={[0, Math.PI / 2, 0]} material={CREAM} castShadow>
        <torusGeometry args={[0.15, 0.06, 10, 18, Math.PI]} />
      </mesh>
      {/* headset: rounded block with headlight, handlebar, grips, mirrors */}
      <mesh position={[0, 0.99, 0.44]} scale={[1, 0.55, 0.8]} material={CREAM} castShadow>
        <sphereGeometry args={[0.13, 18, 14]} />
      </mesh>
      <mesh position={[0, 1.0, 0.43]} rotation={[0, 0, Math.PI / 2]} material={CREAM} castShadow>
        <capsuleGeometry args={[0.03, 0.4, 4, 10]} />
      </mesh>
      {[-1, 1].map((sx) => (
        <group key={sx}>
          <mesh position={[sx * 0.25, 1.0, 0.43]} rotation={[0, 0, Math.PI / 2]} material={M.purpleSoft}>
            <capsuleGeometry args={[0.032, 0.07, 4, 10]} />
          </mesh>
          <mesh position={[sx * 0.18, 1.1, 0.42]} rotation={[0, 0, sx * -0.35]} material={CHROME}>
            <cylinderGeometry args={[0.008, 0.008, 0.18, 6]} />
          </mesh>
          <mesh position={[sx * 0.215, 1.19, 0.42]} rotation={[Math.PI / 2, 0, 0]} material={CHROME}>
            <cylinderGeometry args={[0.045, 0.045, 0.015, 14]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.98, 0.55]} rotation={[Math.PI / 2, 0, 0]} material={CHROME}>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 18]} />
      </mesh>
      <mesh position={[0, 0.98, 0.578]} rotation={[Math.PI / 2, 0, 0]} material={M.window}>
        <cylinderGeometry args={[0.056, 0.056, 0.01, 18]} />
      </mesh>
      {/* purple seat */}
      <mesh position={[0, 0.65, -0.26]} rotation={[Math.PI / 2, 0, 0]} scale={[1.2, 1, 0.75]} material={M.purpleSoft} castShadow>
        <capsuleGeometry args={[0.1, 0.3, 6, 14]} />
      </mesh>
      {/* rear rack + Nevira delivery box */}
      <mesh position={[0, 0.66, -0.62]} material={M.ink}>
        <boxGeometry args={[0.36, 0.025, 0.3]} />
      </mesh>
      <group position={[0, 0.87, -0.63]}>
        <RoundedBox args={[0.44, 0.4, 0.4]} radius={0.05} smoothness={4} material={M.purpleSoft} castShadow />
        <RoundedBox args={[0.46, 0.07, 0.42]} radius={0.03} smoothness={3} position={[0, 0.17, 0]} material={M.purpleLightSoft} />
        {[-1, 1].map((sx) => (
          <mesh key={sx} position={[sx * 0.222, -0.02, 0]} rotation={[0, sx * Math.PI / 2, 0]} material={label}>
            <planeGeometry args={[0.34, 0.132]} />
          </mesh>
        ))}
        <mesh position={[0, -0.02, -0.202]} rotation={[0, Math.PI, 0]} material={label}>
          <planeGeometry args={[0.34, 0.132]} />
        </mesh>
      </group>
    </group>
  );
}
