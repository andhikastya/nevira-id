import Link from "next/link";
import { PERAN } from "@/content/copy";
import { Card, Panel } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Container, Section } from "./Section";

/** "Bukan cuma kasir": camera swings north to the self-service laundromat and the shop-door attendance terminal. */
export function Peran() {
  return (
    <Section station="peran" aria-labelledby="peran-title" className="flex min-h-[120svh] flex-col justify-center py-24">
      <Container>
        <Panel className="max-w-[560px] p-6 md:p-8">
          <SectionHeading id="peran-title" eyebrow={PERAN.eyebrow} title={PERAN.title} body={PERAN.body} />
          <ul className="mt-6 space-y-2">
            {PERAN.roles.map((r) => (
              <li key={r.name}>
                <Link href={r.href} className="group block">
                  <Card className="flex items-center gap-4 p-4 transition-shadow group-hover:shadow-2">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-accent-subtle text-accent">
                      <i className={`${r.icon} text-[20px]`} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-h6 text-text-1">{r.name}</span>
                      <span className="block text-body-sm text-text-2">{r.body}</span>
                    </span>
                    <i className="ri-arrow-right-line text-[20px] text-text-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </Container>
    </Section>
  );
}
