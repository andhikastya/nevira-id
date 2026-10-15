import type { ReactNode } from "react";
import { Badge } from "./Badge";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4">
      <Badge tone="primary">{children}</Badge>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[640px] text-center" : "max-w-[560px]"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-heading md:text-display text-balance">
        {title}
      </h2>
      {body && <p className="dusk-sub mt-4 text-body-lg text-text-2 text-pretty">{body}</p>}
    </div>
  );
}
