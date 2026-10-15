"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useScene } from "@/lib/sceneStore";

type Hold = { start: number; end: number };

/** Portion of each section (by height) during which the camera holds on its station. */
const HOLD_FROM = 0.3;
const HOLD_TO = 0.7;

/**
 * Smooth scrolling (Lenis) + scroll → station progress mapping.
 * Each [data-station] section gets a "hold" scroll range centered in the viewport;
 * between holds the progress interpolates linearly to the next station.
 */
export function ScrollDriver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ autoRaf: true, anchors: { offset: 0 }, lerp: 0.09 });

    let holds: Hold[] = [];
    const { setStations, setStationProgress, setPaused } = useScene.getState();
    const faq = document.getElementById("faq");

    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-station]"));
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
      if (faq) {
        const r = faq.getBoundingClientRect();
        setPaused(r.top <= 0 && r.bottom >= window.innerHeight);
      }
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

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      lenis?.destroy();
    };
  }, []);

  return null;
}
