import type { CSSProperties } from "react";

/**
 * Logo files drawn as one-colour masks over the current text colour (`.tech-icon` in
 * globals.css). Decorative: the caller supplies the accessible name. Size it with a `size-*`
 * class; several files sit side by side. Files live in `public/icons/<dir>/`: `tech` for
 * technologies (`Tech.icons`, see data/tech.ts), `social` for profile marks.
 */
export default function TechLogo({
  icons,
  className,
  dir = "tech",
}: {
  icons: readonly string[];
  className: string;
  dir?: "tech" | "social";
}) {
  return icons.map((file) => (
    <span
      key={file}
      aria-hidden
      className={`tech-icon ${className}`}
      style={{ "--icon": `url(/icons/${dir}/${file}.svg)` } as CSSProperties}
    />
  ));
}
