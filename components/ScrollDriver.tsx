"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useScene } from "@/lib/sceneStore";

type Hold = { start: number; end: number };

/** Portion of each section (by height) during which the camera holds on its station. */
const HOLD_FROM = 0.3;
const HOLD_TO = 0.7;

/**
 * Smooth scrolling (Lenis) + scroll → station progress mapping.
 * Each [data-station] section gets a "hold" scroll range centered in the viewport;
 * between holds the progress interpolates linearly to the next station.
 * Any [data-opaque] element that fully covers the viewport pauses 3D rendering.
 *
 * Mounted once in the root layout, so it survives client navigation; it re-measures
 * whenever the route changes. Starts only once the 3D scene is on (first interaction, see
 * SceneRoot), so the section measuring + Lenis setup stay out of the initial page load.
 */
export function ScrollDriver() {
  const pathname = usePathname();
  const api = useRef<{ measure: () => void; lenis: Lenis | null } | null>(null);
  const sceneOn = useScene((s) => s.sceneOn);

  useEffect(() => {
    if (!sceneOn) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ autoRaf: true, anchors: { offset: 0 }, lerp: 0.09 });

    let holds: Hold[] = [];
    let opaque: HTMLElement[] = [];
    const { setStations, setStationProgress, setPaused } = useScene.getState();

    // Next keeps recently visited routes mounted but hidden (display: none) — skip those.
    const visible = (sel: string) =>
      Array.from(document.querySelectorAll<HTMLElement>(sel)).filter((el) => el.getClientRects().length > 0);

    const measure = () => {
      const els = visible("[data-station]");
      opaque = visible("[data-opaque]");
      const vh = window.innerHeight;
      const maxY = document.documentElement.scrollHeight - vh;
      holds = els.map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const h = el.offsetHeight;
        const start = Math.min(maxY, Math.max(0, top + h * HOLD_FROM - vh / 2));
        const end = Math.min(maxY, Math.max(start, top + h * HOLD_TO - vh / 2));
        return { start, end };
      });
      setStations(els.map((el) => el.dataset.station ?? "hero"));
      update();
    };

    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setPaused(
        opaque.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= 0 && r.bottom >= vh;
        }),
      );
      if (!holds.length) return;
      let p = 0;
      for (let i = 0; i < holds.length; i++) {
        const h = holds[i];
        if (y <= h.end) {
          if (y >= h.start || i === 0) p = i;
          else {
            const prev = holds[i - 1];
            p = i - 1 + (y - prev.end) / Math.max(1, h.start - prev.end);
          }
          setStationProgress(p);
          return;
        }
      }
      setStationProgress(holds.length - 1);
    };

    api.current = { measure, lenis };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      api.current = null;
      ro.disconnect();
      window.removeEventListener("scroll", update);
      lenis?.destroy();
    };
  }, [sceneOn]);

  // New route: Lenis must forget the old page's scroll position, then stations are re-read.
  useEffect(() => {
    const a = api.current;
    if (!a) return;
    if (!window.location.hash) a.lenis?.scrollTo(0, { immediate: true, force: true });
    a.lenis?.resize();
    const id = requestAnimationFrame(a.measure);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
