"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, MathUtils, TubeGeometry, Vector3, type Group } from "three";
import { mat } from "../materials";
import { live } from "../runtime";

const FUR = mat("#E8A15C", { flatShading: false, roughness: 0.9 });
const FUR_DARK = mat("#C9783A", { flatShading: false, roughness: 0.9 });
const WHITE = mat("#FFF7EC", { flatShading: false, roughness: 0.9 });
const PINK = mat("#F2A7A7", { flatShading: false });
const EYE = mat("#2B2F2A", { flatShading: false, roughness: 0.3 });

/** Storybook ginger cat sitting upright (+z is forward). Tail swishes, blinks, turns its head on cue. */
export function Cat({ focus }: { focus: string }) {
  const head = useRef<Group>(null);
  const tail = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  const turn = useRef(0);

  // Tail: a tube curling out from the back and around the right side.
  const tailGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0, 0.03, -0.09),
      new Vector3(0.06, 0.02, -0.16),
      new Vector3(0.14, 0.03, -0.12),
      new Vector3(0.17, 0.05, -0.02),
      new Vector3(0.14, 0.08, 0.06),
    ]);
    return new TubeGeometry(curve, 24, 0.022, 8, false);
  }, []);

  useFrame((_, dt) => {
    const t = live.time;
    if (tail.current) tail.current.rotation.y = Math.sin(t * 1.8) * 0.35;
    // look toward the viewer while step 4 is in focus, otherwise idle glances
    const goal = live.focus === focus ? 0.55 : Math.sin(t * 0.4) * 0.3;
    turn.current = MathUtils.lerp(turn.current, goal, 1 - Math.exp(-dt * 2));
    if (head.current) {
      head.current.rotation.y = turn.current;
      head.current.rotation.z = Math.sin(t * 0.9) * 0.05;
    }
    // blink every few seconds
    if (eyes.current) eyes.current.scale.y = (t % 3.6) < 0.12 ? 0.15 : 1;
  });

  return (
    <group>
      {/* sitting body + haunches + white chest */}
      <mesh position={[0, 0.11, -0.02]} scale={[0.82, 1.1, 0.95]} material={FUR} castShadow>
        <sphereGeometry args={[0.1, 18, 14]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.065, 0.06, -0.05]} scale={[0.7, 0.75, 1]} material={FUR} castShadow>
          <sphereGeometry args={[0.07, 14, 10]} />
        </mesh>
      ))}
      <mesh position={[0, 0.13, 0.05]} scale={[0.75, 1, 0.6]} material={WHITE}>
        <sphereGeometry args={[0.07, 14, 10]} />
      </mesh>
      {/* front paws */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.035, 0.06, 0.06]} scale={[0.8, 1.6, 0.8]} material={WHITE}>
            <sphereGeometry args={[0.025, 10, 8]} />
          </mesh>
          <mesh position={[s * 0.035, 0.016, 0.08]} scale={[1, 0.7, 1.3]} material={WHITE}>
            <sphereGeometry args={[0.026, 10, 8]} />
          </mesh>
        </group>
      ))}
      {/* head */}
      <group ref={head} position={[0, 0.26, 0.03]}>
        <mesh scale={[1.05, 0.95, 0.95]} material={FUR} castShadow>
          <sphereGeometry args={[0.085, 18, 14]} />
        </mesh>
        {/* forehead stripes */}
        {[-0.025, 0, 0.025].map((x) => (
          <mesh key={x} position={[x, 0.07, 0.035]} rotation={[0.6, 0, 0]} scale={[0.25, 1, 0.25]} material={FUR_DARK}>
            <sphereGeometry args={[0.02, 8, 6]} />
          </mesh>
        ))}
        {/* ears */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.05, 0.07, 0]} rotation={[0, 0, s * -0.35]}>
            <mesh material={FUR}>
              <coneGeometry args={[0.032, 0.065, 12]} />
            </mesh>
            <mesh position={[0, -0.004, 0.012]} scale={[0.6, 0.7, 0.4]} material={PINK}>
              <coneGeometry args={[0.032, 0.065, 12]} />
            </mesh>
          </group>
        ))}
        {/* muzzle, nose, eyes */}
        <mesh position={[0, -0.025, 0.065]} scale={[1.2, 0.8, 0.8]} material={WHITE}>
          <sphereGeometry args={[0.035, 14, 10]} />
        </mesh>
        <mesh position={[0, -0.01, 0.092]} material={PINK}>
          <sphereGeometry args={[0.009, 8, 6]} />
        </mesh>
        <group ref={eyes}>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.034, 0.012, 0.074]} scale={[1, 1.25, 0.7]} material={EYE}>
              <sphereGeometry args={[0.012, 10, 8]} />
            </mesh>
          ))}
        </group>
      </group>
      {/* swishing tail */}
      <group ref={tail}>
        <mesh geometry={tailGeo} material={FUR} castShadow />
        <mesh position={[0.14, 0.08, 0.06]} material={FUR_DARK}>
          <sphereGeometry args={[0.024, 10, 8]} />
        </mesh>
      </group>
    </group>
  );
}
