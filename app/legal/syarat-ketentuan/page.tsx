import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalBySlug } from "@/content/legal";

const doc = legalBySlug("syarat-ketentuan");

export const metadata: Metadata = {
  title: doc.title,
  description: "Syarat & Ketentuan penggunaan aplikasi Nevira.",
  alternates: { canonical: "/legal/syarat-ketentuan" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
