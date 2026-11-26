import { PROOF } from "@/content/copy";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Container, Section } from "./Section";
import { TestimonialSlider } from "./TestimonialSlider";

export function Proof() {
  return (
    <Section station="proof" aria-labelledby="proof-title" className="on-dusk flex min-h-[120svh] flex-col justify-end py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="proof-title" title={PROOF.title} />
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-3">
          {PROOF.stats.map((s) => (
            <Card key={s.label} className="flex flex-col-reverse bg-background/95 p-4 md:p-5">
              <dt className="mt-1 text-body-sm text-text-3">{s.label}</dt>
              <dd className="whitespace-nowrap text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-text-1 md:text-heading">{s.value}</dd>
            </Card>
          ))}
        </dl>
        <TestimonialSlider />
      </Container>
    </Section>
  );
}
