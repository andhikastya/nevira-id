import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalBySlug } from "@/content/legal";

const doc = legalBySlug("kebijakan-privasi");

export const metadata: Metadata = {
  title: doc.title,
  description: "Kebijakan Privasi aplikasi Nevira: data yang dikumpulkan, penggunaannya, dan hak Anda.",
  alternates: { canonical: "/legal/kebijakan-privasi" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
