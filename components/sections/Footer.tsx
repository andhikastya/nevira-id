import { FOOTER } from "@/content/copy";
import { Logo } from "../Logo";
import { Container } from "./Section";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[280px] text-body-sm text-text-3">{FOOTER.tagline}</p>
        </div>
        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-label font-semibold text-text-1">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-body-sm text-text-2 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
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
