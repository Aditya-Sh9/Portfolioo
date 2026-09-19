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
      <div className="mx-auto w-full max-w-6xl px-4">
        <p
          data-hero="tag"
          className="inline-block border-2 border-bone px-3 py-1 text-xs font-bold tracking-widest uppercase"
        >
          {SITE.role}
        </p>

        <h1
          id="hero-title"
          className="mt-6 font-display text-[clamp(5rem,19vw,15.5rem)] leading-[0.85] tracking-wide"
        >
          <span data-hero="name" className="block">
            {HERO_COPY.firstName}
          </span>
          <span data-hero="name" className="block">
            {HERO_COPY.lastName}
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-end md:gap-16">
          <div>
            <div aria-hidden data-hero="rule" className="mb-6 h-2 w-24 bg-accent" />
            <p
              data-hero="copy"
              className="max-w-xl text-lg leading-relaxed text-silver md:text-xl"
            >
              {HERO_COPY.statement}
            </p>
          </div>

          <blockquote
            data-hero="quote"
            className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-silver"
          >
            <p>&ldquo;{HERO_COPY.quote}&rdquo;</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
