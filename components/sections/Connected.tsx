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
              <Card className="h-full bg-background/90 p-5 backdrop-blur-md">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-accent-subtle text-accent">
                  <i className={`${m.icon} text-[20px]`} aria-hidden />
                </span>
                <h3 className="mt-4 text-h6">{m.name}</h3>
                <p className="mt-1 text-body-sm text-text-2">{m.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
