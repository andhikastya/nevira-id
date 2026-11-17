import Link from "next/link";
import { LEGAL, type LegalDoc } from "@/content/legal";
import { Container, Section } from "./Section";

const anchor = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Long-form legal text: no 3D, sticky table of contents, tabs between the two documents. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="bg-background">
      <Section station="quiet" data-opaque aria-labelledby="legal-title" className="bg-surface-1 pt-32 pb-12">
        <Container>
          <nav aria-label="Breadcrumb" className="text-body-sm text-text-3">
            <Link href="/" className="hover:text-accent">
              Beranda
            </Link>
            <span aria-hidden> / </span>
            <span>Legal</span>
            <span aria-hidden> / </span>
            <span aria-current="page" className="text-text-2">
              {doc.title}
            </span>
          </nav>
          <h1 id="legal-title" className="mt-4 text-[36px] leading-[1.05] tracking-[-0.025em] md:text-[48px]">
            {doc.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Dokumen legal">
            {LEGAL.map((d) => (
              <Link
                key={d.slug}
                href={`/legal/${d.slug}`}
                role="tab"
                aria-selected={d.slug === doc.slug}
                className={`flex h-9 items-center rounded-full px-4 text-body-sm font-semibold transition-colors ${
                  d.slug === doc.slug ? "bg-accent text-white" : "border border-border-visible bg-background text-text-2 hover:bg-surface-2"
                }`}
              >
                {d.title}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section station="quiet" data-opaque aria-label={doc.title} className="bg-background py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <nav aria-label="Daftar isi" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[12px] bg-surface-1 p-5">
              <p className="text-caption font-semibold tracking-wide text-text-3 uppercase">Daftar isi</p>
              <ol className="mt-3 space-y-2">
                {doc.sections.map((s) => (
                  <li key={s.title}>
                    <a href={`#${anchor(s.title)}`} className="text-body-sm text-text-2 hover:text-accent">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <article className="max-w-[720px]">
            {doc.intro.map((p) => (
              <p key={p} className="text-body-lg text-text-2">
                {p}
              </p>
            ))}
            {doc.sections.map((s) => (
              <section key={s.title} id={anchor(s.title)} className="mt-10 scroll-mt-24">
                <h2 className="text-h5">{s.title}</h2>
                {s.body.length > 1 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-body text-text-2 marker:text-text-4">
                    {s.body.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  s.body.map((b) => (
                    <p key={b} className="mt-3 text-body text-text-2">
                      {b}
                    </p>
                  ))
                )}
              </section>
            ))}
          </article>
        </Container>
      </Section>
    </main>
  );
}
