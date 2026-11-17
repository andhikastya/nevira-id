import { CONNECTED } from "@/content/copy";
import { Card, Panel } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Container, Section } from "./Section";

export function Connected() {
  return (
    <Section station="connected" aria-labelledby="connected-title" className="flex min-h-[130svh] flex-col justify-between py-24">
      <Container>
        <Panel className="mx-auto max-w-[680px] p-6 md:p-8">
          <SectionHeading id="connected-title" eyebrow={CONNECTED.eyebrow} title={CONNECTED.title} body={CONNECTED.body} align="center" />
        </Panel>
      </Container>
      <Container className="mt-16">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONNECTED.modules.map((m) => (
            <li key={m.name}>
              <Card className="h-full bg-background/95 p-5">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-accent-subtle text-accent">
                  <i className={`${m.icon} text-[20px]`} aria-hidden />
                </span>
                <h3 className="mt-4 text-h6">{m.name}</h3>
                <p className="mt-1 text-body-sm text-text-2">{m.body}</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-[16px] border border-border bg-background/95 p-5 md:p-6">
          <h3 className="text-h6">{CONNECTED.moreTitle}</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONNECTED.more.map((m) => (
              <li key={m.name} className="flex min-w-0 gap-3">
                <i className={`${m.icon} mt-0.5 text-[18px] leading-none text-accent`} aria-hidden />
                <div className="min-w-0">
                  <p className="text-body-sm font-semibold text-text-1">{m.name}</p>
                  <p className="text-body-sm text-text-2">{m.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
