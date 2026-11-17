import { Vector3 } from "three";
import type { SceneParams } from "./stations";

/** Live position of the delivery van (written by Van, read by CameraRig for the "Antar" station). */
export const vanPos = new Vector3();

/**
 * Per-frame scene parameters, blended by CameraRig from the current scroll station.
 * Mutable on purpose: world components read it inside useFrame without re-rendering.
 */
export const live: SceneParams & { time: number; focus: string } = {
  chaos: 0,
  color: 1,
  hub: 1,
  dusk: 0,
  sign: 0,
  morning: 0,
  time: 0,
  /** Name of the nearest station (for station-specific flourishes). */
  focus: "hero",
};
