import type { HTMLAttributes } from "react";

/** Kilau standard card: surface + hairline border + level-1 shadow, 12px radius. */
export function Card({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={`rounded-[12px] border border-border bg-background shadow-1 ${className}`} />;
}

/** Frosted panel used for copy that floats over the 3D scene. */
export function Panel({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`rounded-[16px] border border-border bg-background/85 shadow-2 backdrop-blur-md ${className}`}
    />
  );
}
