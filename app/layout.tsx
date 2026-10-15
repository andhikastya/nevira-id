import type { Metadata, Viewport } from "next";
import "@fontsource/red-hat-text/400.css";
import "@fontsource/red-hat-text/500.css";
import "@fontsource/red-hat-text/600.css";
import "@fontsource/red-hat-text/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nevira.id"),
  title: "Nevira — Sistem Operasional Laundry: Kasir, Produksi, Kurir & Laporan",
  description:
    "Nevira menyatukan kasir, ruang cuci, kurir, notifikasi WhatsApp, dan laporan laba-rugi bisnis laundry Anda dalam satu sistem. Bayar per transaksi dengan Saldo Koin.",
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
  description: "Sistem operasional untuk bisnis laundry: POS kasir, produksi, kurir, notifikasi WhatsApp, dan laporan keuangan.",
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
        {children}
      </body>
    </html>
  );
}
