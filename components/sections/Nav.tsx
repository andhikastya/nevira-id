"use client";

import { useEffect, useState } from "react";
import { LINKS, NAV } from "@/content/copy";
import { Logo } from "../Logo";
import { ButtonLink } from "../ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape, and if the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      {/* Tap outside to close — sits under the header so the menu panel stays pure white */}
      {open && (
        <button
          type="button"
          aria-label="Tutup menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[rgba(18,26,38,0.25)] md:hidden"
        />
      )}
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-[220ms] ${
        open ? "border-b border-border bg-background" : solid ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Utama" className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-6">
        <a href="#top" aria-label="Nevira, ke atas" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <ul className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-[10px] px-3 py-2 text-body-sm font-medium text-text-2 transition-colors hover:text-text-1"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <ButtonLink href={LINKS.login} variant="tertiary" size="sm" className="max-md:hidden">
            Masuk
          </ButtonLink>
          <ButtonLink href={LINKS.signup} variant="primary" size="sm">
            Coba Gratis
          </ButtonLink>
          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-[10px] text-text-1 transition-colors hover:bg-surface-1 md:hidden"
          >
            <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-[24px] leading-none`} aria-hidden />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[grid-template-rows,opacity] duration-[220ms] ease-kilau md:hidden ${
          open ? "grid grid-rows-[1fr] opacity-100" : "pointer-events-none grid grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="min-h-0">
          <ul className="space-y-1 px-4 pt-2 pb-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-between rounded-[10px] px-3 text-body font-medium text-text-1 transition-colors hover:bg-surface-1"
                >
                  {item.label}
                  <i className="ri-arrow-right-s-line text-[20px] text-text-3" aria-hidden />
                </a>
              </li>
            ))}
            <li className="pt-2">
              <ButtonLink href={LINKS.login} variant="secondary" size="md" className="w-full" tabIndex={open ? 0 : -1}>
                Masuk
              </ButtonLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
    </>
  );
}
