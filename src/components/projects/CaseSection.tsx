import type { ReactNode } from "react";
import Reveal from "@/animations/gsap/Reveal";

type CaseSectionProps = {
  /** "01", "02"... written in the MDX; unique within a page. Also the anchor: `#case-<index>`. */
  index: string;
  title: string;
  /** "split" (default): title left, body right. "wide": title on top, body across the full width (screenshots, card grids). */
  layout?: "split" | "wide";
  children: ReactNode;
};

const TAB =
  "inline-flex h-7 items-center gap-2 border-2 border-bone bg-ink px-3 text-xs font-bold tracking-widest text-silver uppercase shadow-[3px_3px_0_0_var(--color-steel)]";

/**
 * One numbered block of a case study. Its top rule carries a caption tab like the home page's
 * sections. In the split layout the title column stays in view while its body scrolls (lg+).
 */
export default function CaseSection({
  index,
  title,
  layout = "split",
  children,
}: CaseSectionProps) {
  const headingId = `case-${index}`;
  const wide = layout === "wide";

  const heading = (
    <>
      <h2
        id={headingId}
        className="font-display text-4xl leading-[0.95] tracking-wide text-balance md:text-5xl"
      >
        {title}
      </h2>
      <div aria-hidden className="mt-4 h-1 w-12 bg-accent" />
    </>
  );

  return (
    <section
      aria-labelledby={headingId}
      className="relative border-t-2 border-steel pt-16 pb-14 first:border-t-0 md:pt-20 md:pb-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-px">
        <div className="mx-auto flex w-full max-w-6xl -translate-y-1/2 items-center justify-between px-4">
          <p className={TAB}>
            Part <span className="text-bone">{index}</span>
          </p>
          <span className="flex items-center gap-3 bg-ink pl-3 text-silver/40">
            <span className="hatch h-2.5 w-7" />
            <span className="reg-mark" />
          </span>
        </div>
      </div>

      {wide ? (
        <div className="mx-auto w-full max-w-6xl px-4">
          <Reveal>{heading}</Reveal>
          <div className="mt-10 space-y-10 md:mt-14 md:space-y-16">{children}</div>
        </div>
      ) : (
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            {heading}
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 lg:col-span-8">
            {children}
          </Reveal>
        </div>
      )}
    </section>
  );
}
