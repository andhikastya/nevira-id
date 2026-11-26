import type { Metadata } from "next";
import { HelpCenter } from "@/components/sections/HelpCenter";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container, Section } from "@/components/sections/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LINKS } from "@/content/copy";
import { BANTUAN } from "@/content/pages";

export const metadata: Metadata = {
  title: "Bantuan & FAQ",
  description: "Jawaban seputar Nevira: Saldo Koin, HP & tablet, cetak struk, hak akses karyawan, dan lainnya.",
  alternates: { canonical: "/bantuan" },
};

export default function BantuanPage() {
  return (
    <main>
      {/* Camera above the plaza; question marks drift around the hub "info tower" (world/PagePieces.tsx). */}
      <PageIntro station="bantuan" crumb="Bantuan" title={BANTUAN.title} body={BANTUAN.body} />
      <Section station="bantuan" data-opaque aria-label="Pertanyaan umum" className="bg-background py-20 md:py-28">
        <Container>
          <HelpCenter groups={BANTUAN.groups} />
        </Container>
        <Container className="mt-20">
          <h2 className="text-subheading">Belum Ketemu Jawabannya?</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { icon: "ri-whatsapp-line", title: "Chat WhatsApp", body: "Tanya langsung ke tim kami.", href: LINKS.whatsapp, cta: "Buka WhatsApp" },
              { icon: "ri-mail-line", title: "Email", body: "help@nevira.id", href: LINKS.email, cta: "Kirim email" },
              { icon: "ri-calendar-check-line", title: "Minta demo", body: "Lihat Nevira bersama tim.", href: "/kontak", cta: "Ke halaman kontak" },
            ].map((c) => (
              <li key={c.title}>
                <Card className="flex h-full flex-col p-6">
                  <i className={`${c.icon} text-[24px] text-accent`} aria-hidden />
                  <h3 className="mt-3 text-h6">{c.title}</h3>
                  <p className="mt-1 flex-1 text-body-sm text-text-2">{c.body}</p>
                  <ButtonLink href={c.href} variant="secondary" size="sm" className="mt-5 self-start">
                    {c.cta}
                  </ButtonLink>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
