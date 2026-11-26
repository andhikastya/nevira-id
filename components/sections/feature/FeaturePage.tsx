import Link from "next/link";
import { LINKS } from "@/content/copy";
import { FEATURE_GROUPS, featureBySlug, featureHref, type Feature } from "@/content/features";
import { featureStation } from "@/components/three/stations";
import { ScreenFrame } from "../../ScreenFrame";
import { Badge } from "../../ui/Badge";
import { ButtonLink } from "../../ui/Button";
import { Card, Panel } from "../../ui/Card";
import { SectionHeading } from "../../ui/SectionHeading";
import { FinalCta } from "../FinalCta";
import { SelfServicePricing } from "../SelfServicePricing";
import { Container, Section } from "../Section";

/**
 * Feature page on top of the shared 3D town: hero station, three alternating stations,
 * capability grid + related features (overview shot), and the dusk CTA.
 */
export function FeaturePage({ feature: f }: { feature: Feature }) {
  const contact = f.hero.primary === "contact";
  // Self-service has its own subscription pricing further down this page; everything else uses /harga.
  const pricingHref = f.slug === "self-service" ? "#harga-self-service" : "/harga";
  return (
    <main>
      {/* Hero */}
      <Section
        station={featureStation(f.slug, 0)}
        aria-labelledby="feature-title"
        className="flex min-h-[100svh] items-center pt-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.7)_35%,rgba(255,255,255,0)_62%)] max-md:bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0)_100%)]"
        />
        <Container className="relative py-16">
          <div className="max-w-[560px]">
            <nav aria-label="Breadcrumb" className="text-body-sm text-text-3">
              <Link href="/" className="hover:text-accent">
                Beranda
              </Link>
              <span aria-hidden> / </span>
              <Link href="/fitur" className="hover:text-accent">
                Fitur
              </Link>
              <span aria-hidden> / </span>
              <span aria-current="page" className="text-text-2">
                {f.name}
              </span>
            </nav>
            <div className="mt-5">
              <Badge tone="primary" icon={f.icon}>
                {FEATURE_GROUPS[f.group]}
              </Badge>
            </div>
            <h1 id="feature-title" className="mt-5 text-[36px] leading-[1.05] tracking-[-0.025em] text-balance md:text-[48px]">
              {f.hero.title}
            </h1>
            <p className="mt-5 max-w-[500px] text-body-lg text-text-2 text-pretty">{f.hero.body}</p>
            {f.hero.points && (
              <ul className="mt-5 space-y-2.5">
                {f.hero.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-body text-text-2">
                    <span className="mt-[3px] flex size-5 shrink-0 items-center justify-center rounded-full bg-success-bg text-success">
                      <i className="ri-check-line text-[13px] leading-none" aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {contact ? (
                <ButtonLink href="/kontak" size="lg" trailingIcon="ri-arrow-right-line">
                  Hubungi tim
                </ButtonLink>
              ) : (
                <ButtonLink href={LINKS.signup} size="lg" trailingIcon="ri-arrow-right-line">
                  Coba Gratis
                </ButtonLink>
              )}
              <ButtonLink href={pricingHref} variant="secondary" size="lg">
                Lihat harga
              </ButtonLink>
            </div>
            <ScreenFrame src={f.screen} label={f.name} icon={f.icon} className="no3d-only mt-8" />
          </div>
        </Container>
      </Section>

      {/* Stations: panels alternate left/right; the camera shift in stations.ts leaves room for them. */}
      {f.stations.map((s, i) => {
        const right = i === 1;
        return (
          <Section
            key={s.title}
            station={featureStation(f.slug, (i + 1) as 1 | 2 | 3)}
            aria-labelledby={`station-${i}`}
            className="flex min-h-[110svh] items-center"
          >
            <Container className={right ? "flex md:justify-end" : ""}>
              <Panel className="max-w-[480px] p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent text-body-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  {!f.hideStationBadge && (
                    <Badge tone="neutral" icon={f.icon}>
                      {f.name}
                    </Badge>
                  )}
                </div>
                <h2 id={`station-${i}`} className="mt-5 text-subheading text-balance">
                  {s.title}
                </h2>
                <p className="mt-3 text-body text-text-2">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-1.5 rounded-full bg-surface-1 px-3 py-1 text-body-sm text-text-2">
                      <i className="ri-check-line text-[14px] text-success" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <ScreenFrame src={f.screen} label={f.name} icon={f.icon} className="no3d-only mt-6" />
              </Panel>
            </Container>
          </Section>
        );
      })}

      {f.slug === "self-service" && (
        <Section id="harga-self-service" station="overview" data-opaque aria-labelledby="ss-pricing-title" className="bg-surface-1 py-24 md:py-28">
          <Container>
            <SelfServicePricing />
          </Container>
        </Section>
      )}

      {/* Capabilities + related, over the wide town shot. */}
      <Section station="overview" aria-labelledby="caps-title" className="py-24 md:py-32">
        <Container>
          <Panel className="max-w-[680px] p-6 md:p-8">
            <SectionHeading id="caps-title" eyebrow={f.caps?.eyebrow ?? "Semua kemampuan"} title={f.caps?.title ?? `Yang Juga Ada di ${f.name}`} />
          </Panel>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {f.capabilities.map((c) => (
              <li key={c.title}>
                <Card className="h-full bg-background/95 p-5">
                  <h3 className="text-h6">{c.title}</h3>
                  <p className="mt-1 text-body-sm text-text-2">{c.body}</p>
                </Card>
              </li>
            ))}
          </ul>

          <h2 className="mt-20 text-subheading">Fitur Terkait</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {f.related.map((slug) => {
              const r = featureBySlug(slug);
              return (
                <li key={slug}>
                  <Link href={featureHref(slug)} className="group block h-full">
                    <Card className="flex h-full items-start gap-4 bg-background/95 p-5 transition-shadow group-hover:shadow-2">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-accent-subtle text-accent">
                        <i className={`${r.icon} text-[20px]`} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-h6 text-text-1">{r.name}</span>
                        <span className="mt-1 block text-body-sm text-text-2">{r.summary}</span>
                      </span>
                      <i className="ri-arrow-right-line text-[20px] text-text-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <FinalCta title={f.cta?.title} body={f.cta?.body} primary={f.hero.primary} />
    </main>
  );
}
