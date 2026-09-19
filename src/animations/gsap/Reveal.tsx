"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, MOTION_OK, ScrollTrigger, useGSAP } from "@/animations/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Element to render; use "ul" / "ol" with `stagger` so the children stay valid list items. */
  as?: "div" | "ul" | "ol";
  /** Seconds to wait once the block enters the viewport. */
  delay?: number;
  /** Seconds. Defaults to the section level. */
  duration?: number;
  /** Lift distance in px. */
  y?: number;
  /**
   * Seconds between siblings. When set, the block itself stays put and its direct children
   * reveal in batches: items entering the viewport together ripple in, the rest wait.
   */
  stagger?: number;
};

/**
 * The one scroll-reveal primitive: fades a block in and lifts it, once, as it enters the
 * viewport. Its hidden start state lives in globals.css (`[data-reveal]` and
 * `[data-reveal-group] > *`), scoped to scripting-enabled and no-reduced-motion, so the
 * server-rendered page never flashes and other visitors always see the content.
 * Reveal a whole panel, never its individual pieces.
 */
export default function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  duration = MOTION.section,
  y = 24,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";
  const grouped = stagger !== undefined;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const from = { autoAlpha: 0, y };
      const to = { autoAlpha: 1, y: 0, duration, ease: MOTION.ease, delay };

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (grouped) {
          ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>(el.children), {
            start: "top 88%",
            once: true,
            onEnter: (batch) => gsap.fromTo(batch, from, { ...to, stagger }),
          });
          return;
        }
        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      {...(grouped ? { "data-reveal-group": "" } : { "data-reveal": "" })}
      className={className}
    >
      {children}
    </Tag>
  );
}
