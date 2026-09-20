import type { CSSProperties } from "react";

/**
 * A technology's logo files (`Tech.icons`, see data/tech.ts) drawn as one-colour masks over the
 * current text colour. Decorative: the caller supplies the accessible name. Size it with a
 * `size-*` class; several files sit side by side.
 */
export default function TechLogo({
  icons,
  className,
}: {
  icons: readonly string[];
  className: string;
}) {
  return icons.map((file) => (
    <span
      key={file}
      aria-hidden
      className={`tech-icon ${className}`}
      style={{ "--icon": `url(/icons/tech/${file}.svg)` } as CSSProperties}
    />
  ));
}
