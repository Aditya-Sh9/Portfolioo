import TechLogo from "@/components/ui/TechLogo";
import { techFor } from "@/data/tech";

type TagListProps = {
  items: readonly string[];
  label: string;
};

/**
 * A compact row of technologies for cards. Names with a logo (`data/tech.ts`) show the logo
 * alone, with the name as its accessible label and a tooltip on hover; anything without one
 * stays a text tag. Where there is no hover (touch), the name is written next to the logo
 * instead, so nothing depends on a tooltip.
 */
export default function TagList({ items, label }: TagListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => {
        const tech = techFor(item);

        if (!tech) {
          return (
            <li
              key={item}
              className="flex min-h-8 items-center justify-center border border-steel px-2.5 text-xs font-medium text-silver"
            >
              {item}
            </li>
          );
        }

        return (
          <li key={item} className="group relative">
            <span
              role="img"
              aria-label={tech.label}
              className="flex min-h-8 min-w-8 items-center justify-center gap-2 border border-steel p-1.5 text-silver transition-colors duration-150 group-hover:border-interactive group-hover:text-bone [@media(hover:none)]:px-2.5"
            >
              <TechLogo icons={tech.icons} className="size-5" />
              <span
                aria-hidden
                className="hidden text-xs font-medium text-bone [@media(hover:none)]:inline"
              >
                {tech.label}
              </span>
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 border border-steel bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-bone opacity-0 transition-opacity duration-150 group-hover:opacity-100 [@media(hover:none)]:hidden"
            >
              {tech.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
