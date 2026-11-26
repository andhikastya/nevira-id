import { LINKS } from "@/content/copy";

/** Floating "Hubungi Kami" button to the WhatsApp hotline, on every page (bottom-right). */
export function WhatsAppFab() {
  return (
    <a
      href={LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="group fixed right-4 bottom-4 z-[35] flex items-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#8F6AD6_0%,#5B369E_55%,#2B194D_100%)] py-2 pr-5 pl-2 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(43,25,77,0.65)] ring-1 ring-white/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(43,25,77,0.75)] md:right-6 md:bottom-6"
    >
      <span className="relative flex size-10 items-center justify-center rounded-full bg-white/15">
        <span aria-hidden className="absolute inset-0 rounded-full bg-white/25 motion-safe:animate-ping [animation-duration:2.4s]" />
        <i className="ri-whatsapp-line relative text-[22px] leading-none" aria-hidden />
      </span>
      <span className="text-body-sm md:text-body">Hubungi Kami</span>
    </a>
  );
}
