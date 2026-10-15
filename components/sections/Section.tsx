import type { ComponentPropsWithRef, HTMLAttributes } from "react";

/**
 * A story section. `station` names the 3D camera station this section drives
 * (see components/three/stations.ts). Content floats over the fixed canvas.
 */
export function Section({
  station,
  className = "",
  ...rest
}: ComponentPropsWithRef<"section"> & { station: string }) {
  return <section data-station={station} {...rest} className={`relative ${className}`} />;
}

export function Container({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={`mx-auto w-full max-w-[1200px] px-6 ${className}`} />;
}
