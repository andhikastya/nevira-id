import Link from "next/link";
import { NEEDS, type NeedTone } from "@/content/copy";
import { Badge } from "../ui/Badge";
import { Container, Section } from "./Section";

/** Per-card colour: icon tile gradient, icon colour, hover ring and corner glow. */
const TONES: Record<NeedTone, { tile: string; icon: string; glow: string; ring: string }> = {
  violet: { tile: "from-[#efe8fb] to-[#d9ccf3]", icon: "text-accent", glow: "bg-[#d9ccf3]", ring: "hover:border-accent/40" },
  gold: { tile: "from-[#fdf5dc] to-[#f8e3a3]", icon: "text-reward-deep", glow: "bg-[#f8e3a3]", ring: "hover:border-reward/50" },
  blue: { tile: "from-[#e6f8ff] to-[#bfeaff]", icon: "text-[#0b7fa8]", glow: "bg-[#bfeaff]", ring: "hover:border-[#34cfff]/50" },
  pink: { tile: "from-[#fdebf3] to-[#f8cde1]", icon: "text-[#b83a78]", glow: "bg-[#f8cde1]", ring: "hover:border-[#e58fb8]/60" },
  green: { tile: "from-[#e7f8ec] to-[#c3ead0]", icon: "text-success", glow: "bg-[#c3ead0]", ring: "hover:border-success/40" },
  indigo: { tile: "from-[#e9ebfc] to-[#cbd0f6]", icon: "text-[#3d46b8]", glow: "bg-[#cbd0f6]", ring: "hover:border-[#3d46b8]/40" },
};

/**
 * Home: "whatever your laundry needs" picker, right after the hero.
 * Reuses the hero station so the camera holds still until the problem section.
 */
export function Needs() {
  return (
    <Section station="hero" id="kebutuhan" aria-labelledby="needs-title" className="py-16 md:py-24">
      <Container>
        <div className="rounded-[24px] border border-border bg-background/85 px-4 py-10 shadow-2 backdrop-blur-md md:px-10 md:py-14">
          <div className="mx-auto max-w-[880px] text-center">
            <Badge tone="primary" icon="ri-compass-3-line">
              {NEEDS.eyebrow}
            </Badge>
            <h2 id="needs-title" className="mt-4 text-[26px] leading-[1.15] font-bold tracking-[-0.02em] text-balance md:text-[32px] lg:text-[40px]">
              <span className="text-text-1 md:block md:whitespace-nowrap">{NEEDS.title}</span> <span className="text-accent md:block">{NEEDS.highlight}</span>
            </h2>
            <p className="mt-3 text-body text-text-2 md:text-body-lg">{NEEDS.body}</p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {NEEDS.items.map((it) => {
              const t = TONES[it.tone];
              return (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    className={`group relative flex h-full items-start gap-4 overflow-hidden rounded-[16px] border border-border bg-background p-4 shadow-1 transition duration-200 hover:-translate-y-1 hover:shadow-2 md:flex-col md:p-6 ${t.ring}`}
                  >
                    {/* Soft corner glow + oversized watermark icon keep each card distinct. */}
                    <span aria-hidden className={`absolute -top-10 -right-10 size-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70 ${t.glow}`} />
                    <i aria-hidden className={`${it.icon} absolute -right-3 -bottom-5 text-[96px] leading-none opacity-[0.06] transition-transform duration-300 group-hover:-rotate-6 ${t.icon}`} />

                    <span
                      className={`relative flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:scale-110 md:size-14 ${t.tile} ${t.icon}`}
                    >
                      <i className={`${it.icon} text-[24px] md:text-[28px]`} aria-hidden />
                    </span>
                    <span className="relative flex flex-1 flex-col">
                      <span className="text-h6 font-bold text-text-1">{it.label}</span>
                      <span className="mt-1 text-body-sm text-text-2">{it.body}</span>
                      <span className="mt-3 hidden items-center gap-1 text-body-sm font-semibold text-accent md:inline-flex">
                        Lihat solusinya
                        <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </span>
                    <i className="ri-arrow-right-s-line relative self-center text-[20px] text-text-3 md:hidden" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
