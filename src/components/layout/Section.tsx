import type { ReactNode } from "react";
import Reveal from "@/animations/gsap/Reveal";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  /** "display" (default): big Bebas title. "label": small "02 / TITLE" tag; the section supplies its own headline. */
  titleStyle?: "display" | "label";
  /** Tighter vertical padding and no minimum height, for a short closing section. */
  compact?: boolean;
  /** Extra classes for the <section> itself, e.g. to anchor a full-bleed background layer. */
  className?: string;
  children?: ReactNode;
};

/** Shared shell for the numbered main-page sections. `id` must come from SECTION_IDS. */
export default function Section({
  id,
  index,
  title,
  titleStyle = "display",
  compact = false,
  className = "",
  children,
}: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t-2 border-steel ${compact ? "py-16 md:py-20" : "min-h-[70svh] py-24 md:py-32"} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <Reveal>
          {titleStyle === "label" ? (
            <h2
              id={headingId}
              className="text-xs font-bold tracking-widest text-silver uppercase"
            >
              <span className="text-accent">{index}</span> / {title}
            </h2>
          ) : (
            <>
              <p className="text-xs font-bold tracking-widest text-silver uppercase">
                <span className="text-accent">{index}</span>
              </p>
              <h2
                id={headingId}
                className="mt-3 font-display text-5xl tracking-wide md:text-7xl"
              >
                {title}
              </h2>
            </>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
