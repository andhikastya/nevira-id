import { TURN } from "@/content/copy";
import { Panel } from "../ui/Card";
import { Eyebrow } from "../ui/SectionHeading";
import { Container, Section } from "./Section";

export function Turn() {
  return (
    <Section station="turn" aria-labelledby="turn-title" className="flex min-h-[150svh] items-start">
      <Container className="sticky top-0 flex min-h-[100svh] flex-col items-center justify-start pt-24 md:pt-28">
        {/* Same frosted card as the journey steps, centered over the hub reveal. */}
        <Panel className="flex max-w-[640px] flex-col items-center p-6 text-center md:p-8">
          <Eyebrow>{TURN.eyebrow}</Eyebrow>
          <h2 id="turn-title" className="text-[32px] leading-[1.08] tracking-[-0.025em] text-balance md:text-[44px]">
            {TURN.title}
          </h2>
          <p className="mt-4 max-w-[520px] text-body-lg text-text-2 text-pretty">{TURN.body}</p>
        </Panel>
      </Container>
    </Section>
  );
}
