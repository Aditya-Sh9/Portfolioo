import type { ReactNode } from "react";
import Reveal from "@/animations/gsap/Reveal";

/** The page is numbered like a comic: the hero is 01, Contact is 09. */
const TOTAL = "09";

/** The caption tab that sits on each section's top edge, like a comic caption box. */
const TAB =
  "inline-flex h-7 items-center gap-2 border-2 border-bone bg-ink px-3 text-xs font-bold tracking-widest text-silver uppercase shadow-[3px_3px_0_0_var(--color-steel)]";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  /** "display" (default): big Bebas title. "label": the caption tab carries the name ("02 / ABOUT"); the section supplies its own headline. */
  titleStyle?: "display" | "label";
  /** Tighter vertical padding and no minimum height, for a short closing section. */
  compact?: boolean;
  /** Extra classes for the <section> itself, e.g. to anchor a full-bleed background layer. */
  className?: string;
  /**
   * The backdrop behind the section (see "Comic print language" in globals.css): a halftone
   * screen from one corner ("halftone", the default), the same plus a few speed lines
   * ("speed"), or none.
   */
  field?: "halftone" | "speed" | "none";
  children?: ReactNode;
};

/**
 * Shared shell for the numbered main-page sections. `id` must come from SECTION_IDS. Each
 * section is a panel: its top edge is an ink rule carrying a caption tab (number, or number and
 * name), with hatching and a registration mark at the far end. Decoration is aria-hidden; the
 * heading stays the one real h2.
 */
export default function Section({
  id,
  index,
  title,
  titleStyle = "display",
  compact = false,
  className = "",
  field = "halftone",
  children,
}: SectionProps) {
  const headingId = `${id}-title`;
  // The halftone falls from alternating top corners down the page.
  const side = Number(index) % 2 === 0 ? "right" : "left";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative isolate border-t-2 border-steel ${compact ? "py-16 md:py-20" : "py-20 md:py-28"} ${className}`}
    >
      {field !== "none" && (
        <div
          aria-hidden
          data-side={side}
          data-speed={field === "speed" ? "" : undefined}
          className="section-field"
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 -top-px">
        <div className="mx-auto flex w-full max-w-6xl -translate-y-1/2 items-center justify-between px-4">
          {titleStyle === "label" ? (
            <h2 id={headingId} className={TAB}>
              <span className="text-bone">{index}</span> / {title}
            </h2>
          ) : (
            <p aria-hidden className={TAB}>
              <span className="text-bone">{index}</span> / {TOTAL}
            </p>
          )}
          <span
            aria-hidden
            className="flex items-center gap-3 bg-ink pl-3 text-silver/40"
          >
            <span className="hatch h-2.5 w-7" />
            <span className="reg-mark" />
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        {titleStyle === "display" && (
          <Reveal>
            <h2
              id={headingId}
              className="font-display text-5xl tracking-wide md:text-7xl"
            >
              {title}
            </h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
