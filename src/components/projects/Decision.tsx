import type { ReactNode } from "react";
import Reveal from "@/animations/gsap/Reveal";

const LABEL = "text-xs font-bold tracking-widest text-silver uppercase";

/** The grid that holds `Decision` cards; they ripple in as they reach the viewport. */
export function DecisionGrid({ children }: { children: ReactNode }) {
  return (
    <Reveal as="ul" stagger={0.08} className="grid gap-6 md:grid-cols-2">
      {children}
    </Reveal>
  );
}

type DecisionProps = {
  n: string;
  title: string;
  why: string;
  tradeoff?: string;
};

/** One engineering decision: what was chosen, why, and what it cost. */
export function Decision({ n, title, why, tradeoff }: DecisionProps) {
  return (
    <li className="flex flex-col border-2 border-steel bg-charcoal">
      <div className="flex items-baseline gap-4 border-b-2 border-steel px-5 py-4 md:px-6">
        <span aria-hidden className="font-display text-3xl leading-none text-accent">
          {n}
        </span>
        <h3 className="text-lg leading-snug font-bold text-bone">{title}</h3>
      </div>
      <dl className="flex flex-1 flex-col gap-5 px-5 py-5 md:px-6">
        <div>
          <dt className={LABEL}>Why</dt>
          <dd className="mt-2 leading-relaxed text-silver">{why}</dd>
        </div>
        {tradeoff && (
          <div className="mt-auto border-t border-dashed border-steel pt-4">
            <dt className={`flex items-center gap-2 ${LABEL}`}>
              <span aria-hidden className="h-2 w-2 bg-highlight" />
              Trade-off
            </dt>
            <dd className="mt-2 leading-relaxed text-silver">{tradeoff}</dd>
          </div>
        )}
      </dl>
    </li>
  );
}
