"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { useScene } from "@/lib/sceneStore";
import { CameraRig } from "./CameraRig";
import { Atmosphere } from "./world/Atmosphere";
import { Coins } from "./world/Coins";
import { Home } from "./world/Home";
import { Hub } from "./world/Hub";
import { Island } from "./world/Island";
import { Office } from "./world/Office";
import { Papers } from "./world/Papers";
import { Shop } from "./world/Shop";
import { Van } from "./world/Van";
import { Workshop } from "./world/Workshop";

export default function Scene() {
  const paused = useScene((s) => s.paused);
  // Phones / coarse pointers start on the light tier (no shadows, lower DPR).
  const [lite] = useState(() => window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
  const [dpr, setDpr] = useState(lite ? 1.25 : 1.6);

  return (
    <Canvas
      shadows={!lite}
      dpr={dpr}
      frameloop={paused ? "never" : "always"}
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
      {/* Frame-time watchdog: drop resolution when the device struggles. */}
      <PerformanceMonitor onDecline={() => setDpr(1)} flipflops={2} onFallback={() => setDpr(1)} />
      <Atmosphere />
      <CameraRig />
      <Island />
      <Hub />
      <Shop />
      <Workshop />
      <Office />
      <Home />
      <Van />
      <Coins />
      <Papers />
    </Canvas>
  );
}
