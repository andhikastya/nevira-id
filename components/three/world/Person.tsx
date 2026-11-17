"use client";

import { useMemo } from "react";
import { Quaternion, Vector3, type Material } from "three";
import { M, mat } from "../materials";

type P3 = [number, number, number];

const PANTS = mat("#4C4A6B", { flatShading: false, roughness: 0.9 });

/** Capsule spanning two joints (an arm or leg segment). */
function Limb({ from, to, r, material }: { from: P3; to: P3; r: number; material: Material }) {
  const { mid, quat, len } = useMemo(() => {
    const a = new Vector3(...from);
    const b = new Vector3(...to);
    const dir = b.clone().sub(a);
    const length = dir.length();
    return {
      mid: a.clone().add(b).multiplyScalar(0.5),
      quat: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir.normalize()),
      len: Math.max(0.001, length),
    };
  }, [from, to]);
  return (
    <mesh position={mid} quaternion={quat} material={material} castShadow>
      <capsuleGeometry args={[r, len, 4, 10]} />
    </mesh>
  );
}

/**
 * Joint positions per pose (person-local; feet at y=0, facing +z).
 * L/R are mirrored on x.
 */
/** Right-side joints (mirrored to the left), unless `elbowL` / `handL` give the left arm its own position. */
type Pose = { hip: P3; knee: P3; ankle: P3; shoulder: P3; elbow: P3; hand: P3; elbowL?: P3; handL?: P3 };

// Limb lengths are kept equal across poses (upper arm ≈ 0.14, forearm ≈ 0.13,
// thigh ≈ 0.18, shin ≈ 0.17) so the figure stays in proportion when it moves.
const POSES = {
  stand: { hip: [0.07, 0.38, 0], knee: [0.075, 0.21, 0.01], ankle: [0.075, 0.05, 0], shoulder: [0.14, 0.6, 0], elbow: [0.17, 0.47, 0.01], hand: [0.17, 0.35, 0.03] },
  /** arms forward, e.g. handing over or receiving a box */
  hold: { hip: [0.07, 0.38, 0], knee: [0.075, 0.21, 0.01], ankle: [0.075, 0.05, 0], shoulder: [0.14, 0.6, 0], elbow: [0.16, 0.5, 0.1], hand: [0.11, 0.5, 0.21] },
  /** checking a phone: right hand at chest height in front, left arm relaxed */
  phone: { hip: [0.07, 0.38, 0], knee: [0.075, 0.21, 0.01], ankle: [0.075, 0.05, 0], shoulder: [0.14, 0.6, 0], elbow: [0.15, 0.48, 0.06], hand: [0.07, 0.56, 0.17], elbowL: [-0.17, 0.47, 0.01], handL: [-0.17, 0.35, 0.03] },
  /** seated upright on the vespa: knees bent, feet on the floorboard, forearms forward to the grips */
  ride: { hip: [0.07, 0.38, 0], knee: [0.08, 0.3, 0.16], ankle: [0.08, 0.14, 0.22], shoulder: [0.13, 0.6, 0.06], elbow: [0.17, 0.55, 0.19], hand: [0.18, 0.58, 0.33] },
} satisfies Record<string, Pose>;

export type PoseName = keyof typeof POSES;

