import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import CaseStudyHeader from "@/components/projects/CaseStudyHeader";
import CaseStudyPager from "@/components/projects/CaseStudyPager";
import { PROJECTS } from "@/data/projects";
import { OG_IMAGE } from "@/lib/constants";

// Only projects flagged `hasCaseStudy` get a page; anything else is a 404.
const CASE_STUDIES = PROJECTS.filter((project) => project.hasCaseStudy);

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study · Aditya Sharma`,
    description: project.description,
    // A page's own `openGraph` replaces the layout's whole object, so the image is repeated here.
    openGraph: {
      type: "article",
      title: `${project.title} — Case Study · Aditya Sharma`,
      description: project.description,
      url: `/projects/${slug}`,
      images: [OG_IMAGE],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((p) => p.slug === slug);
  if (!project) notFound();

  const { default: Body } = (await import(`@/content/projects/${slug}.mdx`)) as {
    default: ComponentType;
  };

  return (
    <main
      id="main"
      data-accent={project.accent}
      data-highlight={project.highlight}
      className="flex flex-1 flex-col"
    >
      <CaseStudyHeader project={project} />
      <article>
        <Body />
      </article>
      <CaseStudyPager projects={CASE_STUDIES} index={CASE_STUDIES.indexOf(project)} />
    </main>
  );
}
