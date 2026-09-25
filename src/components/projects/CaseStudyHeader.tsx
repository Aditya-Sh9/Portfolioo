import { ArrowDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProjectLinks from "@/components/projects/ProjectLinks";
import FactList from "@/components/ui/FactList";
import type { Project } from "@/data/projects";

export type CaseSectionLink = { index: string; title: string };

const LABEL = "text-xs font-bold tracking-widest text-silver uppercase";

/**
 * The top of a case study. Reuses the hero's CSS entrance (`data-hero`), so it is visible on
 * the first frame and never waits for hydration. The parent supplies `data-accent`.
 * `sections` (exported by the page's MDX) becomes the "On this page" index.
 */
export default function CaseStudyHeader({
  project,
  sections,
}: {
  project: Project;
  sections?: readonly CaseSectionLink[];
}) {
  const { title, category, tagline, description, status, period, facts, role, team } =
    project;
  const glance = [
    { label: "Role", value: role },
    { label: "Team", value: team },
    { label: "Timeline", value: period },
    { label: "Status", value: status },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <header className="panel-tint relative isolate border-b-2 border-steel pt-32 pb-14 md:pb-16">
      <div
        aria-hidden
        className="texture-halftone pointer-events-none absolute inset-0 -z-10 opacity-40"
      />
      <div className="mx-auto w-full max-w-6xl px-4">
        <Link
          href="/#work"
          data-hero="tag"
          className="inline-flex items-center gap-2 border-2 border-steel px-3 py-1.5 text-xs font-bold tracking-widest text-silver uppercase transition-colors duration-150 hover:border-interactive hover:text-bone pointer-coarse:min-h-11"
        >
          <ArrowLeft aria-hidden size={14} className="text-interactive" />
          Selected Work
        </Link>

        <p className={`mt-10 flex items-center gap-3 ${LABEL}`}>
          <span aria-hidden className="h-2 w-2 bg-highlight" />
          <span className="text-bone">{category}</span>
        </p>

        <h1
          data-hero="name"
          className="mt-4 font-display text-[clamp(4.5rem,14vw,10rem)] leading-[0.85] tracking-wide"
        >
          {title}
        </h1>
        <div aria-hidden data-hero="rule" className="mt-6 h-2 w-24 bg-accent" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {tagline && (
              <blockquote
                data-hero="copy"
                className="mb-6 max-w-xl border-l-2 border-accent pl-4 text-xl leading-snug text-bone md:text-2xl"
              >
                <p>{tagline}</p>
              </blockquote>
            )}
            <p
              data-hero="copy"
              className="max-w-xl text-lg leading-relaxed text-silver md:text-xl"
            >
              {description}
            </p>
            <div data-hero="quote" className="mt-8">
              <ProjectLinks project={project} showCaseStudy={false} />
            </div>
          </div>
          <div data-hero="quote" className="lg:col-span-5">
            <FactList facts={facts} variant="project" />
          </div>
        </div>

        <dl
          data-hero="quote"
          className="mt-12 grid grid-cols-2 border-2 border-steel bg-ink/60 md:grid-cols-4"
        >
          {glance.map(({ label, value }, i) => (
            <div
              key={label}
              className={`px-4 py-4 md:px-5 ${i % 2 === 1 ? "border-l-2 border-steel" : ""} ${
                i >= 2 ? "border-t-2 border-steel md:border-t-0" : ""
              } ${i === 2 ? "md:border-l-2" : ""}`}
            >
              <dt className={LABEL}>{label}</dt>
              <dd className="mt-1.5 leading-snug font-medium text-bone">{value}</dd>
            </div>
          ))}
        </dl>

        {sections && sections.length > 0 && (
          <nav aria-labelledby="case-contents" data-hero="quote" className="mt-10">
            <h2 id="case-contents" className={LABEL}>
              On this page
            </h2>
            <ol className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map(({ index, title: sectionTitle }) => (
                <li key={index}>
                  <a
                    href={`#case-${index}`}
                    className="group flex min-h-11 items-center gap-3 border-b border-steel py-2 text-silver transition-colors duration-150 hover:border-interactive hover:text-bone"
                  >
                    <span className="text-xs font-bold text-bone tabular-nums">
                      {index}
                    </span>
                    <span>{sectionTitle}</span>
                    <ArrowDown
                      aria-hidden
                      size={14}
                      className="ml-auto text-interactive opacity-40 transition-opacity duration-150 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </header>
  );
}
