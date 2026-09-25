type SpecProps = {
  items: readonly { label: string; value: string }[];
};

/** A label / value spec sheet, e.g. the stack by layer. */
export default function Spec({ items }: SpecProps) {
  return (
    <dl className="border-b border-steel">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="grid gap-1 border-t border-steel py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
        >
          <dt className="text-xs font-bold tracking-widest text-silver uppercase">
            {label}
          </dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
