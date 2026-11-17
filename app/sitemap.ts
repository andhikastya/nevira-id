import type { MetadataRoute } from "next";
import { FEATURES, featureHref } from "@/content/features";

const BASE = "https://nevira.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/fitur", ...FEATURES.map((f) => featureHref(f.slug)), "/harga", "/bantuan", "/tentang", "/kontak", "/legal/syarat-ketentuan", "/legal/kebijakan-privasi"];
  return paths.map((p) => ({ url: `${BASE}${p === "/" ? "" : p}`, priority: p === "/" ? 1 : 0.7 }));
}
