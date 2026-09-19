type FactListProps = {
  facts: readonly { value: string; label: string }[];
};

/** Big-number facts in a fixed three-column grid, so rows align across cards. */
export default function FactList({ facts }: FactListProps) {
  return (
    <dl className="grid grid-cols-3 gap-4">
      {facts.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col-reverse justify-end border-t-2 border-steel pt-3"
        >
          <dt className="mt-1 text-xs leading-snug font-bold tracking-widest text-silver uppercase">
            {label}
          </dt>
          <dd className="font-display text-4xl leading-none tracking-wide text-highlight">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
