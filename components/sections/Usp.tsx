import { USP, type UspKey } from "@/content/copy";
import { Container, Section } from "./Section";

/* Small, decorative mini-UIs, one per pain point. Purely visual (aria-hidden); the card text carries the meaning. */

function Bubble({ me, children, className = "" }: { me?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`block max-w-[78%] rounded-[8px] px-2 py-1 text-[8px] leading-[1.3] ${
        me ? "ml-auto bg-accent text-white" : "bg-accent-subtle text-text-1"
      } ${className}`}
    >
      {children}
    </span>
  );
}

function Tile({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`absolute w-[64px] rounded-[6px] border border-border bg-background p-1.5 shadow-1 ${className}`}>
      <span className="block text-[7px] font-semibold text-text-3">{label}</span>
      <span className="mt-1 block h-1.5 rounded-full bg-accent/70" />
      <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-surface-2" />
    </span>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <span className={`absolute flex size-4 items-center justify-center rounded-full border border-accent bg-background text-accent ${className}`}>
      <i className="ri-close-line text-[10px] leading-none" />
    </span>
  );
}

function Art({ k }: { k: UspKey }) {
  switch (k) {
    case "bot":
      return (
        <div className="absolute inset-x-3 top-3 bottom-0 overflow-hidden rounded-t-[10px] border border-border bg-background shadow-1">
          <div className="flex items-center gap-1.5 bg-accent px-2 py-1.5 text-white">
            <i className="ri-robot-2-line text-[11px] leading-none" />
            <span className="text-[8px] font-semibold">CS Laundry App · Bot</span>
          </div>
          <div className="space-y-1 p-1.5">
            <Bubble me>Nota saya kok hilang?</Bubble>
            <Bubble>Ketik 1 / 2 / 3 ya.</Bubble>
            <Bubble me>Mau bicara sama orang</Bubble>
            <Bubble>Maaf, pilihan tidak dikenali.</Bubble>
          </div>
          <span className="absolute right-2 bottom-2 flex size-6 items-center justify-center rounded-full bg-background text-[10px] font-bold text-error shadow-2">
            ?!
          </span>
        </div>
      );
    case "apps":
      return (
        <div className="absolute inset-0">
          <svg className="absolute inset-0 size-full" viewBox="0 0 200 140" preserveAspectRatio="none">
            <path d="M48 36 H152 M48 36 V104 M152 36 V104 M48 104 H152" stroke="var(--accent)" strokeOpacity="0.35" strokeDasharray="3 3" fill="none" />
          </svg>
          <Tile label="Kasir" className="top-3 left-3" />
          <Tile label="Chat Kurir" className="top-3 right-3" />
          <Tile label="Produksi" className="bottom-3 left-3" />
          <Tile label="Keuangan" className="right-3 bottom-3" />
          <Cross className="top-[28px] left-[calc(50%-8px)]" />
          <Cross className="top-[calc(50%-8px)] left-[40px]" />
          <Cross className="top-[calc(50%-8px)] right-[40px]" />
          <Cross className="bottom-[28px] left-[calc(50%-8px)]" />
        </div>
      );
    case "nota":
      return (
        <div className="absolute inset-0">
          <div className="absolute top-3 left-4 w-[92px] rounded-[6px] border border-border bg-background p-2 shadow-1">
            <span className="block text-[8px] font-bold text-text-1">NOTA</span>
            <span className="block text-[7px] text-text-3">INV/25/00034</span>
            <span className="mt-1.5 block h-1 rounded-full bg-surface-2" />
            <span className="mt-1 block h-1 w-3/4 rounded-full bg-surface-2" />
            <span className="mt-1 block h-1 w-5/6 rounded-full bg-surface-2" />
            <span className="mt-2 flex items-center justify-between text-[7px] text-text-3">
              Status <b className="text-error">???</b>
            </span>
          </div>
          <div className="absolute top-6 right-3 w-[78px] space-y-1 rounded-[6px] border border-border bg-background p-2 shadow-1">
            {["Diterima", "Dicuci", "Disetrika", "Siap diambil"].map((s, i) => (
              <span key={s} className={`flex items-center gap-1 text-[7px] ${i === 0 ? "font-semibold text-text-1" : "text-text-4"}`}>
                <i className={`${i === 0 ? "ri-checkbox-circle-fill text-accent" : "ri-question-line"} text-[9px] leading-none`} />
                {s}
              </span>
            ))}
          </div>
          <i className="ri-search-line absolute bottom-1 left-[78px] text-[30px] leading-none text-accent" />
        </div>
      );
    case "feedback":
      return (
        <div className="absolute inset-0">
          <div className="absolute top-3 left-3 w-[100px] rounded-[6px] border border-border bg-background p-2 shadow-1">
            <span className="block text-[7px] font-semibold text-accent">Saran untuk aplikasi:</span>
            <span className="mt-1 block text-[7px] leading-[1.3] text-text-2">Tolong tambah fitur laporan per kurir…</span>
            <span className="mt-1 block text-[8px] leading-none text-accent">★★★★★</span>
          </div>
          <span className="absolute top-[78px] left-6 flex size-7 items-center justify-center rounded-full bg-accent text-white">
            <i className="ri-user-3-fill text-[14px] leading-none" />
          </span>
          <div className="absolute top-4 right-3 grid w-[56px] grid-cols-3 gap-1 rounded-[6px] border border-border bg-background p-1.5 shadow-1">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="aspect-square rounded-[2px] bg-accent-subtle" />
            ))}
          </div>
          <span className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-[7px] font-semibold text-text-1 shadow-1">
            <i className="ri-error-warning-fill text-[10px] leading-none text-error" />
            Tidak ada tanggapan
          </span>
        </div>
      );
    case "data":
      return (
        <div className="absolute inset-0">
          <div className="absolute top-6 left-3 w-[104px] rotate-[-4deg] rounded-[6px] border border-border bg-background p-1.5 shadow-1">
            <div className="grid grid-cols-4 gap-[2px]">
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i} className={`h-2 rounded-[1px] ${i < 4 ? "bg-success/50" : i === 10 || i === 17 ? "bg-accent/30" : "bg-surface-2"}`} />
              ))}
            </div>
            <span className="mt-1 block text-[6px] text-accent">=SUM(B2:B30)…</span>
          </div>
          <span className="absolute top-3 right-12 flex flex-col items-center text-[7px] text-text-3">
            <i className="ri-time-line text-[20px] leading-none text-accent" />
            berjam-jam
          </span>
          <span className="absolute top-2 right-3 flex flex-col items-center text-[7px] font-semibold text-text-2">
            <i className="ri-lightbulb-line text-[18px] leading-none text-accent" />
            insight?
          </span>
          <span className="absolute right-6 bottom-3 flex size-10 items-center justify-center rounded-[8px] bg-text-1 text-white shadow-2">
            <i className="ri-calculator-line text-[20px] leading-none" />
          </span>
        </div>
      );
  }
}

