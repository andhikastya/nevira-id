import Link from "next/link";
import { FOOTER } from "@/content/copy";
import { FEATURES, featureHref } from "@/content/features";
import { Logo } from "../Logo";
import { Container } from "./Section";

const linkClass = "text-body-sm text-text-2 transition-colors hover:text-accent";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={linkClass}>
      {label}
    </a>
  );
}

export function Footer() {
  const columns = [
    { title: "Fitur", links: FEATURES.map((f) => ({ label: f.name, href: featureHref(f.slug) })) },
    ...FOOTER.columns,
  ];
  return (
    <footer className="relative border-t border-border bg-background">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-[280px] text-body-sm text-text-3">{FOOTER.tagline}</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-label font-semibold text-text-1">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="border-t border-border py-6">
        <p className="text-caption text-text-3">{FOOTER.legal}</p>
      </Container>
    </footer>
  );
}
