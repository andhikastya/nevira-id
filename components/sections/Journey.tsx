"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY } from "@/content/copy";
import { ScreenFrame } from "../ScreenFrame";
import { Badge } from "../ui/Badge";
import { Panel } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Container, Section } from "./Section";

export function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div id="cara-kerja" className="relative">
      <Section station="journey-intro" aria-labelledby="journey-title" className="flex min-h-[70svh] items-end pb-16">
        <Container>
          <div className="relative inline-block">
            {/* Soft frosted backdrop with feathered edges so the heading reads over the town. */}
            <div
              aria-hidden
              className="absolute -inset-x-32 -inset-y-28 bg-white/45 backdrop-blur-lg [mask-image:radial-gradient(farthest-side,#000_0%,rgba(0,0,0,0.9)_28%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.2)_78%,transparent_100%)]"
            />
            <div className="relative">
              <SectionHeading id="journey-title" eyebrow={JOURNEY.eyebrow} title={JOURNEY.title} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Step rail — desktop */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[200px] lg:block" aria-hidden>
        <ol className="sticky top-1/2 -translate-y-1/2 space-y-3 pr-8">
          {JOURNEY.steps.map((s, i) => (
            <li key={s.key} className="flex items-center justify-end gap-3">
              <span
                className={`text-body-sm transition-colors duration-[220ms] ${i === active ? "font-semibold text-text-1" : "text-text-4"}`}
              >
                {s.step}
              </span>
              <span
                className={`h-0.5 rounded-full transition-all duration-[220ms] ${i === active ? "w-8 bg-accent" : "w-4 bg-surface-3"}`}
              />
            </li>
          ))}
        </ol>
      </div>

      {JOURNEY.steps.map((s, i) => (
        <Section
          key={s.key}
          station={`journey-${s.key}`}
          data-index={i}
          ref={(el: HTMLElement | null) => {
            refs.current[i] = el;
          }}
          aria-labelledby={`step-${s.key}`}
          className="flex min-h-[110svh] items-center"
        >
          <Container>
            <Panel className="max-w-[480px] p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-body-sm font-semibold text-white">
                  {i + 1}
                </span>
                <Badge tone="neutral" icon={s.icon}>
                  {s.module}
                </Badge>
              </div>
              <h3 id={`step-${s.key}`} className="mt-5 text-subheading text-balance">
                {s.title}
              </h3>
              <p className="mt-3 text-body text-text-2">{s.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 rounded-full bg-surface-1 px-3 py-1 text-body-sm text-text-2">
                    <i className="ri-check-line text-[14px] text-success" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              {s.screen && <ScreenFrame src={s.screen} label={s.module} icon={s.icon} className="no3d-only mt-6" />}
            </Panel>
          </Container>
        </Section>
      ))}
    </div>
  );
}
