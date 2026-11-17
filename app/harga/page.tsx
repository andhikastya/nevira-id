import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/sections/FinalCta";
import { Pricing } from "@/components/sections/Pricing";
import { SelfServicePricing } from "@/components/sections/SelfServicePricing";
import { Container, Section } from "@/components/sections/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card, Panel } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LINKS } from "@/content/copy";
import { HARGA } from "@/content/pages";

export const metadata: Metadata = {
  title: "Harga",
  description: "Bayar sesuai pemakaian dengan Saldo Koin: Rp100 per transaksi, Rp50 per nota, Rp75 per pesan WhatsApp, Rp500 per ekspor laporan.",
  alternates: { canonical: "/harga" },
};

const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

export default function HargaPage() {
  return (
    <main>
      {/* Close-up of the Saldo Koin stack */}
      <Section station="harga-hero" aria-labelledby="harga-title" className="flex min-h-[100svh] items-center pt-16">
        <Container>
          <Panel className="max-w-[520px] p-6 md:p-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-body-sm text-text-3">
              <Link href="/" className="hover:text-accent">
                Beranda
              </Link>
              <span aria-hidden> / </span>
              <span aria-current="page" className="text-text-2">
                Harga
              </span>
            </nav>
            <h1 id="harga-title" className="text-[36px] leading-[1.05] tracking-[-0.025em] text-balance md:text-[52px]">
              {HARGA.title}
            </h1>
            <p className="mt-4 text-body-lg text-text-2 text-pretty">{HARGA.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={LINKS.signup} size="lg" trailingIcon="ri-arrow-right-line">
                Coba Gratis
              </ButtonLink>
              <ButtonLink href="#harga" variant="secondary" size="lg" icon="ri-calculator-line">
                Hitung biaya
              </ButtonLink>
            </div>
          </Panel>
        </Container>
      </Section>

      <Section station="harga-hero" data-opaque aria-labelledby="steps-title" className="bg-background py-24 md:py-28">
        <Container>
          <SectionHeading id="steps-title" eyebrow={HARGA.steps.eyebrow} title={HARGA.steps.title} />
          <ol className="mt-10 grid gap-3 md:grid-cols-3">
            {HARGA.steps.items.map((s, i) => (
              <li key={s.title}>
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-accent text-body-sm font-semibold text-white">{i + 1}</span>
                    <i className={`${s.icon} text-[22px] text-accent`} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-h6">{s.title}</h3>
                  <p className="mt-1 text-body-sm text-text-2">{s.body}</p>
                </Card>
              </li>
            ))}
          </ol>

          <h2 className="mt-20 text-subheading">{HARGA.ratesTitle}</h2>
          <div className="mt-6 overflow-hidden rounded-[12px] border border-border">
            <table className="w-full text-left">
              <thead className="bg-surface-1 text-body-sm text-text-3">
                <tr>
                  <th className="px-4 py-3 font-semibold md:px-5">Fitur</th>
                  <th className="px-4 py-3 font-semibold md:px-5">Tarif</th>
                  <th className="px-4 py-3 font-semibold max-sm:hidden md:px-5">Satuan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {HARGA.rates.map((r) => (
                  <tr key={r.label}>
                    <td className="px-4 py-4 text-body text-text-1 md:px-5">
                      <i className={`${r.icon} mr-2 text-[18px] text-accent`} aria-hidden />
                      {r.label}
                    </td>
                    <td className="px-4 py-4 text-body font-semibold text-text-1 md:px-5">
                      {rupiah(r.price)}
                      <span className="block text-caption font-normal text-text-3 sm:hidden">{r.unit}</span>
                    </td>
                    <td className="px-4 py-4 text-body-sm text-text-2 max-sm:hidden md:px-5">{r.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Calculator over the coin stack, which grows with the estimate */}
      <Pricing />

      {/* Self-service subscription: per stack / per machine, with a bill estimator */}
      <Section station="pricing" data-opaque aria-labelledby="ss-pricing-title" className="bg-surface-1 py-24 md:py-28">
        <Container>
          <SelfServicePricing />
        </Container>
      </Section>

      <Section station="pricing" data-opaque aria-labelledby="topup-title" className="bg-background py-24 md:py-28">
        <Container>
          <SectionHeading id="topup-title" title={HARGA.topup.title} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HARGA.topup.items.map((t) => (
              <li key={t.title}>
                <Card className="h-full p-5">
                  <i className={`${t.icon} text-[22px] text-accent`} aria-hidden />
                  <h3 className="mt-3 text-h6">{t.title}</h3>
                  <p className="mt-1 text-body-sm text-text-2">{t.body}</p>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionHeading eyebrow="FAQ harga" title={HARGA.faqTitle} body="Pertanyaan lain? Lihat halaman Bantuan." />
            <Accordion items={HARGA.faq.map((i) => ({ q: i.q, a: i.a }))} />
          </div>
        </Container>
      </Section>
      <FinalCta title={HARGA.cta} />
    </main>
  );
}
