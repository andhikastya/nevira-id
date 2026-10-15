import { create } from "zustand";

/**
 * Shared state between the HTML story and the 3D scene.
 * Scroll-driven values are written by components/ScrollDriver.tsx; UI-driven values
 * (coinLevel) by the sections themselves.
 */
type SceneState = {
  /** Station names in DOM order (from [data-station]). */
  stations: string[];
  /** Fractional index into `stations` (e.g. 2.4 = 40% of the way from station 2 to 3). */
  stationProgress: number;
  /** 0..1 — fill of the Saldo Koin stack, driven by the pricing calculator. */
  coinLevel: number;
  /** Whether the WebGL scene is mounted (otherwise static fallbacks show). */
  sceneOn: boolean;
  /** True while an opaque section (FAQ) fully covers the viewport — rendering pauses. */
  paused: boolean;
  setStations: (v: string[]) => void;
  setStationProgress: (v: number) => void;
  setCoinLevel: (v: number) => void;
  setSceneOn: (v: boolean) => void;
  setPaused: (v: boolean) => void;
};

export const useScene = create<SceneState>((set) => ({
  stations: [],
  stationProgress: 0,
  coinLevel: 0.35,
  sceneOn: false,
  paused: false,
  setStations: (stations) => set({ stations }),
  setStationProgress: (stationProgress) => set({ stationProgress }),
  setCoinLevel: (coinLevel) => set({ coinLevel }),
  setSceneOn: (sceneOn) => set({ sceneOn }),
  setPaused: (paused) => set((s) => (s.paused === paused ? s : { paused })),
}));
