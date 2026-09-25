import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/animations/gsap/Reveal";
import WebLink from "@/animations/web/WebLink";
import SpotlightCard from "@/components/ui/spotlight-card";
import type { Project } from "@/data/projects";

/**
 * Previous / next case study, wrapping around so there are always two destinations. Each
 * panel carries its destination's own accent (`data-accent`), so the next project's identity
 * is visible before you go. The panels are the web transition's anchors (`data-web-anchor`):
 * the web attaches to the clicked one and pulls it away toward the way you are going.
 */
export default function CaseStudyPager({
  projects,
  index,
}: {
  /** Only projects that have a case-study page. */
  projects: readonly Project[];
  index: number;
}) {
  const count = projects.length;
  const previous = projects[(index - 1 + count) % count];
  const next = projects[(index + 1) % count];

  return (
    <nav
      aria-label="More case studies"
      className="border-t-2 border-steel py-14 md:py-20"
    >
      <Reveal className="mx-auto grid w-full max-w-6xl gap-6 px-4 md:grid-cols-2">
        <PagerLink project={previous} direction="previous" />
        <PagerLink project={next} direction="next" />
      </Reveal>
    </nav>
  );
}

function PagerLink({
  project,
  direction,
}: {
  project: Project;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  return (
    <SpotlightCard
      data-web-anchor
      data-accent={project.accent}
      data-highlight={project.highlight}
      className="panel-tint border-2 border-steel bg-ink"
    >
      {/* The link fills the card; its focus ring sits just inside the border so nothing clips it. */}
      <WebLink
        href={`/projects/${project.slug}`}
        direction={direction}
        className={`flex h-full flex-col gap-6 p-6 -outline-offset-2 md:p-8 ${isNext ? "md:text-right" : ""}`}
      >
        <span
          className={`flex items-center gap-3 text-xs font-bold tracking-widest text-silver uppercase ${isNext ? "md:flex-row-reverse" : ""}`}
        >
          {isNext ? (
            <ArrowRight aria-hidden size={16} className="text-interactive" />
          ) : (
            <ArrowLeft aria-hidden size={16} className="text-interactive" />
          )}
          {isNext ? "Next case study" : "Previous case study"}
        </span>
        <span className="font-display text-6xl leading-[0.85] tracking-wide md:text-8xl">
          {project.title}
        </span>
        <span className="text-xs font-bold tracking-widest text-silver uppercase">
          {project.category}
        </span>
      </WebLink>
    </SpotlightCard>
  );
}
