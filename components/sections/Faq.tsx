import { FAQ, LINKS } from "@/content/copy";
import { Accordion } from "../ui/Accordion";
import { ButtonLink } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { Container, Section } from "./Section";

export function Faq() {
  return (
    <Section station="faq" id="faq" aria-labelledby="faq-title" className="bg-background py-24 md:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading id="faq-title" eyebrow={FAQ.eyebrow} title={FAQ.title} body={FAQ.body} />
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={LINKS.whatsapp} variant="secondary" size="md" icon="ri-whatsapp-line">
              Tanya via WhatsApp
            </ButtonLink>
            <ButtonLink href={LINKS.email} variant="tertiary" size="md" icon="ri-mail-line">
              help@nevira.id
            </ButtonLink>
          </div>
        </div>
        <Accordion items={FAQ.items.map((i) => ({ q: i.q, a: i.a }))} />
      </Container>
    </Section>
  );
}
