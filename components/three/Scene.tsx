"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { ACESFilmicToneMapping, Mesh, SRGBColorSpace, Sphere } from "three";
import { useScene } from "@/lib/sceneStore";
import { CameraRig } from "./CameraRig";
import { Atmosphere } from "./world/Atmosphere";
import { Coins } from "./world/Coins";
import { Home } from "./world/Home";
import { Hub } from "./world/Hub";
import { Island } from "./world/Island";
import { Office } from "./world/Office";
import { PagePieces } from "./world/PagePieces";
import { Papers } from "./world/Papers";
import { SelfService } from "./world/SelfService";
import { Shop } from "./world/Shop";
import { Van } from "./world/Van";
import { Workshop } from "./world/Workshop";

/**
 * Renders on demand at a capped rate instead of every display refresh.
 * A 120 Hz screen would otherwise draw the town twice as often for no visible gain.
 */
function FrameCap({ fps }: { fps: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const step = 1000 / fps;
    let last = performance.now();
    let acc = 0;
    let id = requestAnimationFrame(function tick(t) {
      // Accumulate so odd refresh rates (75/90/100 Hz) still average the cap; 1 ms slack keeps 60 Hz at every frame.
      acc += t - last;
      last = t;
      if (acc >= step - 1) {
        acc = Math.max(0, Math.min(acc - step, step));
        invalidate();
      }
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [fps, invalidate]);
  return null;
}

/** Below this world-space radius a mesh's shadow is a few pixels at most, so it skips the shadow pass. */
const MIN_SHADOW_RADIUS = 0.15;
const seen = new WeakSet<Mesh>();
const sphere = new Sphere();

/**
 * Drops castShadow from small props (buttons, screens, hair, cups…). Each caster is drawn
 * a second time into the shadow map, and the town has hundreds of tiny ones.
 * Re-checks every couple of seconds so page-specific pieces mounted later are covered too.
 */
function ShadowDiet() {
  useFrame((state) => {
    if (state.clock.elapsedTime % 2 > 0.1) return;
    state.scene.traverse((o) => {
      const m = o as Mesh;
      if (!m.isMesh || seen.has(m)) return;
      seen.add(m);
      if (!m.castShadow || (m as Mesh & { isInstancedMesh?: boolean }).isInstancedMesh) return;
      const g = m.geometry;
      if (!g.boundingSphere) g.computeBoundingSphere();
      sphere.copy(g.boundingSphere!).applyMatrix4(m.matrixWorld);
      // Still scaled to zero (a page piece waiting to pop in): look again on the next pass.
      if (sphere.radius < 1e-3) seen.delete(m);
      else if (sphere.radius < MIN_SHADOW_RADIUS) m.castShadow = false;
    });
  });
  return null;
}

export default function Scene() {
  const paused = useScene((s) => s.paused);
  // Phones / coarse pointers start on the light tier (no shadows, lower DPR).
  const [lite] = useState(() => window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.5));
  // Frame-time watchdog: a struggling device drops to 1x resolution.
  const lowerDpr = () => setDpr(1);

  return (
    <Canvas
      shadows={!lite}
      dpr={dpr}
      frameloop={paused ? "never" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 32, near: 0.1, far: 200, position: [19, 13.5, 21] }}
      // Canvas sits under the page with pointer-events off; read the pointer from the body instead.
      eventSource={document.body}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.outputColorSpace = SRGBColorSpace;
      }}
    >
      {!paused && <FrameCap fps={60} />}
      {/* Bounds are relative to the
          60 fps cap, not the display refresh rate (the default would read a capped 60 on 120 Hz as a decline). */}
      <PerformanceMonitor bounds={() => [40, 55]} onDecline={lowerDpr} flipflops={2} onFallback={lowerDpr} />
      {!lite && <ShadowDiet />}
      <Atmosphere />
      <CameraRig />
      <Island />
      <Hub />
      <Shop />
      <Workshop />
      <Office />
      <SelfService />
      <Home />
      <Van />
      <Coins />
      <Papers />
      <PagePieces />
    </Canvas>
  );
}
