import { PROOF } from "@/content/copy";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Container, Section } from "./Section";

export function Proof() {
  return (
    <Section station="proof" aria-labelledby="proof-title" className="on-dusk flex min-h-[120svh] flex-col justify-end py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="proof-title" eyebrow={PROOF.eyebrow} title={PROOF.title} />
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-3">
          {PROOF.stats.map((s) => (
            <Card key={s.label} className="flex flex-col-reverse bg-background/95 p-4 md:p-5">
              <dt className="mt-1 text-body-sm text-text-3">{s.label}</dt>
              <dd className="whitespace-nowrap text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-text-1 md:text-heading">{s.value}</dd>
            </Card>
          ))}
        </dl>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {PROOF.testimonials.map((t, i) => (
            <li key={i}>
              <Card className="flex h-full flex-col bg-background/95 p-5">
                <i className="ri-double-quotes-l text-[24px] text-text-4" aria-hidden />
                <blockquote className="mt-2 flex-1 text-body text-text-1">{t.quote}</blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-accent-subtle text-body-sm font-semibold text-accent">
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <p className="text-body-sm font-semibold text-text-1">{t.name}</p>
                    <p className="text-caption text-text-3">{t.business}</p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
