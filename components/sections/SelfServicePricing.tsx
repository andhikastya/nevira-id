"use client";

import { useState } from "react";
import { SELF_SERVICE_PRICING as P } from "@/content/pages";
import { ButtonLink } from "../ui/Button";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";

const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

function Stepper({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <label htmlFor={id} className="text-body text-text-1">
        {label}
      </label>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Kurangi ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex size-9 items-center justify-center rounded-[8px] border border-border-visible text-text-2 hover:bg-surface-1"
        >
          <i className="ri-subtract-line" aria-hidden />
        </button>
        <output id={id} className="w-10 text-center text-body font-semibold text-text-1" aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          aria-label={`Tambah ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(99, value + 1))}
          className="flex size-9 items-center justify-center rounded-[8px] border border-border-visible text-text-2 hover:bg-surface-1"
        >
          <i className="ri-add-line" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/** Self-service subscription price cards + a monthly bill estimator. Used on /harga and /fitur/self-service. */
export function SelfServicePricing({ headingId = "ss-pricing-title" }: { headingId?: string }) {
  const [stack, setStack] = useState(2);
  const [machine, setMachine] = useState(1);
  const [stackItem, machineItem] = P.items;
  const total = stack * stackItem.price + machine * machineItem.price;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <div>
        <SectionHeading id={headingId} eyebrow={P.eyebrow} title={P.title} body={P.body} />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {P.items.map((it) => (
            <li key={it.key}>
              <Card className="flex h-full flex-col p-5">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-accent-subtle text-accent">
                  <i className={`${it.icon} text-[20px]`} aria-hidden />
                </span>
                <p className="mt-4 text-body-sm font-semibold text-text-3">{it.label}</p>
                <p className="mt-1 text-[32px] leading-[1.05] font-bold tracking-[-0.02em] text-text-1">{rupiah(it.price)}</p>
                <p className="text-body-sm text-text-3">per {P.period}</p>
                <p className="mt-3 border-t border-border pt-3 text-body-sm text-text-2">{it.note}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      <Card className="flex flex-col p-6 md:p-8">
        <h3 className="text-h5">{P.calculator.title}</h3>
        <div className="mt-3 divide-y divide-border border-y border-border">
          <Stepper id="ss-stack" label={P.calculator.stackLabel} value={stack} onChange={setStack} />
          <Stepper id="ss-machine" label={P.calculator.machineLabel} value={machine} onChange={setMachine} />
        </div>
        <div className="mt-5 rounded-[12px] bg-accent-subtle p-5">
          <p className="text-body-sm text-accent">{P.calculator.totalLabel}</p>
          <p className="mt-1 text-[40px] leading-[1.05] font-bold tracking-[-0.02em] text-accent-dark" aria-live="polite">
            {rupiah(total)}
          </p>
          <p className="mt-1 text-body-sm text-text-2">
            {stack} stack × {rupiah(stackItem.price)} + {machine} mesin × {rupiah(machineItem.price)}
          </p>
        </div>
        <ButtonLink href="/kontak" size="md" className="mt-5 w-full" trailingIcon="ri-arrow-right-line">
          Hubungi tim
        </ButtonLink>
      </Card>
    </div>
  );
}
