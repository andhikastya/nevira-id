"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { useScene } from "@/lib/sceneStore";
import { live, vanPos } from "./runtime";
import { FALLBACK_STATION, STATIONS, type SceneParams, type Station } from "./stations";

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp3 = (out: Vector3, a: number[], b: number[], t: number) =>
  out.set(MathUtils.lerp(a[0], b[0], t), MathUtils.lerp(a[1], b[1], t), MathUtils.lerp(a[2], b[2], t));

const PARAM_KEYS: (keyof SceneParams)[] = ["chaos", "color", "hub", "dusk", "sign"];

/** Blends camera + scene params between scroll stations, then damps toward them. */
export function CameraRig() {
  const size = useThree((s) => s.size);
  const goalPos = useRef(new Vector3());
  const goalTarget = useRef(new Vector3());
  const curTarget = useRef<Vector3 | null>(null);
  const cur = useRef({ fov: 34, shift: 0 });

  useFrame((state, delta) => {
    const camera = state.camera as PerspectiveCamera;
    const dt = Math.min(delta, 0.05);
    live.time += dt;
    const { stations, stationProgress } = useScene.getState();
    const n = stations.length;
    const p = MathUtils.clamp(stationProgress, 0, Math.max(0, n - 1));
    const i0 = Math.floor(p);
    const i1 = Math.min(n - 1, i0 + 1);
    const t = smooth(p - i0);
    const a: Station = STATIONS[stations[i0]] ?? FALLBACK_STATION;
    const b: Station = STATIONS[stations[i1]] ?? a;
    live.focus = stations[Math.round(p)] ?? "hero";

    const narrow = size.width < 768;
    // followVan: pos = [radial offset (negative = toward island center), height, tangential offset]
    // relative to the courier, so buildings outside the ring stay behind it, never in front.
    const len = Math.hypot(vanPos.x, vanPos.z) || 1;
    const rx = vanPos.x / len;
    const rz = vanPos.z / len;
    const resolve = (s: Station, key: "pos" | "target") => {
      if (!s.followVan) return s[key];
      const [r, y, tan] = s[key];
      return [vanPos.x + rx * r - rz * tan, y, vanPos.z + rz * r + rx * tan];
    };
    lerp3(goalPos.current, resolve(a, "pos"), resolve(b, "pos"), t);
    lerp3(goalTarget.current, resolve(a, "target"), resolve(b, "target"), t);
    if (narrow) {
      // Portrait: pull back along the view direction so the subject fits.
      const dir = goalPos.current.clone().sub(goalTarget.current);
      goalPos.current.copy(goalTarget.current).add(dir.multiplyScalar(1.45));
      // Copy stacks on top on phones: aim higher so the subject sits in the lower half.
      goalTarget.current.y += 2.2;
    }
    // Subtle pointer parallax.
    goalPos.current.x += state.pointer.x * 0.35;
    goalPos.current.y += state.pointer.y * 0.2;

    const fov = MathUtils.lerp(a.fov, b.fov, t);
    const shift = narrow ? 0 : MathUtils.lerp(a.shift, b.shift, t);

    const k = 1 - Math.exp(-dt * 4.5);
    if (!curTarget.current) {
      curTarget.current = goalTarget.current.clone();
      camera.position.copy(goalPos.current);
    }
    camera.position.lerp(goalPos.current, k);
    curTarget.current.lerp(goalTarget.current, k);
    camera.lookAt(curTarget.current);

    cur.current.fov = MathUtils.lerp(cur.current.fov, fov, k);
    cur.current.shift = MathUtils.lerp(cur.current.shift, shift, k);
    camera.fov = cur.current.fov;
    // Shift the frustum so the subject sits right of center, leaving room for copy on the left.
    camera.filmOffset = -cur.current.shift * camera.getFilmWidth() * 0.5;
    camera.updateProjectionMatrix();

    for (const key of PARAM_KEYS) {
      const goal = MathUtils.lerp(a.scene[key], b.scene[key], t);
      live[key] = MathUtils.lerp(live[key], goal, 1 - Math.exp(-dt * 3));
    }
  });

  return null;
}
