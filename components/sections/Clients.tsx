import { CLIENTS } from "@/content/copy";
import { Container } from "./Section";

type Logo = (typeof CLIENTS.logos)[number];

/** One endless row; the list is rendered twice so the -50% loop lands on an identical frame. */
function Row({ logos, reverse = false }: { logos: readonly Logo[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul
        className={`flex w-max shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused] motion-safe:animate-[marquee_60s_linear_infinite] ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {[...logos, ...logos].map((l, i) => (
          <li
            key={i}
            aria-hidden={i >= logos.length}
            className="flex h-24 w-40 shrink-0 items-center justify-center rounded-[14px] border border-border bg-background p-3 shadow-1 transition-transform duration-200 hover:-translate-y-1 md:h-28 md:w-48"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/clients/${l.src}.png`} alt={l.name} loading="lazy" className="max-h-full max-w-full object-contain" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Home: client logos, two marquee rows moving in opposite directions (pause on hover). */
export function Clients() {
  const half = Math.ceil(CLIENTS.logos.length / 2);
  return (
    <section aria-labelledby="clients-title" className="relative bg-background py-20 md:py-24">
      <Container className="text-center">
        <p className="mx-auto w-fit rounded-full bg-accent-subtle px-3 py-1 text-body-sm font-medium text-accent">{CLIENTS.eyebrow}</p>
        <h2 id="clients-title" className="mx-auto mt-4 max-w-[640px] text-heading text-balance md:text-display">
          {CLIENTS.title}
        </h2>
      </Container>
      <div className="mt-10 space-y-4">
        <Row logos={CLIENTS.logos.slice(0, half)} />
        <Row logos={CLIENTS.logos.slice(half)} reverse />
      </div>
    </section>
  );
}
