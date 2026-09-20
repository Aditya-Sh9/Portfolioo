import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ExternalLink, { LINK_STYLES } from "@/components/ui/ExternalLink";
import type { Project } from "@/data/projects";

export default function ProjectLinks({
  project,
  showCaseStudy = true,
}: {
  project: Project;
  /** False on the case study itself, so it does not link to its own page. */
  showCaseStudy?: boolean;
}) {
  const { title, slug, links, hasCaseStudy } = project;

  return (
    <ul className="flex flex-wrap gap-4">
      {links.live && (
        <li>
          <ExternalLink href={links.live} context={title} variant="primary">
            Live
          </ExternalLink>
        </li>
      )}
      <li>
        <ExternalLink href={links.github} context={title}>
          GitHub
        </ExternalLink>
      </li>
      {hasCaseStudy && showCaseStudy && (
        <li>
          <Link href={`/projects/${slug}`} className={LINK_STYLES.secondary}>
            Case study
            <ArrowUpRight aria-hidden size={14} className="text-interactive" />
          </Link>
        </li>
      )}
    </ul>
  );
}
