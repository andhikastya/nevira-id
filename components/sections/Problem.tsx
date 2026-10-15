import { PROBLEM } from "@/content/copy";
import { Panel } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Container, Section } from "./Section";

export function Problem() {
  return (
    <Section station="problem" id="masalah" aria-labelledby="problem-title" className="flex min-h-[130svh] items-center">
      <Container>
        <Panel className="max-w-[520px] p-6 md:p-8">
          <SectionHeading id="problem-title" eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} />
          <ul className="mt-8 space-y-3">
            {PROBLEM.items.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-[12px] border border-border bg-surface-1 p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-error-bg text-error">
                  <i className={`${item.icon} text-[20px]`} aria-hidden />
                </span>
                <div>
                  <h3 className="text-h6">{item.title}</h3>
                  <p className="mt-1 text-body-sm text-text-2">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </Container>
    </Section>
  );
}
