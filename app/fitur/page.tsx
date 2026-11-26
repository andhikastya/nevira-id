import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/sections/FinalCta";
import { FiturExplorer } from "@/components/sections/FiturExplorer";
import { Container, Section } from "@/components/sections/Section";
import { ScreenFrame } from "@/components/ScreenFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LINKS } from "@/content/copy";

export const metadata: Metadata = {
  title: "Fitur",
  description: "Tujuh fitur dalam satu alur kerja: kasir & POS tablet, produksi, antar-jemput, aplikasi owner, back office, self-service, dan absensi karyawan.",
  alternates: { canonical: "/fitur" },
};

export default function FiturPage() {
  return (
    <main>
      {/* Town map with a clickable pin on every building (world/PagePieces.tsx). */}
      <Section station="fitur-map" aria-labelledby="fitur-title" className="flex min-h-[110svh] items-center pt-16">
        <Container>
          <Panel className="max-w-[460px] p-6 md:p-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-body-sm text-text-3">
              <Link href="/" className="hover:text-accent">
                Beranda
              </Link>
              <span aria-hidden> / </span>
              <span aria-current="page" className="text-text-2">
                Fitur
              </span>
            </nav>
            <h1 id="fitur-title" className="text-[36px] leading-[1.05] tracking-[-0.025em] text-balance md:text-[48px]">
              Tujuh fitur, satu alur kerja.
            </h1>
            <p className="mt-4 text-body-lg text-text-2 text-pretty">
              Setiap fitur menangani satu bagian bisnis Anda, dari kasir sampai laporan, dan semuanya saling terhubung. Pilih fitur untuk melihat cara kerjanya.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={LINKS.signup} size="lg" trailingIcon="ri-arrow-right-line">
                Coba Gratis
              </ButtonLink>
              <ButtonLink href="/harga" variant="secondary" size="lg">
                Lihat harga
              </ButtonLink>
            </div>
            <p className="no3d-only mt-5 text-body-sm text-text-3">Daftar lengkap fitur ada di bawah.</p>
          </Panel>
        </Container>
      </Section>

      <Section station="overview" data-opaque aria-labelledby="peran-title" className="bg-background py-24 md:py-28">
        <Container>
          <SectionHeading id="peran-title" title="Jelajahi per Peran" body="Pilih peran di laundry Anda untuk melihat fitur yang relevan." />
          <div className="mt-8">
            <FiturExplorer />
          </div>
        </Container>
      </Section>

      <Section station="connected" aria-labelledby="data-title" className="flex min-h-[110svh] items-end pb-24">
        <Container>
          <Panel className="mx-auto max-w-[640px] p-6 text-center md:p-8">
            <SectionHeading
              id="data-title"
              eyebrow="Satu data"
              title="Semua Fitur Membaca Data yang Sama."
              body="Tidak ada input ganda antara kasir, produksi, kurir, dan laporan."
              align="center"
            />
          </Panel>
        </Container>
      </Section>

      <Section station="overview" data-opaque aria-labelledby="device-title" className="bg-background py-24 md:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="device-title"
              eyebrow="HP & tablet"
              title="Satu Aplikasi, Menyesuaikan Perangkat."
              body="Layout portrait di HP, landscape di tablet kasir. Printer thermal Bluetooth."
            />
          </div>
          <div className="grid grid-cols-[1.6fr_1fr] items-end gap-4">
            <ScreenFrame src="/screens/pos-kasir.png" label="Tablet POS (landscape)" icon="ri-tablet-line" />
            <ScreenFrame src="/screens/admin.png" label="HP" icon="ri-smartphone-line" />
          </div>
        </Container>
      </Section>

      <FinalCta title="Mulai dari Fitur yang Anda Butuhkan." body="Daftar gratis, atau ceritakan kebutuhan Anda ke tim kami." secondary="contact" />
    </main>
  );
}
