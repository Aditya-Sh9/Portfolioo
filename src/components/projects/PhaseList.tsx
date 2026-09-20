import Reveal from "@/animations/gsap/Reveal";
import type { Phase } from "@/data/projects";

/** The phase roadmap: filled squares are complete. Shared by Currently Building and the SOLACE case study. */
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
      {phases.map(({ number, name, done }) => (
        <li key={number} className="flex items-start gap-4">
          <span
            aria-hidden
            className={`mt-1.5 h-3 w-3 shrink-0 border-2 ${done ? "border-accent bg-accent" : "border-steel"}`}
          />
          <p className={done ? "text-bone" : "text-silver"}>
            <span className="font-bold">Phase {number}</span> — {name}
            <span className="sr-only">{done ? " (complete)" : " (not started)"}</span>
          </p>
        </li>
      ))}
    </Reveal>
  );
}
