import { USP } from "@/content/copy";
import { Container, Section } from "./Section";

/**
 * Home USP: seven reasons owners switch to Nevira, over the town at night (station: usp).
 * Four-column grid on desktop, a swipeable row on smaller screens.
 */
export function Usp() {
  return (
    <Section station="usp" id="kenapa-nevira" aria-labelledby="usp-title" className="flex min-h-[110svh] items-center py-24 text-white">
      {/* Night-purple wash over the 3D town so the copy stays readable; the lit town still glows through. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(110,60,210,0.55),transparent_55%),linear-gradient(180deg,rgba(28,14,56,0.88)_0%,rgba(43,25,77,0.84)_60%,rgba(28,14,56,0.9)_100%)]"
      />
      <Container className="relative">
        <p className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-body-sm font-semibold text-white/90">{USP.eyebrow}</p>
        <h2 id="usp-title" className="mt-4 max-w-[980px] text-[32px] leading-[1.08] font-bold tracking-[-0.025em] text-white! text-balance md:text-[48px]">
          {USP.title} <span className="text-reward">{USP.highlight}</span>
        </h2>
        <p className="mt-4 max-w-[640px] text-body-lg text-white/75">{USP.body}</p>

        <ol className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
          {USP.items.map((it, i) => (
            <li key={it.title} className="w-[260px] shrink-0 snap-start lg:w-auto">
              <article className="flex h-full flex-col rounded-[16px] bg-background p-6 text-text-1 shadow-2">
                <p className="text-body-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-h5 font-bold text-balance">{it.title}</h3>
                <p className="mt-3 text-body-sm text-text-2">{it.body}</p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <span className="w-fit shrink-0 rounded-[10px] border border-white/30 bg-accent px-4 py-2 text-body font-semibold">{USP.badge}</span>
          <p className="max-w-[760px] text-body-lg text-white/90">{USP.promise}</p>
        </div>
      </Container>
    </Section>
  );
}
