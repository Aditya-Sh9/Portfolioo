import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import { CORE_FOUNDATIONS, SKILL_GROUPS } from "@/data/skills";
import { SECTION_IDS } from "@/lib/constants";

/** Grouped spec sheets. Deliberately no bars, levels, ratings or percentages. */
export default function HowIBuild() {
  return (
    <Section id={SECTION_IDS.build} index="06" title="How I Build">
      <Reveal as="ul" stagger={0.1} className="mt-10 grid gap-6 md:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => (
          <li key={group.id}>
            <article className="h-full border-2 border-steel bg-charcoal p-6 transition-colors duration-150 hover:border-interactive md:p-8">
              <p className="text-xs font-bold tracking-widest text-silver uppercase">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> /{" "}
                {String(SKILL_GROUPS.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-6xl leading-[0.85] tracking-wide">
                {group.title}
              </h3>
              <div aria-hidden className="mt-5 h-2 w-16 bg-accent" />
              <ul className="mt-8 grid grid-cols-2 gap-x-6">
                {group.items.map((item) => (
                  <li key={item} className="border-t border-steel py-3 font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </Reveal>

      <Reveal className="mt-6">
        <div className="border-2 border-steel bg-ink p-6 md:flex md:items-baseline md:gap-10 md:p-8">
          <h3 className="text-xs font-bold tracking-widest text-silver uppercase">
            <span className="text-accent">Core</span> / Foundations
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 md:mt-0">
            {CORE_FOUNDATIONS.map((item) => (
              <li key={item} className="flex items-center gap-3 font-medium">
                <span aria-hidden className="h-2 w-2 bg-hero-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
