"use client";

// Shared building blocks for the per-page set pieces (KasirScene, ProduksiScene, …).
import { Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, MeshBasicMaterial, type Group } from "three";
import { useScene } from "@/lib/sceneStore";
import { canvasTexture, roundRect } from "../materials";
import { live } from "../runtime";

export type V3 = [number, number, number];

/** Exponential smoothing toward `goal` (frame-rate independent). */
export const damp = (cur: number, goal: number, dt: number, rate = 3) => MathUtils.lerp(cur, goal, 1 - Math.exp(-dt * rate));

/**
 * Floating 3D tooltips are left out on feature pages at phone width: the copy panel already
 * covers most of the screen there, and the cards would sit on top of it.
 */
export const tooltipsHidden = (width: number) => width < 768 && window.location.pathname.startsWith("/fitur");

/** True while the current page's first station is `heroStation` (i.e. that page is active). */
export function usePage(heroStation: string) {
  return useScene((s) => s.stations[0] === heroStation);
}

/** Whether the camera's nearest station is one of `stations`. */
export const inFocus = (stations: string | string[]) =>
  typeof stations === "string" ? live.focus === stations : stations.includes(live.focus);

/** 0..1 value that eases in while one of `stations` is in focus. Read `.current` inside useFrame. */
export function useFocusValue(stations: string | string[], rate = 3) {
  const k = useRef(0);
  useFrame((_, dt) => {
    k.current = damp(k.current, inFocus(stations) ? 1 : 0, dt, rate);
  });
  return k;
}

export function bubbleTexture(title: string, sub: string, icon: string, tint: string, ink: string) {
  return canvasTexture(640, 220, (c, w, h) => {
    c.shadowColor = "rgba(13,13,18,0.18)";
    c.shadowBlur = 24;
    c.shadowOffsetY = 6;
    roundRect(c, 20, 16, w - 40, h - 60, 28);
    c.fillStyle = "#FFFFFF";
    c.fill();
    c.shadowColor = "transparent";
    c.beginPath();
    c.moveTo(w / 2 - 22, h - 46);
    c.lineTo(w / 2, h - 12);
    c.lineTo(w / 2 + 22, h - 46);
    c.fill();
    c.fillStyle = tint;
    c.beginPath();
    c.arc(80, 82, 30, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = ink;
    c.font = "700 30px 'Red Hat Text', sans-serif";
    c.textAlign = "center";
    c.fillText(icon, 80, 93);
    c.textAlign = "left";
    c.fillStyle = "#32363E";
    c.font = "700 30px 'Red Hat Text', sans-serif";
    c.fillText(title, 130, 70);
    c.fillStyle = "#4C515D";
    c.font = "500 26px 'Red Hat Text', sans-serif";
    c.fillText(sub, 130, 112);
  });
}

export const TONES = {
  purple: { tint: "#EBE5F6", ink: "#5B369E" },
  green: { tint: "#EAFFF0", ink: "#277547" },
  blue: { tint: "#EBFAFF", ink: "#008DB8" },
} as const;

/** Floating info card that pops while one of `stations` is in focus. */
export function InfoBubble({
  stations,
  at,
  title,
  sub,
  icon,
  tone = "purple",
  size = 1.3,
}: {
  stations: string | string[];
  at: V3;
  title: string;
  sub: string;
  icon: string;
  tone?: keyof typeof TONES;
  /** Width in world units. */
  size?: number;
}) {
  const g = useRef<Group>(null);
  const s = useRef(0);
  const material = useMemo(
    () => new MeshBasicMaterial({ toneMapped: false, transparent: true, map: bubbleTexture(title, sub, icon, TONES[tone].tint, TONES[tone].ink) }),
    [title, sub, icon, tone],
  );
  useFrame(({ size }, dt) => {
    s.current = damp(s.current, inFocus(stations) && !tooltipsHidden(size.width) ? 1 : 0, dt, 5);
    if (g.current) {
      g.current.scale.setScalar(Math.max(0.0001, s.current));
      g.current.position.y = at[1] + Math.sin(live.time * 1.6) * 0.04;
    }
  });
  return (
    <group ref={g} position={at}>
      <Billboard>
        <mesh material={material}>
          <planeGeometry args={[size, size * 0.344]} />
        </mesh>
      </Billboard>
    </group>
  );
}

/** Simple app screen drawn on canvas: purple top bar with a title, then `draw` fills the body. */
export function appScreen(title: string, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, w = 640, h = 400) {
  return canvasTexture(w, h, (c) => {
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#5B369E";
    c.fillRect(0, 0, w, 44);
    c.fillStyle = "#FFFFFF";
    c.font = "600 20px 'Red Hat Text', sans-serif";
    c.textAlign = "left";
    c.fillText(title, 20, 29);
    draw(c, w, h);
  });
}

/** Grey placeholder text line. */
export function line(c: CanvasRenderingContext2D, x: number, y: number, w: number, color = "#E6E7EA", h = 10) {
  c.fillStyle = color;
  c.fillRect(x, y, w, h);
}

/** Text helper for canvas screens. */
export function text(c: CanvasRenderingContext2D, s: string, x: number, y: number, o: { size?: number; weight?: number; color?: string; align?: CanvasTextAlign } = {}) {
  c.fillStyle = o.color ?? "#32363E";
  c.font = `${o.weight ?? 500} ${o.size ?? 18}px 'Red Hat Text', sans-serif`;
  c.textAlign = o.align ?? "left";
  c.fillText(s, x, y);
}
