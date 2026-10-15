"use client";

import type { ChangeEvent } from "react";

/** Kilau slider: 4px track (surface3 / accent fill), 20px white thumb with border + level-1 shadow. */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  id,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label: string;
  id: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      id={id}
      type="range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
      className="kilau-slider w-full"
      style={{ ["--pct" as string]: `${pct}%` }}
    />
  );
}
