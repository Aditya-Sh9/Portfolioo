import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProjectLinks from "@/components/projects/ProjectLinks";
import FactList from "@/components/ui/FactList";
import type { Project } from "@/data/projects";

/**
 * The top of a case study. Reuses the hero's CSS entrance (`data-hero`), so it is visible on
 * the first frame and never waits for hydration. The parent supplies `data-accent`.
 */
export default function CaseStudyHeader({ project }: { project: Project }) {
  const { title, category, tagline, description, status, period, facts } = project;

  return (
    <header className="panel-tint relative isolate border-b-2 border-steel pt-32 pb-14 md:pb-20">
      <div
        aria-hidden
        className="texture-halftone pointer-events-none absolute inset-0 -z-10 opacity-40"
      />
      <div className="mx-auto w-full max-w-6xl px-4">
        <Link
          href="/#work"
          data-hero="tag"
          className="inline-flex items-center gap-2 border-2 border-steel px-3 py-1.5 text-xs font-bold tracking-widest text-silver uppercase transition-colors duration-150 hover:border-interactive hover:text-bone"
        >
          <ArrowLeft aria-hidden size={14} className="text-interactive" />
          Selected Work
        </Link>

        <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold tracking-widest text-silver uppercase">
          <span className="flex items-center gap-3 text-bone">
            <span aria-hidden className="h-2 w-2 bg-highlight" />
            {status}
          </span>
          <span>{period}</span>
          <span className="text-accent">{category}</span>
        </p>

        <h1
          data-hero="name"
          className="mt-4 font-display text-[clamp(5.5rem,20vw,16rem)] leading-[0.85] tracking-wide"
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
      </div>
    </header>
  );
}
