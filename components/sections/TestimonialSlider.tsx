"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PROOF } from "@/content/copy";
import { Card } from "../ui/Card";

const AUTOPLAY_MS = 5000;

/**
 * Testimonial slider: native scroll-snap track (swipe on touch), prev/next arrows and dots.
 * Autoplays every 5s, looping back to the start; pauses on hover/focus and under reduced motion.
 */
export function TestimonialSlider() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = PROOF.testimonials;

  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];

  const goTo = useCallback((i: number) => {
    const el = track.current;
    const list = Array.from(el?.children ?? []) as HTMLElement[];
    if (!el || !list.length) return;
    const idx = (i + list.length) % list.length;
    el.scrollTo({ left: list[idx].offsetLeft - list[0].offsetLeft, behavior: "smooth" });
  }, []);

  // Track which card is closest to the left edge.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const list = slides();
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) return setActive(list.length - 1);
      let best = 0;
      list.forEach((s, i) => {
        if (Math.abs(s.offsetLeft - list[0].offsetLeft - el.scrollLeft) < Math.abs(list[best].offsetLeft - list[0].offsetLeft - el.scrollLeft)) best = i;
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      const el = track.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      goTo(atEnd ? 0 : active + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [active, paused, goTo]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimoni pelanggan"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mt-3"
    >
      <ul
        ref={track}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 py-2 [scrollbar-width:none] lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <li
            key={t.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${items.length}`}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-[calc((100%-32px)/3)]"
          >
            <Card className="flex h-full flex-col bg-background/95 p-6">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.logo} alt={`Logo ${t.name}`} width={56} height={56} loading="lazy" className="size-14 shrink-0 rounded-full shadow-1" />
                <div>
                  <p className="text-body font-semibold text-text-1">{t.name}</p>
                  <p className="text-caption text-text-3">{t.business}</p>
                </div>
                <i className="ri-double-quotes-r ml-auto self-start text-[28px] leading-none text-accent/25" aria-hidden />
              </div>
              <blockquote className="mt-4 flex-1 text-body text-text-2">{t.quote}</blockquote>
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Tampilkan testimoni ${t.name}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { label: "Testimoni sebelumnya", icon: "ri-arrow-left-line", d: -1 },
            { label: "Testimoni berikutnya", icon: "ri-arrow-right-line", d: 1 },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              onClick={() => goTo(active + b.d)}
              className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-accent"
            >
              <i className={`${b.icon} text-[20px]`} aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
