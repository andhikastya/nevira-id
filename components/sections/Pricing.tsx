"use client";

import { useEffect, useMemo, useState } from "react";
import { LINKS, PRICING } from "@/content/copy";
import { useScene } from "@/lib/sceneStore";
import { ButtonLink } from "../ui/Button";
import { Panel } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Slider } from "../ui/Slider";
import { Toggle } from "../ui/Toggle";
import { Container, Section } from "./Section";

const [CORE, PRINT, WA, EXPORT] = PRICING.rates.map((r) => r.price);
const TX_MIN = 0;
const TX_MAX = 10000;
const COST_MAX = TX_MAX * (CORE + PRINT + WA) + 30 * EXPORT;

const rupiah = (n: number) => `Rp${Math.round(n).toLocaleString("id-ID")}`;

export function Pricing() {
  const c = PRICING.calculator;
  const [tx, setTx] = useState(900);
  const [print, setPrint] = useState(true);
  const [wa, setWa] = useState(true);
  const [exports, setExports] = useState(1);
  const setCoinLevel = useScene((s) => s.setCoinLevel);

  const total = useMemo(
    () => tx * CORE + (print ? tx * PRINT : 0) + (wa ? tx * WA : 0) + exports * EXPORT,
    [tx, print, wa, exports],
  );

  useEffect(() => {
    // sqrt so typical laundries still see a satisfying stack
    setCoinLevel(Math.min(1, Math.sqrt(total / COST_MAX)));
  }, [total, setCoinLevel]);

  return (
    <Section station="pricing" id="harga" aria-labelledby="pricing-title" className="flex min-h-[120svh] items-center py-24">
      <Container>
        <div className="max-w-[520px]">
          <Panel className="p-6 md:p-8">
            <SectionHeading id="pricing-title" eyebrow={PRICING.eyebrow} title={PRICING.title} body={PRICING.body} />
            <h3 className="mt-8 border-t border-border pt-6 text-h6">{c.title}</h3>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <label htmlFor="tx" className="text-label font-medium text-text-1">
                  {c.txLabel}
                </label>
                <span className="text-body font-semibold text-text-1">{tx.toLocaleString("id-ID")}</span>
              </div>
              <div className="mt-3">
                <Slider id="tx" label={c.txLabel} value={tx} min={TX_MIN} max={TX_MAX} step={50} onChange={setTx} />
              </div>
              <div className="mt-1 flex justify-between text-caption text-text-3">
                <span>{TX_MIN}</span>
                <span>{TX_MAX.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="mt-4 divide-y divide-border border-y border-border">
              <Toggle id="print" label={c.printLabel} checked={print} onChange={setPrint} />
              <Toggle id="wa" label={c.waLabel} checked={wa} onChange={setWa} />
              <div className="flex items-center justify-between gap-3 py-2">
                <span className="text-body-sm text-text-1">{c.exportLabel}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Kurangi ekspor"
                    onClick={() => setExports((v) => Math.max(0, v - 1))}
                    className="flex size-8 items-center justify-center rounded-[8px] border border-border-visible text-text-2 hover:bg-surface-1"
                  >
                    <i className="ri-subtract-line" aria-hidden />
                  </button>
                  <span className="w-8 text-center text-body font-semibold text-text-1" aria-live="polite">
                    {exports}
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah ekspor"
                    onClick={() => setExports((v) => Math.min(30, v + 1))}
                    className="flex size-8 items-center justify-center rounded-[8px] border border-border-visible text-text-2 hover:bg-surface-1"
                  >
                    <i className="ri-add-line" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            {/* The one gold moment on the page: the Saldo Koin value. */}
            <div className="mt-5 rounded-[12px] bg-reward-bg p-5">
              <p className="flex items-center gap-1.5 text-body-sm text-reward-deep">
                <i className="ri-coin-line text-[16px] text-reward" aria-hidden />
                {c.resultLabel}
              </p>
              <p className="mt-1 text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-reward-strong" aria-live="polite">
                {rupiah(total)}
              </p>
              <p className="mt-1 text-body-sm text-text-2">
                ≈ {rupiah(tx > 0 ? total / tx : 0)} {c.perTxLabel}
              </p>
            </div>
            <p className="mt-3 text-caption text-text-3">{c.note}</p>

            <ButtonLink href={LINKS.signup} size="md" className="mt-5 w-full" trailingIcon="ri-arrow-right-line">
              Coba Gratis
            </ButtonLink>
          </Panel>

          <ul className="mt-4 grid grid-cols-2 gap-2">
            {PRICING.rates.map((r) => (
              <li key={r.label} className="rounded-[10px] border border-border bg-background/95 p-3">
                <p className="flex items-center gap-1.5 text-caption text-text-3">
                  <i className={`${r.icon} text-[14px]`} aria-hidden />
                  {r.label}
                </p>
                <p className="mt-1 text-body font-semibold text-text-1">
                  {rupiah(r.price)} <span className="text-caption font-normal text-text-3">{r.unit}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
