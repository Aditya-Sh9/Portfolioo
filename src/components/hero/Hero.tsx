import { ArrowDown } from "lucide-react";
import { LINK_STYLES } from "@/components/ui/ExternalLink";
import { ParticleHero } from "@/components/ui/particle-hero";
import { HERO_COPY, SECTION_IDS, SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-end pt-32 pb-10 md:pb-14"
    >
      <div
        aria-hidden
        className="texture-dotgrid pointer-events-none absolute inset-0 -z-10 opacity-10"
      />
      <ParticleHero />
      <div data-hero-content className="mx-auto w-full max-w-6xl px-4">
        <p
          data-hero="tag"
          className="inline-block border-2 border-bone px-3 py-1 text-xs font-bold tracking-widest uppercase"
        >
          {SITE.role}
        </p>

        {/* Sized from the width, and capped by the height so the name and its copy fit a short laptop screen. */}
        <h1
          id="hero-title"
          className="print-offset mt-6 font-display text-[length:clamp(5rem,min(32vw,27svh),15.5rem)] leading-[0.85] tracking-wide md:text-[length:clamp(5rem,min(19vw,27svh),15.5rem)]"
        >
          <span data-hero="name" className="block">
            {HERO_COPY.firstName}
          </span>
          <span data-hero="name" className="block">
            {HERO_COPY.lastName}
          </span>
        </h1>

        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-end md:gap-16">
          <div>
            <div aria-hidden data-hero="rule" className="mb-6 h-2 w-24 bg-accent" />
            <p
              data-hero="copy"
              className="max-w-xl text-lg leading-relaxed text-silver md:text-xl"
            >
              {HERO_COPY.statement}
            </p>
            <ul data-hero="quote" className="mt-8 flex flex-wrap gap-4">
              <li>
                <a href={`#${SECTION_IDS.work}`} className={LINK_STYLES.primary}>
                  Selected Work
                  <ArrowDown aria-hidden size={14} />
                </a>
              </li>
              <li>
                <a href={`#${SECTION_IDS.contact}`} className={LINK_STYLES.secondary}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <blockquote
            data-hero="quote"
            className="speech px-5 py-4 text-base leading-snug text-silver"
          >
            <p>&ldquo;{HERO_COPY.quote}&rdquo;</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
