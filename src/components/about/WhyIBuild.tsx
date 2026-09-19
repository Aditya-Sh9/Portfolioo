import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import { SECTION_IDS, WHY_COPY } from "@/lib/constants";

/** Short and reflective: the body in calm type, the closing line as the one loud moment. */
export default function WhyIBuild() {
  return (
    <Section id={SECTION_IDS.why} index="08" title="Why I Build">
      {/* The quietest reveal on the page: one block, a shorter lift, a slower ease in. */}
      <Reveal
        y={12}
        duration={1.1}
        className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16"
      >
        <div className="max-w-2xl space-y-6 text-xl leading-relaxed text-silver md:text-2xl lg:col-span-7">
          {WHY_COPY.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="lg:col-span-5">
          <div aria-hidden className="mb-6 h-2 w-24 bg-accent" />
          <p className="font-display text-5xl leading-[0.95] tracking-wide text-balance md:text-6xl">
            {WHY_COPY.closing}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
