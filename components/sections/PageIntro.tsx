import Link from "next/link";
import type { ReactNode } from "react";
import { Panel } from "../ui/Card";
import { Container, Section } from "./Section";

/** Opening section of a secondary page: frosted panel with breadcrumb + h1 over a camera station. */
export function PageIntro({
  station,
  crumb,
  title,
  body,
  children,
}: {
  station: string;
  crumb: string;
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <Section station={station} aria-labelledby="page-title" className="flex min-h-[70svh] items-end pt-28 pb-12">
      <Container>
        <Panel className="max-w-[640px] p-6 md:p-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-body-sm text-text-3">
            <Link href="/" className="hover:text-accent">
              Beranda
            </Link>
            <span aria-hidden> / </span>
            <span aria-current="page" className="text-text-2">
              {crumb}
            </span>
          </nav>
          <h1 id="page-title" className="text-[36px] leading-[1.05] tracking-[-0.025em] text-balance md:text-[48px]">
            {title}
          </h1>
          {body && <p className="mt-4 text-body-lg text-text-2 text-pretty">{body}</p>}
          {children}
        </Panel>
      </Container>
    </Section>
  );
}
