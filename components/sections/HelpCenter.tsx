"use client";

import { useMemo, useState } from "react";
import type { FaqGroup } from "@/content/pages";
import { Accordion } from "../ui/Accordion";

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Search box + categorised FAQ (filters questions and answers as you type). */
export function HelpCenter({ groups }: { groups: FaqGroup[] }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(needle)) }))
      .filter((g) => g.items.length);
  }, [q, groups]);

  return (
    <div>
      <label className="relative block max-w-[640px]">
        <span className="sr-only">Cari pertanyaan</span>
        <i className="ri-search-line pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[20px] text-text-3" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari pertanyaan, mis. “cetak struk”"
          className="h-14 w-full rounded-[12px] border border-border-visible bg-background pr-4 pl-12 text-body text-text-1 shadow-1 placeholder:text-text-4 focus-visible:border-accent"
        />
      </label>

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
        <nav aria-label="Kategori" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-caption font-semibold tracking-wide text-text-3 uppercase">Kategori</p>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {groups.map((g) => (
              <li key={g.title}>
                <a
                  href={`#${slug(g.title)}`}
                  className="flex items-center gap-2 rounded-[10px] px-3 py-2 text-body-sm text-text-2 transition-colors hover:bg-surface-1 hover:text-text-1 max-lg:bg-surface-1"
                >
                  <i className={`${g.icon} text-[16px] text-accent`} aria-hidden />
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-12" aria-live="polite">
          {shown.length === 0 && (
            <p className="rounded-[12px] bg-surface-1 p-6 text-body text-text-2">
              Belum ada jawaban untuk “{q}”. Tanyakan langsung ke tim kami lewat WhatsApp atau email di bawah.
            </p>
          )}
          {shown.map((g) => (
            <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-title`} className="scroll-mt-24">
              <h2 id={`${slug(g.title)}-title`} className="text-subheading">
                {g.title}
              </h2>
              <div className="mt-4">
                <Accordion key={q} items={g.items.map((i) => ({ q: i.q, a: i.a }))} defaultOpen={q ? 0 : -1} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
