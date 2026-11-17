import type { Metadata, Viewport } from "next";
import "@fontsource/red-hat-text/400.css";
import "@fontsource/red-hat-text/500.css";
import "@fontsource/red-hat-text/600.css";
import "@fontsource/red-hat-text/700.css";
import "./globals.css";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { ScrollDriver } from "@/components/ScrollDriver";
import { SceneRoot } from "@/components/three/SceneRoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://nevira.id"),
  title: {
    default: "Nevira — Sistem Operasional Laundry: Kasir, Produksi, Kurir & Laporan",
    template: "%s · Nevira",
  },
  description:
    "Nevira menyatukan kasir, ruang cuci, kurir, aplikasi owner, dan laporan laba-rugi bisnis laundry Anda dalam satu sistem. Kirim struk via WhatsApp, bayar per transaksi dengan Saldo Koin.",
  openGraph: {
    title: "Nevira — Laundry Anda rapi, dari terima sampai antar",
    description: "Kasir, produksi, kurir, dan laporan keuangan laundry dalam satu sistem.",
    url: "https://nevira.id",
    siteName: "Nevira",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nevira",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Sistem operasional untuk bisnis laundry: POS kasir, produksi, kurir, aplikasi owner, dan laporan keuangan.",
  url: "https://nevira.id",
  offers: { "@type": "Offer", price: "100", priceCurrency: "IDR", description: "Per transaksi, dibayar dengan Saldo Koin" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // overflow-x-clip: decorative blurs/washes bleed past the edges but must never widen the page
    // on phones (clip, unlike hidden, keeps position: sticky working).
    <html lang="id" className="overflow-x-clip antialiased">
      <body className="overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Shared across every route so the 3D town persists on client navigation (layouts don't rerender). */}
        {/* Hero shine stage — sits behind the 3D canvas. */}
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-[radial-gradient(120%_80%_at_75%_30%,#EBE5F6_0%,#F6F3FB_40%,#FFFFFF_75%)]"
        />
        {/* Dusk sky for the closing stretch; opacity driven by the 3D scene (--dusk). */}
        <div
          aria-hidden
          className="fixed inset-0 -z-[9] bg-[linear-gradient(180deg,#2B194D_0%,#5B369E_45%,#C3AEE7_80%,#EBE5F6_100%)] opacity-[var(--dusk,0)]"
        />
        <SceneRoot />
        {/* Clickable 3D labels (e.g. the /fitur map pins) render here, above the page content. */}
        <div id="scene-overlay" aria-label="Peta fitur" className="pointer-events-none fixed inset-0 z-30 overflow-hidden" />
        <ScrollDriver />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
