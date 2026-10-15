"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { q: string; a: ReactNode; extra?: ReactNode };

/** Kilau accordion: 56px header, 20px chevron rotating 180°, hairline dividers, 12px radius. */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="divide-y divide-border overflow-hidden rounded-[12px] border border-border bg-background shadow-1">
      {items.map((item, i) => {
        const isOpen = open === i;
        const hid = `${base}-h${i}`;
        const pid = `${base}-p${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={hid}
                type="button"
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center gap-4 px-4 py-3 text-left text-body font-semibold text-text-1 transition-colors duration-[120ms] hover:bg-surface-1 focus-visible:rounded-none md:px-5"
              >
                <span className="flex-1">{item.q}</span>
                {item.extra}
                <i
                  aria-hidden
                  className={`ri-arrow-down-s-line text-[20px] text-text-3 transition-transform duration-[220ms] ease-kilau ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={pid}
              role="region"
              aria-labelledby={hid}
              className={`grid transition-[grid-template-rows] duration-[220ms] ease-kilau ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-body text-text-2 md:px-5">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
