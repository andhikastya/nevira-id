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

/** First-interaction events that wake the 3D scene. */
const WAKE_EVENTS = ["pointerdown", "pointermove", "touchstart", "wheel", "scroll", "keydown"] as const;

/**
 * Mounts the fixed 3D canvas on the visitor's first interaction, only when WebGL + motion are OK.
 * Until then the static fallback art (.no3d-only) is shown, so three.js (~280 KB, seconds of
 * main-thread work on mid-range phones) never competes with the first paint of the copy.
 */
export function SceneRoot() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    let raf = 0;
    const wake = () => {
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake));
      raf = requestAnimationFrame(() => {
        setOn(true);
        document.documentElement.dataset.scene = "on";
        useScene.getState().setSceneOn(true);
      });
    };
    WAKE_EVENTS.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => {
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake));
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!on) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5]">
      <Scene />
    </div>
  );
}
