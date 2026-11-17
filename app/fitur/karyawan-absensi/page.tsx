import type { Metadata } from "next";
import { FeaturePage } from "@/components/sections/feature/FeaturePage";
import { featureBySlug, featureMetadata } from "@/content/features";

const feature = featureBySlug("karyawan-absensi");
export const metadata: Metadata = featureMetadata(feature);

export default function Page() {
  return <FeaturePage feature={feature} />;
}
