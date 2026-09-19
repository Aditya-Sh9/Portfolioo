import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  /** "display" (default): big Bebas title. "label": small "02 / TITLE" tag; the section supplies its own headline. */
  titleStyle?: "display" | "label";
  children?: ReactNode;
};

/** Shared shell for the numbered main-page sections. `id` must come from SECTION_IDS. */
export default function Section({
  id,
  index,
  title,
  titleStyle = "display",
  children,
}: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="min-h-[70svh] border-t-2 border-steel py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
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
        {children}
      </div>
    </section>
  );
}
