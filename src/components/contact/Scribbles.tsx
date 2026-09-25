/**
 * Two hand-drawn marks for the Contact headline: an uneven double underline and a loose
 * curved arrow. Plain SVG strokes (no handwriting font is in the design system), decorative,
 * and static. `non-scaling-stroke` keeps the pen weight constant however wide they stretch.
 */
export function ScribbleUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 22"
      preserveAspectRatio="none"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M3 13 C 40 5, 75 17, 115 9 S 190 15, 230 8 S 280 12, 297 6"
        stroke="currentColor"
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M22 18 C 95 13, 170 19, 282 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function ScribbleArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 150"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M16 10 C 86 -6, 122 52, 76 126"
        stroke="currentColor"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M50 104 L76 132 L100 108"
        stroke="currentColor"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
