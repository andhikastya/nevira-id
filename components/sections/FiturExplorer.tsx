"use client";

import Link from "next/link";
import { useState } from "react";
import { FEATURES, featureHref, type FeatureGroup } from "@/content/features";
import { Card } from "../ui/Card";

const TABS: { key: FeatureGroup | "semua"; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "outlet", label: "Operasional outlet" },
  { key: "manajemen", label: "Pemilik & manajemen" },
  { key: "lainnya", label: "Self-service" },
];

/** "Jelajahi per peran": role tabs filtering the feature cards. */
export function FiturExplorer() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("semua");
  const list = tab === "semua" ? FEATURES : FEATURES.filter((f) => f.group === tab);
  return (
    <div>
      <div role="tablist" aria-label="Peran" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`h-10 rounded-full px-4 text-body-sm font-semibold transition-colors ${
              tab === t.key ? "bg-accent text-white" : "border border-border-visible bg-background text-text-2 hover:bg-surface-1"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3" role="tabpanel">
        {list.map((f) => (
          <li key={f.slug}>
            <Link href={featureHref(f.slug)} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-shadow group-hover:shadow-2">
                <span className="flex size-11 items-center justify-center rounded-[12px] bg-accent-subtle text-accent">
                  <i className={`${f.icon} text-[22px]`} aria-hidden />
                </span>
                <h3 className="mt-4 text-h5">{f.name}</h3>
                <p className="mt-1 flex-1 text-body-sm text-text-2">{f.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-caption text-text-3">{f.devices.join(" · ")}</span>
                  <span className="flex items-center gap-1 text-body-sm font-semibold text-accent">
                    Pelajari
                    <i className="ri-arrow-right-line text-[16px] transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
