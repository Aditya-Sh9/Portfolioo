type FactListProps = {
  facts: readonly { value: string; label: string }[];
  /**
   * "project": the number carries the project's accent and a thin highlight rule sits above it
   * (main 15% + secondary 5%). "default": highlight-coloured numbers on a neutral rule.
   */
  variant?: "project" | "default";
};

const VARIANTS = {
  project: { rule: "border-highlight", value: "text-accent" },
  default: { rule: "border-steel", value: "text-highlight" },
} as const;

/** Big-number facts in a fixed three-column grid, so rows align across cards. */
export default function FactList({ facts, variant = "default" }: FactListProps) {
  const styles = VARIANTS[variant];

  return (
    <dl className="grid grid-cols-3 gap-4">
      {facts.map(({ value, label }) => (
        <div
          key={label}
          className={`flex flex-col-reverse justify-end border-t-2 pt-3 ${styles.rule}`}
        >
          <dt className="mt-1 text-xs leading-snug font-bold tracking-widest text-silver uppercase">
            {label}
          </dt>
          <dd
            className={`font-display text-4xl leading-none tracking-wide ${styles.value}`}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
