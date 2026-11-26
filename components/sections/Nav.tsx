"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LINKS, NAV } from "@/content/copy";
import { NAVIGATE_EVENT } from "@/lib/events";
import { FEATURE_GROUPS, FEATURES, featureHref, type FeatureGroup } from "@/content/features";
import { Logo } from "../Logo";
import { ButtonLink } from "../ui/Button";

const GROUPS = Object.keys(FEATURE_GROUPS) as FeatureGroup[];

function isActive(pathname: string, href: string) {
  if (href === "/" || href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything after navigating (adjust state during render, not in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
    setMenu(false);
  }

  // 3D map pins live outside the React tree (drei <Html>), so they ask for navigation by event.
  useEffect(() => {
    const go = (e: Event) => router.push((e as CustomEvent<string>).detail);
    window.addEventListener(NAVIGATE_EVENT, go);
    return () => window.removeEventListener(NAVIGATE_EVENT, go);
  }, [router]);

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

  // Desktop feature dropdown: close on Escape or a click outside.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  const solid = scrolled || open || menu;
  const itemClass = (active: boolean) =>
    `flex items-center gap-1 rounded-[10px] px-3 py-2 text-body-sm font-medium transition-colors hover:text-text-1 ${
      active ? "text-text-1" : "text-text-2"
    }`;

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
          open || menu
            ? "border-b border-border bg-background"
            : solid
              ? "border-b border-border bg-background/90 backdrop-blur-md"
              : "border-b border-transparent"
        }`}
      >
        <nav aria-label="Utama" className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-6">
          <Link href="/" aria-label="Nevira, ke beranda">
            <Logo />
          </Link>
          <ul className="ml-4 hidden items-center gap-1 md:flex">
            {NAV.map((item) =>
              item.menu === "fitur" ? (
                <li key={item.href} ref={menuRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={menu}
                    aria-controls="fitur-menu"
                    onClick={() => setMenu((v) => !v)}
                    className={`cursor-pointer ${itemClass(isActive(pathname, item.href))}`}
                  >
                    {item.label}
                    <i
                      className={`ri-arrow-down-s-line text-[18px] leading-none transition-transform duration-[220ms] ${menu ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id="fitur-menu"
                    hidden={!menu}
                    className="fixed top-[72px] left-1/2 w-[min(640px,calc(100vw-48px))] -translate-x-1/2 rounded-[16px] border border-border bg-background p-4 shadow-3"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {GROUPS.map((g) => (
                        <div key={g} className={g === "outlet" ? "row-span-2" : ""}>
                          <p className="px-3 pt-2 pb-1 text-caption font-semibold tracking-wide text-text-3 uppercase">{FEATURE_GROUPS[g]}</p>
                          <ul>
                            {FEATURES.filter((f) => f.group === g).map((f) => (
                              <li key={f.slug}>
                                <Link
                                  href={featureHref(f.slug)}
                                  className="flex gap-3 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-surface-1"
                                >
                                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-subtle text-accent">
                                    <i className={`${f.icon} text-[18px]`} aria-hidden />
                                  </span>
                                  <span>
                                    <span className="block text-body-sm font-semibold text-text-1">{f.navName ?? f.name}</span>
                                    <span className="block text-caption text-text-3">{f.summary}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/fitur"
                      className="mt-3 flex items-center justify-between rounded-[10px] bg-surface-1 px-3 py-2.5 text-body-sm font-semibold text-text-1 transition-colors hover:bg-surface-2"
                    >
                      Lihat semua fitur
                      <i className="ri-arrow-right-line text-[18px]" aria-hidden />
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={itemClass(isActive(pathname, item.href))}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
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
          <div className="min-h-0 max-h-[calc(100svh-64px)] overflow-y-auto">
            <ul className="space-y-1 px-4 pt-2 pb-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center justify-between rounded-[10px] px-3 text-body font-medium text-text-1 transition-colors hover:bg-surface-1"
                  >
                    {item.label}
                    <i className="ri-arrow-right-s-line text-[20px] text-text-3" aria-hidden />
                  </Link>
                  {item.menu === "fitur" && (
                    <ul className="mb-1 ml-3 border-l border-border pl-2">
                      {FEATURES.map((f) => (
                        <li key={f.slug}>
                          <Link
                            href={featureHref(f.slug)}
                            tabIndex={open ? 0 : -1}
                            onClick={() => setOpen(false)}
                            className="flex h-10 items-center gap-2 rounded-[10px] px-3 text-body-sm text-text-2 transition-colors hover:bg-surface-1"
                          >
                            <i className={`${f.icon} text-[16px] text-accent`} aria-hidden />
                            {f.navName ?? f.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
