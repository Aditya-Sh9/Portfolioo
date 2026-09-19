import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once; every client component imports GSAP from here, never from "gsap" directly.
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Shared motion values. Levels: micro 150-300ms, section 400-800ms, signature 800-1500ms. */
export const MOTION = {
  ease: "power3.out",
  section: 0.7,
} as const;

/** Runs GSAP setup only when the visitor has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
