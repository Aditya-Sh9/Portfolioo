"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useGSAP } from "@/animations/gsap";
import {
  notifyRoute,
  registerLenis,
  registerOverlay,
} from "@/animations/web/web-transition";

/**
 * The web transition's overlay, mounted once at the layout root so it survives the route swap.
 * Idle it is `hidden` (no layer, no cost). Decorative and aria-hidden; it sits under the navbar
 * (z-45 vs 50) so the navigation stays put while the page changes. Its look is in globals.css
 * ("Web transition"); the choreography is in `web-transition.ts`.
 */
export default function WebTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();

  useGSAP(
    () => {
      const root = rootRef.current;
      const svg = svgRef.current;
      const slab = slabRef.current;
      if (!root || !svg || !slab) return;
      registerOverlay({ root, svg, slab });
      return () => registerOverlay(null);
    },
    { scope: rootRef },
  );

  useEffect(() => {
    registerLenis(lenis ?? null);
    return () => registerLenis(null);
  }, [lenis]);

  // The page has changed: tell a waiting transition to uncover it.
  useEffect(() => {
    notifyRoute();
  }, [pathname]);

  return (
    <div ref={rootRef} hidden aria-hidden className="web-overlay">
      <svg ref={svgRef} className="web-web" focusable="false">
        {[0, 1, 2].map((i) => (
          <line key={i} data-strand pathLength={1} className="web-strand" />
        ))}
        {[0, 1].map((i) => (
          <path key={i} data-thread pathLength={1} className="web-strand" />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} data-node r={0} className="web-node" />
        ))}
      </svg>
      <div ref={slabRef} className="web-slab" />
    </div>
  );
}
