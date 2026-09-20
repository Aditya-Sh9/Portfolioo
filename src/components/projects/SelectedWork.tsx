import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import ProjectLinks from "@/components/projects/ProjectLinks";
import FactList from "@/components/ui/FactList";
import SpotlightCard from "@/components/ui/spotlight-card";
import TagList from "@/components/ui/TagList";
import { PROJECTS } from "@/data/projects";
import { SECTION_IDS } from "@/lib/constants";

/** What each project is and why it matters; technical depth lives in the case studies. */
export default function SelectedWork() {
  return (
    <Section id={SECTION_IDS.work} index="04" title="Selected Work">
      <ol className="mt-10 grid gap-10">
        {PROJECTS.map((project, i) => {
          // Alternate the title panel's side. DOM order stays title-first for readers.
          const flipped = i % 2 === 1;

          return (
            <li key={project.slug}>
              <Reveal>
                {/*
                Attachment points for the spider-web transition (built later): the card is
                addressable by `id` / `data-project`, and `data-web-anchor` marks the title
                panel, the stable edge the web will attach to. No behaviour is wired yet.
              */}
                <SpotlightCard
                  as="article"
                  id={`project-${project.slug}`}
                  data-project={project.slug}
                  data-accent={project.accent}
                  data-highlight={project.highlight}
                  className="grid border-2 border-steel bg-charcoal md:grid-cols-12"
                >
                  <div
                    data-web-anchor
                    className={`panel-tint @container relative isolate flex flex-col overflow-hidden border-b-2 border-steel bg-ink p-6 md:col-span-5 md:border-b-0 md:p-8 lg:col-span-4 ${flipped ? "md:order-last md:border-l-2" : "md:border-r-2"}`}
                  >
                    <div
                      aria-hidden
                      className="texture-halftone absolute inset-0 -z-10 opacity-60"
                    />
                    <p className="text-xs font-bold tracking-widest text-silver uppercase">
                      <span className="text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>{" "}
                      / {String(PROJECTS.length).padStart(2, "0")}
                    </p>
                    {/* Sized from the panel's own width so the title can never clip. */}
                    <h3 className="mt-4 font-display text-6xl leading-[0.85] tracking-wide md:text-[length:clamp(3.75rem,38cqw,6rem)]">
                      {project.title}
                    </h3>
                    <div aria-hidden className="mt-5 h-2 w-16 bg-accent" />
                    <p className="mt-4 text-xs font-bold tracking-widest text-silver uppercase">
                      {project.category}
                    </p>
                    <div className="mt-auto pt-8">
                      <p className="flex items-center gap-3 text-xs font-bold tracking-widest text-bone uppercase">
                        <span aria-hidden className="h-2 w-2 bg-highlight" />
                        {project.status}
                      </p>
                      <p className="mt-2 text-xs tracking-widest text-silver uppercase">
                        {project.period}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:col-span-7 md:p-8 lg:col-span-8">
                    <p className="max-w-xl leading-relaxed text-silver">
                      {project.description}
                    </p>
                    <div className="mt-8">
                      <FactList facts={project.facts} variant="project" />
                    </div>
                    <div className="mt-6">
                      <TagList items={project.stack} label="Tech stack" />
                    </div>
                    <div className="mt-8">
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
