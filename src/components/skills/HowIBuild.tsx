import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import TechRail from "@/components/skills/TechRail";
import SpotlightCard from "@/components/ui/spotlight-card";
import TechLogo from "@/components/ui/TechLogo";
import { PROJECTS } from "@/data/projects";
import { CORE_FOUNDATIONS, SKILL_GROUPS } from "@/data/skills";
import { techFor } from "@/data/tech";
import { SECTION_IDS } from "@/lib/constants";

/** Names of the projects whose stack lists this technology exactly, e.g. "SOLACE · Pulse". */
function usedIn(name: string) {
  return PROJECTS.filter((project) => project.stack.includes(name))
    .map((project) => project.title)
    .join(" · ");
}

/**
 * A logo rail, then the same technologies grouped into cards, then the concepts underneath
 * them. Deliberately no bars, levels, ratings or percentages. A tile also says which of the
 * projects use it (from the projects' own stacks), so the section reads as "what I built
 * with", not "what I have heard of".
 */
export default function HowIBuild() {
  return (
    <Section id={SECTION_IDS.build} index="06" title="How I Build">
      <TechRail />

      <Reveal as="ul" stagger={0.1} className="mt-6 grid gap-6 md:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => (
          <li key={group.id} className="group">
            {/* Red for interaction only; the spotlight's core is bone, not gold. */}
            <SpotlightCard
              as="article"
              data-accent="red"
              data-highlight="bone"
              className="h-full border-2 border-steel bg-charcoal p-6 transition-transform duration-150 group-hover:-translate-y-1 md:p-8"
            >
              <p className="text-xs font-bold tracking-widest text-silver uppercase">
                <span className="text-bone">{String(i + 1).padStart(2, "0")}</span> /{" "}
                {String(SKILL_GROUPS.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-6xl leading-[0.85] tracking-wide text-balance">
                {group.title}
              </h3>
              <div aria-hidden className="mt-5 h-2 w-16 bg-accent" />
              <ul
                aria-label={`${group.title} technologies`}
                className="mt-8 grid gap-2 lg:grid-cols-2"
              >
                {group.items.map((item) => (
                  <TechTile key={item} name={item} />
                ))}
              </ul>
            </SpotlightCard>
          </li>
        ))}
      </Reveal>

      <Reveal className="mt-6">
        <div className="border-2 border-steel bg-ink p-6 md:flex md:items-baseline md:gap-10 md:p-8">
          <h3 className="text-xs font-bold tracking-widest text-silver uppercase">
            <span className="text-bone">Core</span> / Foundations
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 md:mt-0">
            {CORE_FOUNDATIONS.map((item) => (
              <li key={item} className="flex items-center gap-3 font-medium">
                <span aria-hidden className="h-2 w-2 bg-silver" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

/** Logo + name (always visible, so nothing depends on hover) + the projects that use it. */
function TechTile({ name }: { name: string }) {
  const tech = techFor(name);
  const projects = usedIn(name);

  return (
    <li className="flex items-center gap-3 border border-steel bg-ink px-3 py-2.5 text-silver transition-colors duration-150 hover:border-accent hover:text-bone">
      {tech && <TechLogo icons={tech.icons} className="size-6" />}
      <span className="min-w-0">
        <span className="block text-sm font-medium text-bone">{name}</span>
        {projects && <span className="block text-xs text-silver">{projects}</span>}
      </span>
    </li>
  );
}
