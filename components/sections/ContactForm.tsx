"use client";

import { useState, type FormEvent } from "react";
import { KONTAK } from "@/content/pages";
import { Button } from "../ui/Button";

const field =
  "h-12 w-full rounded-[10px] border border-border-visible bg-background px-3.5 text-body text-text-1 placeholder:text-text-4 focus-visible:border-accent";

/**
 * Demo request. There is no backend yet, so submitting opens the visitor's email app with
 * the details filled in (to help@nevira.id). Nothing is stored or sent by the site itself.
 */
export function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Nama: ${d.get("nama")}`,
      `Nama laundry: ${d.get("laundry")}`,
      `No. WhatsApp: ${d.get("wa")}`,
      `Jumlah outlet: ${d.get("outlet")}`,
      `Fitur yang diminati: ${interests.join(", ") || "-"}`,
      "",
      String(d.get("pesan") ?? ""),
    ].join("\n");
    const subject = `Permintaan demo Nevira: ${d.get("laundry")}`;
    window.location.href = `mailto:help@nevira.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const toggle = (v: string) => setInterests((xs) => (xs.includes(v) ? xs.filter((x) => x !== v) : [...xs, v]));

  return (
    <form onSubmit={onSubmit} className="rounded-[16px] border border-border bg-background p-6 shadow-1 md:p-8">
      <h2 className="text-subheading">Minta demo</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-label font-medium text-text-1">Nama</span>
          <input name="nama" required autoComplete="name" placeholder="Nama lengkap" className={`${field} mt-2`} />
        </label>
        <label className="block">
          <span className="text-label font-medium text-text-1">Nama laundry</span>
          <input name="laundry" required autoComplete="organization" placeholder="mis. Laundry Bersih" className={`${field} mt-2`} />
        </label>
        <label className="block">
          <span className="text-label font-medium text-text-1">No. WhatsApp</span>
          <input name="wa" required type="tel" inputMode="tel" autoComplete="tel" placeholder="08…" className={`${field} mt-2`} />
        </label>
        <label className="block">
          <span className="text-label font-medium text-text-1">Jumlah outlet</span>
          <select name="outlet" className={`${field} mt-2`} defaultValue={KONTAK.outlets[0]}>
            {KONTAK.outlets.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="mt-5">
        <legend className="text-label font-medium text-text-1">Fitur yang diminati</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {KONTAK.interests.map((i) => {
            const on = interests.includes(i);
            return (
              <button
                key={i}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-body-sm transition-colors ${
                  on ? "border-accent bg-accent-subtle text-accent" : "border-border-visible text-text-2 hover:bg-surface-1"
                }`}
              >
                <i className={on ? "ri-check-line" : "ri-add-line"} aria-hidden />
                {i}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label className="mt-5 block">
        <span className="text-label font-medium text-text-1">Pesan</span>
        <textarea name="pesan" rows={4} placeholder="Ceritakan kebutuhan Anda" className={`${field} mt-2 h-auto py-3`} />
      </label>
      <Button type="submit" size="lg" trailingIcon="ri-arrow-right-line" className="mt-6">
        Kirim lewat email
      </Button>
      <p className="mt-3 text-caption text-text-3">
        Tombol ini membuka aplikasi email Anda dengan pesan yang sudah terisi. Data hanya dipakai untuk menghubungi Anda.
      </p>
    </form>
  );
}
