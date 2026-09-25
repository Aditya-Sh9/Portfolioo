import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import ExternalLink from "@/components/ui/ExternalLink";
import FactList from "@/components/ui/FactList";
import TagList from "@/components/ui/TagList";
import { EXPERIENCE } from "@/data/experience";
import { SECTION_IDS } from "@/lib/constants";

/** Concise, visually strong: an organization panel beside what was built and fixed. */
export default function Experience() {
  return (
    <Section id={SECTION_IDS.experience} index="05" title="Experience">
      <ol className="mt-10 grid gap-10">
        {EXPERIENCE.map((entry) => (
          <li key={entry.id}>
            <Reveal>
              <article className="panel-cut grid border-2 border-steel bg-charcoal transition-colors duration-150 hover:border-interactive lg:grid-cols-12">
                <div className="@container relative isolate flex flex-col overflow-hidden border-b-2 border-steel bg-ink p-6 md:p-8 lg:col-span-5 lg:border-r-2 lg:border-b-0">
                  <div
                    aria-hidden
                    className="texture-halftone absolute inset-0 -z-10 opacity-60"
                  />
                  <p className="text-xs font-bold tracking-widest text-silver uppercase">
                    {entry.period}
                  </p>
                  {/* Sized from the panel's own width so the name can never clip. */}
                  <h3 className="mt-4 font-display text-[length:clamp(3rem,21cqw,6rem)] leading-[0.85] tracking-wide">
                    {entry.organization}
                  </h3>
                  <div aria-hidden className="mt-5 h-2 w-16 bg-accent" />
                  <p className="mt-4 text-lg font-bold">{entry.role}</p>
                  {entry.organizationNote && (
                    <p className="mt-1 text-sm text-silver">{entry.organizationNote}</p>
                  )}
                </div>

                <div className="p-6 md:p-8 lg:col-span-7">
                  <FactList facts={entry.facts} />

                  {/* The entry lands as one unit; its highlights then follow in order. */}
                  <Reveal
                    as="ol"
                    stagger={0.1}
                    y={12}
                    delay={0.15}
                    className="mt-8 grid gap-5"
                  >
                    {entry.highlights.map((highlight, i) => (
                      <li key={highlight} className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-1 text-xs font-bold tracking-widest text-bone"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-xl leading-relaxed text-silver">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </Reveal>

                  <div className="mt-8">
                    <TagList items={entry.stack} label="Tech stack" />
                  </div>

                  {entry.certificateUrl && (
                    <div className="mt-8">
                      <ExternalLink
                        href={entry.certificateUrl}
                        context={entry.organization}
                      >
                        Certificate
                      </ExternalLink>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
