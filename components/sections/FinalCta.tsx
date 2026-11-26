import { FINAL_CTA, LINKS } from "@/content/copy";
import { ButtonLink } from "../ui/Button";
import { Container, Section } from "./Section";

type Props = {
  title?: string;
  body?: string;
  /** "contact" swaps the signup button for a contact-the-team action. */
  primary?: "signup" | "contact";
  /** Second button: WhatsApp chat (default) or the contact page. */
  secondary?: "whatsapp" | "contact";
};

export function FinalCta({ title = FINAL_CTA.title, body = FINAL_CTA.body, primary = "signup", secondary = "whatsapp" }: Props) {
  return (
    <Section station="cta" aria-labelledby="cta-title" className="on-dusk flex min-h-[110svh] items-start">
      <Container className="pt-28 text-center md:pt-36">
        <h2 id="cta-title" className="mx-auto max-w-[680px] text-[36px] leading-[1.05] tracking-[-0.025em] text-balance md:text-[56px]">
          {title}
        </h2>
        <p className="dusk-sub mx-auto mt-5 max-w-[520px] text-body-lg whitespace-pre-line text-text-2">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {primary === "contact" ? (
            <ButtonLink href="/kontak" size="lg" trailingIcon="ri-arrow-right-line">
              Hubungi tim
            </ButtonLink>
          ) : (
            <ButtonLink href={LINKS.signup} size="lg" trailingIcon="ri-arrow-right-line">
              {FINAL_CTA.primary}
            </ButtonLink>
          )}
          {secondary === "contact" ? (
            <ButtonLink href="/kontak" variant="secondary" size="lg">
              Hubungi tim
            </ButtonLink>
          ) : (
            <ButtonLink href={LINKS.whatsapp} variant="secondary" size="lg" icon="ri-whatsapp-line">
              {FINAL_CTA.secondary}
            </ButtonLink>
          )}
        </div>
      </Container>
    </Section>
  );
}
