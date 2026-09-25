import type { ReactNode } from "react";

/** A short aside inside a case study. The gold rule is the small secondary highlight. */
export default function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="max-w-2xl border-l-2 border-highlight bg-charcoal px-5 py-4 text-sm leading-relaxed text-silver">
      {children}
    </aside>
  );
}
