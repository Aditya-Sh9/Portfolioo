"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/animations/gsap";
import { createParticleField } from "@/animations/particles/particle-field";

const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";

/** Where the light hangs, as a fraction of the width. Matches `.hero-aim { left }` in globals.css. */
const BEAM_APEX = 0.66;
/** Degrees of swing per full viewport width of pointer offset from the apex, and the cap. */
const AIM_GAIN = 60;
const AIM_MAX = 24;

/**
 * The hero's lighting and atmosphere: soft silver light beams, a few hairlines and drifting
 * dust, all behind the hero copy. Decorative only: the copy never waits on this, and every
 * colour comes from the design tokens.
 *
 * Mount it as the first child of the hero `<section>` (which must be `relative isolate`); it
 * reads that section as its scroll trigger and fades/parallaxes the `[data-hero-content]`
 * block inside it as the hero scrolls away.
 *
 * Cost control: the particle loop shares `gsap.ticker` with Lenis (one animation frame for
 * everything) and stops while the hero is off screen or the tab is hidden. CSS sway pauses
 * with it. Scroll motion is transform and opacity only. Reduced motion draws one still frame.
 */
export function ParticleHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);
  const aimRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const canvas = canvasRef.current;
      const section = root?.parentElement;
      if (!root || !canvas || !section) return;

      const tokens = getComputedStyle(document.documentElement);
      const token = (name: string) => tokens.getPropertyValue(name).trim();
      const field = createParticleField(canvas, {
        neutrals: [token("--color-silver"), token("--color-bone")],
        accent: token("--accent"),
      });

      // Only rebuild when the box really changes, so it never fights the mobile URL bar.
      let animated = false;
      let box = { width: 0, height: 0 };
      const resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        if (Math.abs(width - box.width) < 1 && Math.abs(height - box.height) < 1) return;
        box = { width, height };
        field.resize(width, height);
        if (!animated) field.drawStill();
      });
      resizeObserver.observe(root);

      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, still: MOTION_REDUCED }, (context) => {
        const { motion } = context.conditions as { motion: boolean };
        if (!motion) {
          animated = false;
          field.drawStill();
          return;
        }
        animated = true;

        // Run the dust only while it can be seen.
        let onScreen = true;
        let tabVisible = !document.hidden;
        let running = false;
        const tick = (_time: number, deltaMs: number) => field.tick(deltaMs);
        const sync = () => {
          const shouldRun = onScreen && tabVisible;
          if (shouldRun === running) return;
          running = shouldRun;
          if (shouldRun) gsap.ticker.add(tick);
          else gsap.ticker.remove(tick);
          root.dataset.atmosphere = shouldRun ? "live" : "paused";
        };
        const intersection = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
          },
          { rootMargin: "100px 0px" },
        );
        intersection.observe(section);
        const onVisibility = () => {
          tabVisible = !document.hidden;
          sync();
        };
        document.addEventListener("visibilitychange", onVisibility);
        sync();

        // The light stays fixed in the ceiling and swings toward the side the pointer is on.
        // quickTo eases it (a light with some weight); it returns to rest when the pointer
        // leaves the window. Fine pointers only; touch never moves it.
        const aim = aimRef.current;
        const swing = aim
          ? gsap.quickTo(aim, "rotation", { duration: 1.1, ease: "power3.out" })
          : null;
        const onPointerMove = (event: PointerEvent) => {
          if (!swing || !onScreen || event.pointerType === "touch") return;
          const offset = (BEAM_APEX - event.clientX / window.innerWidth) * AIM_GAIN;
          swing(gsap.utils.clamp(-AIM_MAX, AIM_MAX, offset));
        };
        const onPointerLeave = () => swing?.(0);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onPointerLeave);

        // As the hero scrolls away the light holds back (parallax), the dust thins out and
        // the copy drifts up and dims. Transform and opacity only, scrubbed to the scroll.
        const scroll = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        scroll
          .fromTo(
            beamsRef.current,
            { yPercent: 0, opacity: 1 },
            { yPercent: 16, opacity: 0 },
            0,
          )
          .fromTo(
            fieldRef.current,
            { yPercent: 0, opacity: 1 },
            { yPercent: 8, opacity: 0.15 },
            0,
          )
          .fromTo(linesRef.current, { opacity: 1 }, { opacity: 0 }, 0);
        const content = section.querySelector<HTMLElement>("[data-hero-content]");
        if (content) {
          // The copy dims late (ease-in), so it stays readable while it is still on screen.
          scroll
            .fromTo(content, { yPercent: 0 }, { yPercent: -5 }, 0)
            .fromTo(content, { opacity: 1 }, { opacity: 0.2, ease: "power2.in" }, 0);
        }

        return () => {
          animated = false;
          if (running) gsap.ticker.remove(tick);
          intersection.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("pointermove", onPointerMove);
          document.documentElement.removeEventListener("pointerleave", onPointerLeave);
        };
      });

      return () => {
        mm.revert();
        resizeObserver.disconnect();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-atmosphere="live"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div ref={beamsRef} className="absolute inset-0">
        <div className="hero-fade absolute inset-0">
          <div className="hero-bloom absolute inset-0" />
          <div ref={aimRef} className="hero-aim">
            <div className="hero-beam" data-beam="a" />
            <div className="hero-beam" data-beam="b" />
            <div className="hero-beam" data-beam="c" />
          </div>
        </div>
      </div>

      <div ref={fieldRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="hero-fade size-full" />
      </div>

      <div ref={linesRef} className="absolute inset-0">
        <div className="hero-line-v" data-side="left" />
        <div className="hero-line-v" data-side="right" />
        <div className="hero-line-h" />
        <span aria-hidden className="reg-mark hero-reg hero-fade" data-side="left" />
        <span aria-hidden className="reg-mark hero-reg hero-fade" data-side="right" />
      </div>
    </div>
  );
}
