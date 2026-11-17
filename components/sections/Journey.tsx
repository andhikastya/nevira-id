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
          <Panel className="max-w-[480px] p-6 md:p-8">
            <SectionHeading id="journey-title" eyebrow={JOURNEY.eyebrow} title={JOURNEY.title} body={JOURNEY.body} />
          </Panel>
        </Container>
      </Section>

      {/* Step rail — desktop. A frosted card so the labels stay readable over the 3D scene; each step is a link. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[220px] lg:block">
        <nav aria-label="Langkah order" className="pointer-events-auto sticky top-1/2 mr-6 -translate-y-1/2">
          <ol className="rounded-[16px] border border-border bg-background/95 p-2 shadow-2">
            {JOURNEY.steps.map((s, i) => (
              <li key={s.key}>
                <a
                  href={`#langkah-${s.key}`}
                  aria-current={i === active ? "step" : undefined}
                  className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-body-sm transition-colors duration-[220ms] ${
                    i === active ? "bg-accent-subtle font-semibold text-accent" : "text-text-2 hover:bg-surface-1 hover:text-text-1"
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-caption font-semibold transition-colors duration-[220ms] ${
                      i === active ? "bg-accent text-white" : "bg-surface-2 text-text-2"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {s.step}
                </a>
              </li>
            ))}
          </ol>
        </nav>
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
          {/* Link target: sits where the section's centre is, so Lenis scrolls the step into its camera hold. */}
          <span id={`langkah-${s.key}`} aria-hidden className="pointer-events-none absolute top-1/2 left-0 h-px w-px -translate-y-[50svh]" />
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
