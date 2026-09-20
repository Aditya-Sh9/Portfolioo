import Image from "next/image";
import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import { ABOUT_COPY, SECTION_IDS } from "@/lib/constants";

/**
 * Technical About: engineering-focused copy on the left (written by Aditya, in
 * ABOUT_COPY), a large rectangular editorial portrait on the right (never a circular avatar).
 */
export default function About() {
  return (
    <Section id={SECTION_IDS.about} index="02" title="About" titleStyle="label">
      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h3 className="font-display text-5xl leading-[0.95] tracking-wide text-balance md:text-7xl">
            {ABOUT_COPY.headline}
          </h3>

          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-silver">
            {ABOUT_COPY.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-10 grid max-w-xl gap-x-8 gap-y-6 sm:grid-cols-2">
            {ABOUT_COPY.stack.map(({ label, items }) => (
              <div key={label} className="border-t-2 border-steel pt-4">
                <dt className="text-xs font-bold tracking-widest text-silver uppercase">
                  {label}
                </dt>
                <dd className="mt-2 font-medium">{items}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <PortraitSlot />
      </div>
    </Section>
  );
}

/**
 * The photo is pre-cropped to 4:5 (public/images/about-portrait.webp) with the forest kept
 * and Aditya low and to the right. The dark treatment is CSS only, so it stays tunable:
 * a mild filter on the image plus an ink gradient from the bottom and left edges.
 */
function PortraitSlot() {
  return (
    <Reveal delay={0.12} className="lg:col-span-5">
      <figure>
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden border-2 border-bone bg-charcoal shadow-brutal-sm lg:ml-auto lg:max-w-none">
          <Image
            src="/images/about-portrait.webp"
            alt="Aditya Sharma sitting on a rock in a pine forest, looking off to the left."
            fill
            sizes="(min-width: 1024px) 480px, (min-width: 448px) 448px, 100vw"
            className="object-cover brightness-[0.85] contrast-105 saturate-[0.85]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-ink/40 to-transparent to-50%"
          />
        </div>
        <figcaption className="mt-4 flex items-center gap-3 text-xs font-bold tracking-widest text-silver uppercase lg:justify-end">
          <span aria-hidden="true" className="h-2 w-2 bg-highlight" />
          Aditya Sharma
        </figcaption>
      </figure>
    </Reveal>
  );
}
