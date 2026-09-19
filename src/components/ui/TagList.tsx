type TagListProps = {
  items: readonly string[];
  label: string;
};

export default function TagList({ items, label }: TagListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="border border-steel px-2.5 py-1 text-xs font-medium text-silver"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
