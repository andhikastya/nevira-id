"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, MathUtils, type DirectionalLight, type HemisphereLight } from "three";
import { M, applySaturation } from "../materials";
import { live } from "../runtime";

const SKY_DAY = new Color("#FFFFFF");
const SKY_DUSK = new Color("#7C6BB8");
const SUN_DAY = new Color("#FFFFFF");
const SUN_DUSK = new Color("#F2DDFF");
const GROUND_DAY = new Color("#BFD9A8");
const GROUND_DUSK = new Color("#3A2265");
const SKY_MORNING = new Color("#FFF1DE");
const SUN_MORNING = new Color("#FFD9A8");

let lastDusk = "";

/** Lights + global looks driven by scroll: desaturation (Problem) and dusk (Proof → CTA). */
export function Atmosphere() {
  const hemi = useRef<HemisphereLight>(null);
  const sun = useRef<DirectionalLight>(null);

  useFrame(() => {
    const d = live.dusk;
    const m = live.morning * (1 - d);
    if (hemi.current) {
      hemi.current.intensity = MathUtils.lerp(1.15, 0.55, d) - m * 0.15;
      hemi.current.color.copy(SKY_DAY).lerp(SKY_MORNING, m).lerp(SKY_DUSK, d);
      hemi.current.groundColor.copy(GROUND_DAY).lerp(GROUND_DUSK, d);
    }
    if (sun.current) {
      sun.current.intensity = MathUtils.lerp(2.3, 1.1, d) - m * 0.2;
      sun.current.color.copy(SUN_DAY).lerp(SUN_MORNING, m).lerp(SUN_DUSK, d);
      // Morning sun sits lower in the east, so shadows stretch long across the plaza.
      sun.current.position.set(MathUtils.lerp(10, 16, m), MathUtils.lerp(18, 9, m), MathUtils.lerp(9, 4, m));
    }
    M.window.emissiveIntensity = d * 1.6;
    applySaturation(live.color);
    const dusk = d.toFixed(2);
    if (dusk !== lastDusk) {
      lastDusk = dusk;
      document.documentElement.style.setProperty("--dusk", dusk);
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={["#ffffff", "#C3AEE7", 1.15]} />
      <directionalLight
        ref={sun}
        position={[10, 18, 9]}
        intensity={2.3}
        castShadow
        shadow-mapSize={[1536, 1536]}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-camera-near={1}
        shadow-camera-far={50}
      />
    </>
  );
}
