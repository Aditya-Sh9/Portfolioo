"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// Lenis reads `scroll-padding-top` from <html> (see globals.css), so anchor links clear
// the fixed navbar. Reduced motion is honoured by Lenis by default.
// When the GSAP layer lands: set `autoRaf: false` and drive `lenis.raf` from gsap.ticker
// (plus `lenis.on("scroll", ScrollTrigger.update)`) so both share one loop.
const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  anchors: true,
  stopInertiaOnNavigate: true,
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
