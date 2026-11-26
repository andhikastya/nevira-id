import { HERO, LINKS } from "@/content/copy";
import { Badge } from "../ui/Badge";
import { ButtonLink } from "../ui/Button";
import { Container, Section } from "./Section";

export function Hero() {
  return (
    <Section station="hero" id="top" aria-labelledby="hero-title" className="flex min-h-[100svh] items-center pt-16 max-md:flex-col">
      {/* Readability wash over the 3D town (part of the hero shine stage). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.7)_35%,rgba(255,255,255,0)_62%)] max-md:bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0)_100%)]"
      />
      <Container className="relative py-16">
        <div className="max-w-[640px]">
          <Badge tone="primary" icon="ri-sparkling-2-line">
            {HERO.eyebrow}
          </Badge>
          <h1 id="hero-title" className="mt-5 text-[36px] leading-[1.05] tracking-[-0.025em] text-balance md:text-[44px] lg:text-[52px]">
            {HERO.titleLines.map((line, i) => (
              <span key={line} className="md:block">
                {line}
                {i < HERO.titleLines.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-[500px] text-body-lg text-text-2 text-pretty">{HERO.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={LINKS.signup} size="lg" trailingIcon="ri-arrow-right-line">
              {HERO.primary}
            </ButtonLink>
            <ButtonLink href="#masalah" variant="secondary" size="lg" icon="ri-play-circle-line">
              {HERO.secondary}
            </ButtonLink>
          </div>
        </div>
      </Container>
      {/* Static render of the town for no-WebGL / reduced-motion visitors. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/fallback/hero.webp"
        alt="Ilustrasi operasional laundry Nevira: toko, ruang cuci, kurir, dan rumah pelanggan terhubung ke satu sistem"
        width={1400}
        height={1250}
        className="no3d-only pointer-events-none absolute -z-[1] right-0 bottom-0 w-full max-w-[880px] [mask-composite:intersect] [mask-image:linear-gradient(90deg,transparent,#000_30%),linear-gradient(0deg,transparent,#000_18%)] max-md:relative max-md:-mt-6 max-md:[mask-image:linear-gradient(180deg,transparent,#000_20%,#000_80%,transparent)] md:top-1/2 md:w-[60%] md:-translate-y-1/2"
      />
      <a
        href="#masalah"
        aria-label="Scroll ke bawah"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-caption text-text-3 transition-colors hover:text-accent motion-safe:animate-bounce md:flex"
      >
        <i className="ri-mouse-line text-[22px]" aria-hidden />
        Scroll
      </a>
    </Section>
  );
}
