"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/animations/gsap";

type ScreenProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown under the frame, after the figure label. */
  caption?: string;
  /** e.g. "Fig. 01". */
  label?: string;
  /** The lead screenshot: bone frame and the accent hard shadow. Others use a quieter steel frame. */
  lead?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * A framed product screenshot. On first scroll into view an ink slab wipes off the frame toward
 * the right while the image settles from a slight zoom (transform only, once). The slab's
 * covering start state is CSS (`[data-screen-slab]` in globals.css), scoped to scripting +
 * motion allowed, so reduced-motion and no-JS visitors just see the image.
 */
export default function Screen({
  src,
  alt,
  width,
  height,
  caption,
  label,
  lead = false,
  sizes = "(min-width: 1024px) 640px, 100vw",
  className = "",
}: ScreenProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
          })
          .to("[data-screen-slab]", { scaleX: 0, duration: 0.75, ease: "power3.inOut" })
          .fromTo(
            "[data-screen-img]",
            { scale: 1.08 },
            { scale: 1, duration: 1.2, ease: "power3.out" },
            0,
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className={className}>
      <div
        className={`relative overflow-hidden border-2 bg-charcoal ${
          lead
            ? "border-bone shadow-brutal"
            : "border-steel shadow-[6px_6px_0_0_var(--color-steel)]"
        }`}
      >
        <div data-screen-img className="origin-center">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className="block h-auto w-full"
          />
        </div>
        <div
          aria-hidden
          data-screen-slab
          className="absolute inset-0 origin-right border-l-4 border-bone bg-ink"
        />
      </div>
      {(label || caption) && (
        <figcaption className="mt-4 flex gap-3 text-sm leading-relaxed text-silver">
          {label && (
            <span className="shrink-0 font-bold tracking-widest text-bone uppercase">
              {label}
            </span>
          )}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
