import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const BASE =
  "inline-flex items-center gap-2 border-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-transform duration-150 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";

/** Shared brutalist link styles; also used for internal links that should match. */
export const LINK_STYLES = {
  primary: `${BASE} border-bone text-bone shadow-brutal-sm hover:-translate-x-px hover:-translate-y-px hover:bg-accent`,
  secondary: `${BASE} border-steel text-silver hover:border-interactive hover:text-bone`,
} as const;

type ExternalLinkProps = {
  href: string;
  /** Spoken after the visible text, e.g. the project name. */
  context: string;
  variant?: keyof typeof LINK_STYLES;
  children: ReactNode;
};

export default function ExternalLink({
  href,
  context,
  variant = "secondary",
  children,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK_STYLES[variant]}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        size={14}
        className={variant === "secondary" ? "text-interactive" : undefined}
      />
      <span className="sr-only"> — {context} (opens in a new tab)</span>
    </a>
  );
}