/**
 * Home USP: problems other laundry apps leave unsolved, over the town at night (station: usp).
 * Five cards in a row on desktop, a swipeable row on smaller screens.
 */
export function Usp() {
  return (
    <Section station="usp" id="kenapa-nevira" aria-labelledby="usp-title" className="flex min-h-[110svh] items-center py-24 text-white">
      {/* Night-purple wash over the 3D town so the copy stays readable; the lit town still glows through. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(110,60,210,0.55),transparent_55%),linear-gradient(180deg,rgba(28,14,56,0.88)_0%,rgba(43,25,77,0.84)_60%,rgba(28,14,56,0.9)_100%)]"
      />
      <Container className="relative">
        <p className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-body-sm font-semibold text-white/90">{USP.eyebrow}</p>
        <h2 id="usp-title" className="mt-4 max-w-[860px] text-[32px] leading-[1.08] font-bold tracking-[-0.025em] text-white! text-balance md:text-[44px]">
          {USP.title}
        </h2>
        <p className="mt-4 max-w-[640px] text-body-lg text-white/75">{USP.body}</p>

        <ol className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {USP.items.map((it, i) => (
            <li key={it.key} className="w-[260px] shrink-0 snap-start lg:w-auto">
              <article className="flex h-full flex-col rounded-[16px] bg-background p-3 text-text-1 shadow-2">
                <div aria-hidden className="relative h-[140px] overflow-hidden rounded-[10px] bg-[#f3effa]">
                  <span className="absolute -top-6 -right-6 size-20 rounded-full bg-accent-subtle" />
                  <span className="absolute -bottom-8 -left-6 size-20 rounded-full bg-accent-subtle" />
                  <Art k={it.key} />
                </div>
                <div className="px-1.5 pt-4 pb-2">
                  <p className="text-body-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-h5 font-bold text-balance">{it.title}</h3>
                  <p className="mt-2 text-body-sm text-text-2">{it.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <span className="w-fit rounded-[10px] border border-white/30 bg-accent px-4 py-2 text-body font-semibold">{USP.badge}</span>
          <p className="max-w-[760px] text-body-lg text-white/90">{USP.promise}</p>
        </div>
      </Container>
    </Section>
  );
}
