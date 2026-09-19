import Section from "@/components/layout/Section";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Technical About: engineering-focused copy on the left, a large rectangular editorial
 * portrait on the right (never a circular avatar). Aditya supplies the photo; do not
 * generate or source one. When it arrives, swap <PortraitSlot /> for a next/image with
 * `fill`, `object-cover` and a `sizes` hint inside the same frame.
 */
export default function About() {
  return (
    <Section id={SECTION_IDS.about} index="02" title="About">
      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-7">
          <p className="max-w-md text-silver">Content coming soon.</p>
        </div>

        <PortraitSlot />
      </div>
    </Section>
  );
}

function PortraitSlot() {
  return (
    <figure className="lg:col-span-5">
      <div className="relative aspect-[4/5] w-full max-w-md border-2 border-bone bg-charcoal shadow-brutal lg:ml-auto lg:max-w-none">
        <p className="absolute right-3 bottom-3 left-3 text-xs font-bold tracking-widest text-silver uppercase">
          Portrait — photo to come
        </p>
      </div>
    </figure>
  );
}
