import type { ReactNode } from "react";

type Tone = "neutral" | "primary" | "reward" | "info";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-1 text-text-1",
  primary: "bg-accent-subtle text-accent",
  reward: "bg-reward-bg text-reward-deep",
  info: "bg-info-bg text-[#008DB8]",
};

export function Badge({ tone = "primary", icon, children, className = "" }: { tone?: Tone; icon?: string; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[14px] font-medium ${tones[tone]} ${className}`}>
      {icon && <i className={`${icon} text-[16px] leading-none`} aria-hidden />}
      {children}
    </span>
  );
}
