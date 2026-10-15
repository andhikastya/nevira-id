import { SCREENS_READY } from "@/content/screens";

/**
 * Real app screenshot in a device frame. Until the user's screenshots land in
 * /public/screens (SCREENS_READY), renders a labelled stand-in.
 */
export function ScreenFrame({ src, label, icon, className = "" }: { src: string; label: string; icon: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-[12px] border border-border bg-surface-1 shadow-1 ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-border bg-background px-3" aria-hidden>
        <span className="size-2 rounded-full bg-surface-3" />
        <span className="size-2 rounded-full bg-surface-3" />
        <span className="size-2 rounded-full bg-surface-3" />
        <span className="ml-2 text-caption text-text-3">{label}</span>
      </div>
      {SCREENS_READY ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`Tampilan ${label}`} className="block aspect-[16/10] w-full object-cover object-top" loading="lazy" />
      ) : (
        <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 text-text-3">
          <i className={`${icon} text-[32px]`} aria-hidden />
          <figcaption className="text-body-sm">Tampilan {label}</figcaption>
        </div>
      )}
    </figure>
  );
}
