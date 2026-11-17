import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container, Section } from "@/components/sections/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROOF } from "@/content/copy";
import { TENTANG } from "@/content/pages";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Nevira membangun sistem operasional untuk bisnis laundry Indonesia, dari Malang.",
  alternates: { canonical: "/tentang" },
};

export default function TentangPage() {
  return (
    <main>
      {/* Morning panorama of the town */}
      <PageIntro station="tentang" crumb="Tentang" title={TENTANG.title} body={TENTANG.body} />

      <Section station="tentang" data-opaque aria-labelledby="misi-title" className="bg-background py-24 md:py-28">
        <Container className="space-y-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <SectionHeading id="misi-title" eyebrow="Misi" title={TENTANG.mission.title} body={TENTANG.mission.body} />
            <ul className="grid gap-3">
              {TENTANG.values.map((v) => (
                <li key={v.title}>
                  <Card className="flex items-start gap-4 p-5">
                    <i className={`${v.icon} mt-0.5 text-[24px] text-accent`} aria-hidden />
                    <span>
                      <span className="block text-body-sm font-semibold text-text-3">{v.title}</span>
                      <span className="block text-h6 text-text-1">{v.body}</span>
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          {/* "Perjalanan" (company timeline) is left out until the team supplies real milestones. */}

          <div>
            <SectionHeading eyebrow="Nevira dalam angka" title="Dipakai laundry yang ingin tumbuh rapi." />
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {PROOF.stats.map((s) => (
                <Card key={s.label} className="flex flex-col-reverse p-5">
                  <dt className="mt-1 text-body-sm text-text-3">{s.label}</dt>
                  <dd className="text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-text-1 md:text-heading">{s.value}</dd>
                </Card>
              ))}
            </dl>
          </div>

          <Card className="flex flex-wrap items-center gap-x-8 gap-y-3 p-6">
            <span className="text-h6 text-text-1">Kantor</span>
            <span className="flex items-center gap-2 text-body text-text-2">
              <i className="ri-map-pin-line text-[20px] text-accent" aria-hidden />
              {TENTANG.office.city}
            </span>
            <a href={`mailto:${TENTANG.office.email}`} className="flex items-center gap-2 text-body text-text-2 hover:text-accent">
              <i className="ri-mail-line text-[20px] text-accent" aria-hidden />
              {TENTANG.office.email}
            </a>
          </Card>
        </Container>
      </Section>
      <FinalCta title="Siap merapikan operasional laundry Anda?" body="Ceritakan laundry Anda, tim kami siap membantu." primary="contact" />
    </main>
  );
}
