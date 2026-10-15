"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useScene } from "@/lib/sceneStore";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (new URLSearchParams(window.location.search).has("no3d")) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Mounts the fixed 3D canvas after first paint, only when WebGL + motion are OK. */
export function SceneRoot() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    const id = requestAnimationFrame(() => {
      setOn(true);
      document.documentElement.dataset.scene = "on";
      useScene.getState().setSceneOn(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!on) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5]">
      <Scene />
    </div>
  );
}
