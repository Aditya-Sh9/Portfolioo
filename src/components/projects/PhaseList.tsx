import Reveal from "@/animations/gsap/Reveal";
import type { Phase } from "@/data/projects";

/**
 * The phase roadmap: filled squares are complete, a half-filled square is the phase in progress.
 * Shared by Currently Building and the SOLACE case study.
 */
export default function PhaseList({
  phases,
  className = "",
}: {
  phases: readonly Phase[];
  className?: string;
}) {
  return (
    // Follows its panel: the phases ripple in a beat after it lands.
    <Reveal
      as="ol"
      stagger={0.07}
      y={12}
      delay={0.25}
      className={`grid gap-y-4 ${className}`}
    >
      {phases.map(({ number, name, done, current }) => (
        <li key={number} className="flex items-start gap-4">
          <span
            aria-hidden
            className={`mt-1.5 h-3 w-3 shrink-0 border-2 ${
              done
                ? "border-accent bg-accent"
                : current
                  ? "border-accent bg-[linear-gradient(to_top,var(--accent)_50%,transparent_50%)]"
                  : "border-steel"
            }`}
          />
          <p className={done || current ? "text-bone" : "text-silver"}>
            <span className="font-bold">Phase {number}</span> — {name}
            {current && (
              <span className="ml-2 border border-steel px-1.5 py-0.5 text-[0.7rem] font-bold tracking-widest text-silver uppercase">
                In progress
              </span>
            )}
            <span className="sr-only">
              {done ? " (complete)" : current ? "" : " (not started)"}
            </span>
          </p>
        </li>
      ))}
    </Reveal>
  );
}
