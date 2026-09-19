import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import ProjectLinks from "@/components/projects/ProjectLinks";
import FactList from "@/components/ui/FactList";
import TagList from "@/components/ui/TagList";
import { SOLACE } from "@/data/projects";
import { SECTION_IDS } from "@/lib/constants";

/** Feature panel for the primary active project (SOLACE), with its build roadmap. */
export default function CurrentlyBuilding() {
  const project = SOLACE;

  return (
    <Section id={SECTION_IDS.building} index="03" title="Currently Building">
      <Reveal className="mt-10">
        <article
          data-accent={project.accent}
          data-highlight={project.highlight}
          className="border-2 border-bone bg-charcoal shadow-brutal"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b-2 border-steel px-6 py-3 text-xs font-bold tracking-widest text-silver uppercase md:px-10">
            <p className="flex items-center gap-3">
              <span aria-hidden className="h-2 w-2 bg-highlight" />
              {project.status}
            </p>
            <p>{project.period}</p>
          </div>

          <div className="grid lg:grid-cols-12">
            <div className="p-6 md:p-10 lg:col-span-7">
              <h3 className="font-display text-7xl leading-[0.85] tracking-wide md:text-9xl">
                {project.title}
              </h3>
              <div aria-hidden className="mt-5 h-2 w-24 bg-accent" />
              <p className="mt-4 text-xs font-bold tracking-widest text-silver uppercase">
                {project.category}
              </p>

              <blockquote className="mt-8 max-w-xl border-l-2 border-accent pl-4 text-xl leading-snug text-bone md:text-2xl">
                <p>{project.tagline}</p>
              </blockquote>
              <p className="mt-6 max-w-xl leading-relaxed text-silver">
                {project.description}
              </p>

              <div className="mt-10 max-w-xl">
                <FactList facts={project.facts} />
              </div>
              <div className="mt-8 max-w-xl">
                <TagList items={project.stack} label="Tech stack" />
              </div>
              <div className="mt-10">
                <ProjectLinks project={project} />
              </div>
            </div>

            <div className="relative isolate overflow-hidden border-t-2 border-steel p-6 md:p-10 lg:col-span-5 lg:border-t-0 lg:border-l-2">
              <div
                aria-hidden
                className="texture-halftone absolute inset-0 -z-10 hidden opacity-60 lg:block"
              />
              <h4 className="text-xs font-bold tracking-widest text-silver uppercase">
                <span className="text-accent">Roadmap</span> / Phases 0–7
              </h4>
              <p className="mt-2 text-sm text-silver">
                Progress as recorded in the project README.
              </p>
              {/* Follows the panel: the phases ripple in a beat after it lands. */}
              <Reveal
                as="ol"
                stagger={0.07}
                y={12}
                delay={0.25}
                className="mt-6 grid gap-y-4"
              >
                {project.phases.map(({ number, name, done }) => (
                  <li key={number} className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className={`mt-1.5 h-3 w-3 shrink-0 border-2 ${done ? "border-accent bg-accent" : "border-steel"}`}
                    />
                    <p className={done ? "text-bone" : "text-silver"}>
                      <span className="font-bold">Phase {number}</span> — {name}
                      <span className="sr-only">
                        {done ? " (complete)" : " (not started)"}
                      </span>
                    </p>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
