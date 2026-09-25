"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";

// Lenis reads `scroll-padding-top` from <html> (see globals.css), so anchor links clear
// the fixed navbar. Reduced motion is honoured by Lenis by default.
// `autoRaf: false`: GsapBridge drives Lenis from gsap.ticker, so Lenis and ScrollTrigger
// share one animation loop.
const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  anchors: true,
  stopInertiaOnNavigate: true,
};

const syncScrollTrigger = () => ScrollTrigger.update();

function GsapBridge() {
  const lenis = useLenis(syncScrollTrigger);

  useEffect(() => {
    if (!lenis) return;

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <GsapBridge />
      {children}
    </ReactLenis>
  );
}
