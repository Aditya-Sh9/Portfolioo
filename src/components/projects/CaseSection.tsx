import type { ReactNode } from "react";
import Reveal from "@/animations/gsap/Reveal";

type CaseSectionProps = {
  /** "01", "02"... written in the MDX; unique within a page. */
  index: string;
  title: string;
  children: ReactNode;
};

/** One numbered block of a case study: the title on the left, the body on the right. */
export default function CaseSection({ index, title, children }: CaseSectionProps) {
  const headingId = `case-${index}`;

  return (
    <section
      aria-labelledby={headingId}
      className="border-t-2 border-steel py-14 first:border-t-0 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="text-xs font-bold tracking-widest text-silver uppercase">
            <span className="text-bone">{index}</span>
          </p>
          <h2
            id={headingId}
            className="mt-3 font-display text-4xl leading-[0.95] tracking-wide text-balance md:text-5xl"
          >
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 lg:col-span-8">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
