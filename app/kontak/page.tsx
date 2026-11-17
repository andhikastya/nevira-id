import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container, Section } from "@/components/sections/Section";
import { Card } from "@/components/ui/Card";
import { LINKS } from "@/content/copy";
import { KONTAK } from "@/content/pages";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi tim Nevira untuk demo, pertanyaan fitur, atau konsultasi pindah dari sistem lama.",
  alternates: { canonical: "/kontak" },
};

const CHANNELS = [
  { icon: "ri-whatsapp-line", title: "WhatsApp", body: "Chat langsung dengan tim", href: LINKS.whatsapp },
  { icon: "ri-mail-line", title: "Email", body: "help@nevira.id", href: LINKS.email },
  { icon: "ri-map-pin-line", title: "Kantor", body: "Malang, Indonesia" },
];

export default function KontakPage() {
  return (
    <main>
      <PageIntro station="kontak" crumb="Kontak" title={KONTAK.title} body={KONTAK.body} />
      <Section station="kontak" data-opaque aria-label="Formulir kontak" className="bg-background py-20 md:py-28">
        <Container className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <ContactForm />
          <ul className="space-y-3">
            {CHANNELS.map((c) => {
              const inner = (
                <Card className="flex items-center gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-accent-subtle text-accent">
                    <i className={`${c.icon} text-[22px]`} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-h6 text-text-1">{c.title}</span>
                    <span className="block text-body-sm text-text-2">{c.body}</span>
                  </span>
                </Card>
              );
              return (
                <li key={c.title}>
                  {c.href ? (
                    <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block transition-shadow hover:[&>div]:shadow-2">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
