"use client";

import { useRef } from "react";
import { gsap, MOTION, MOTION_OK, useGSAP } from "@/animations/gsap";

/**
 * Coordinated entrance for a main section's chrome, once, as the section's top edge rises into
 * view: the ink rule draws in from the left, the caption tab slides in behind it, the end marks
 * (hatching, registration mark) arrive as the rule reaches them, and the halftone backdrop
 * settles from its corner. Movement is 20-24px and transform-only, with the fade doing no more
 * than it has to (opacity only, never visibility, so the h2 tab stays in the accessibility
 * tree). It is one trigger per section and never touches the section's content: the
 * heading and panels keep their own `Reveal`, delayed a beat so the order reads rule, tab,
 * heading, panels. Mount it as a child of the section; it finds its parts by `data-sm`.
 *
 * Start states are CSS (globals.css, "Section choreography"), gated to scripting-on and
 * no-reduced-motion, so with reduced motion or without JavaScript the section is simply there.
 */
export default function SectionMotion() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = markerRef.current?.parentElement;
      if (!section) return;
      const part = (name: string) =>
        section.querySelector<HTMLElement>(`[data-sm="${name}"]`);
      const rule = part("rule");
      const tab = part("tab");
      const end = part("end");
      const field = part("field");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: MOTION.ease },
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });
        if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 0);
        if (tab) {
          tl.fromTo(
            tab,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            0.08,
          );
        }
        if (end) tl.fromTo(end, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5);
        if (field) {
          tl.fromTo(
            field,
            { y: -24, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            0.1,
          );
        }
      });
      return () => mm.revert();
    },
    { scope: markerRef },
  );

  return <span ref={markerRef} hidden aria-hidden />;
}
