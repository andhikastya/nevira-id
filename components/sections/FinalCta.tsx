import { FINAL_CTA, LINKS } from "@/content/copy";
import { ButtonLink } from "../ui/Button";
import { Container, Section } from "./Section";

export function FinalCta() {
  return (
    <Section station="cta" aria-labelledby="cta-title" className="on-dusk flex min-h-[110svh] items-start">
      <Container className="pt-28 text-center md:pt-36">
        <h2 id="cta-title" className="mx-auto max-w-[680px] text-[36px] leading-[1.05] tracking-[-0.025em] text-balance md:text-[56px]">
          {FINAL_CTA.title}
        </h2>
        <p className="dusk-sub mx-auto mt-5 max-w-[520px] text-body-lg text-text-2">{FINAL_CTA.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={LINKS.signup} size="lg" trailingIcon="ri-arrow-right-line">
            {FINAL_CTA.primary}
          </ButtonLink>
          <ButtonLink href={LINKS.whatsapp} variant="secondary" size="lg" icon="ri-whatsapp-line">
            {FINAL_CTA.secondary}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