/** Storybook person with arms, hands, legs, shoes, eyes and hair. */
/** `hat`: the head wears a cap (Courier), so only a neat band of hair shows below it at the back and sides. */
export function Person({ shirt, hair, pose = "stand", hat = false }: { shirt: Material; hair: Material; pose?: PoseName; hat?: boolean }) {
  const p: Pose = POSES[pose];
  const mirror = (v: P3, s: number): P3 => [v[0] * s, v[1], v[2]];
  const elbowOf = (s: number): P3 => (s < 0 && p.elbowL ? p.elbowL : mirror(p.elbow, s));
  const handOf = (s: number): P3 => (s < 0 && p.handL ? p.handL : mirror(p.hand, s));
  // torso leans so the head follows the shoulders
  const headZ = p.shoulder[2];

  return (
    <group>
      {[-1, 1].map((s) => (
        <group key={s}>
          {/* legs + shoes */}
          <Limb from={mirror(p.hip, s)} to={mirror(p.knee, s)} r={0.055} material={PANTS} />
          <Limb from={mirror(p.knee, s)} to={mirror(p.ankle, s)} r={0.05} material={PANTS} />
          <mesh position={[p.ankle[0] * s, p.ankle[1] - 0.015, p.ankle[2] + 0.035]} scale={[1, 0.7, 1.5]} material={M.ink} castShadow>
            <sphereGeometry args={[0.055, 12, 10]} />
          </mesh>
          {/* arms + hands */}
          <Limb from={mirror(p.shoulder, s)} to={elbowOf(s)} r={0.042} material={shirt} />
          <Limb from={elbowOf(s)} to={handOf(s)} r={0.038} material={M.skin} />
          <mesh position={handOf(s)} material={M.skin}>
            <sphereGeometry args={[0.045, 12, 10]} />
          </mesh>
        </group>
      ))}
      {/* hips + torso */}
      <Limb from={[-0.07, 0.38, 0]} to={[0.07, 0.38, 0]} r={0.075} material={PANTS} />
      <Limb from={[0, 0.42, 0]} to={[0, 0.58, p.shoulder[2] * 0.9]} r={0.13} material={shirt} />
      {/* head, hair, eyes */}
      <group position={[0, 0.8, headZ]}>
        <mesh material={M.skin} castShadow>
          <sphereGeometry args={[0.13, 18, 14]} />
        </mesh>
        {hat ? (
          // under a cap: short hair hugging the head below the brim (stays inside the cap's radius, so nothing pokes through)
          <mesh position={[0, 0, -0.004]} material={hair}>
            <sphereGeometry args={[0.1335, 24, 8, Math.PI * 0.85, Math.PI * 1.3, Math.PI * 0.44, Math.PI * 0.24]} />
          </mesh>
        ) : (
          <>
            <mesh position={[0, 0.035, -0.015]} scale={[1.06, 0.8, 1.06]} material={hair}>
              <sphereGeometry args={[0.13, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
            {/* hair down the back of the head, so the head doesn't read as a bowl from behind */}
            <mesh position={[0, 0.0, -0.012]} scale={[1.05, 1, 1.05]} material={hair}>
              <sphereGeometry args={[0.13, 18, 10, Math.PI, Math.PI, Math.PI * 0.42, Math.PI * 0.36]} />
            </mesh>
          </>
        )}
        {/* ears */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.128, -0.012, 0]} scale={[0.45, 0.9, 0.65]} material={M.skin}>
            <sphereGeometry args={[0.035, 10, 8]} />
          </mesh>
        ))}
        {[-0.045, 0.045].map((x) => (
          <mesh key={x} position={[x, -0.005, 0.122]} material={M.ink}>
            <sphereGeometry args={[0.016, 8, 6]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Nevira courier: purple shirt + purple cap. */
export function Courier({ pose = "stand" }: { pose?: PoseName }) {
  const headZ = (POSES[pose] as Pose).shoulder[2];
  return (
    <group>
      <Person shirt={M.purpleSoft} hair={M.ink} pose={pose} hat />
      <group position={[0, 0.83, headZ]}>
        <mesh material={M.purpleSoft} castShadow>
          <sphereGeometry args={[0.14, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* button on top */}
        <mesh position={[0, 0.138, 0]} material={M.purpleSoft}>
          <sphereGeometry args={[0.018, 10, 8]} />
        </mesh>
        <mesh position={[0, 0.0, 0.14]} rotation={[0.15, 0, 0]} material={M.purpleSoft}>
          <boxGeometry args={[0.2, 0.02, 0.13]} />
        </mesh>
      </group>
    </group>
  );
}
