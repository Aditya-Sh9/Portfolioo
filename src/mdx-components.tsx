import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import CaseSection from "@/components/projects/CaseSection";
import Flow from "@/components/projects/Flow";
import Note from "@/components/projects/Note";
import PhaseList from "@/components/projects/PhaseList";
import Spec from "@/components/projects/Spec";

/**
 * Element styles and components available to every case-study .mdx file without importing.
 * The accent comes from the page's `data-accent`, so one set serves all three projects.
 * Keep lists tight (no blank lines between items) so each <li> holds inline content only.
 */
const components = {
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-xs font-bold tracking-widest text-silver uppercase" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="max-w-2xl text-lg leading-relaxed text-silver" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="grid max-w-2xl gap-4" {...props} />
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className="flex gap-4 leading-relaxed text-silver" {...props}>
      <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 bg-accent" />
      <span>{children}</span>
    </li>
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-bone" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="border border-steel bg-charcoal px-1.5 py-0.5 text-[0.9em] text-bone"
      {...props}
    />
  ),
  CaseSection,
  Flow,
  Note,
  PhaseList,
  Spec,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
