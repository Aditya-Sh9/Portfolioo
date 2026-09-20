import { ArrowUpRight } from "lucide-react";
import Reveal from "@/animations/gsap/Reveal";
import Section from "@/components/layout/Section";
import CopyEmail from "@/components/contact/CopyEmail";
import { ScribbleArrow, ScribbleUnderline } from "@/components/contact/Scribbles";
import SpotlightCard from "@/components/ui/spotlight-card";
import TechLogo from "@/components/ui/TechLogo";
import { CONTACT, PROFILE_LINKS } from "@/data/contact";
import { SECTION_IDS } from "@/lib/constants";

const TOTAL = String(PROFILE_LINKS.length + 1).padStart(2, "0");

/**
 * A headline, the email as the call to action, then the three profiles as compact rows. Kept
 * short on purpose: the whole section fits in one desktop viewport. Red only as the glow, the
 * accents and the interaction; everything else is the base palette. Cards reuse the site's
 * SpotlightCard (red accent, bone core); the copy lives in `data/contact.ts`. The only motion is
 * the shared reveal and the cards' hover.
 */
export default function Contact() {
  const [user, domain] = CONTACT.email.split("@");

  return (
    <Section
      id={SECTION_IDS.contact}
      index="09"
      title="Contact"
      titleStyle="label"
      compact
      className="relative isolate overflow-hidden"
    >
      <div aria-hidden className="contact-glow absolute inset-0 -z-10" />

      <Reveal className="relative mt-5 md:mt-6">
        <h3 className="font-display text-[clamp(3rem,9vw,5rem)] leading-[0.85] tracking-wide">
          LET’S{" "}
          <span className="relative inline-block">
            CONNECT
            <ScribbleUnderline className="absolute -bottom-[0.05em] left-0 h-[0.12em] w-full text-accent" />
          </span>
        </h3>
        <ScribbleArrow className="pointer-events-none absolute right-[7%] -bottom-9 hidden h-16 w-14 text-silver/70 lg:block" />
      </Reveal>

      <Reveal className="mt-8 md:mt-10">
        <SpotlightCard
          data-accent="red"
          data-highlight="bone"
          className="border-2 border-bone bg-charcoal shadow-brutal-sm transition-transform duration-150 hover:-translate-x-px hover:-translate-y-px has-[a:active]:translate-x-[2px] has-[a:active]:translate-y-[2px] has-[a:active]:shadow-none"
        >
          <div
            aria-hidden
            className="texture-halftone absolute inset-0 -z-10 opacity-25"
          />
          <a
            href={`mailto:${CONTACT.email}`}
            className="@container flex flex-col gap-6 p-5 -outline-offset-4 md:gap-8 md:p-6"
          >
            <span className="text-xs font-bold tracking-widest text-silver uppercase">
              <span className="text-accent">01</span> / {TOTAL} · Email
            </span>
            <span className="flex items-end justify-between gap-4">
              {/* Sized from the card's own width; it may wrap at the @ on narrow screens. */}
              <span className="text-[length:clamp(1.125rem,4cqw,2.25rem)] leading-tight font-bold">
                {user}@<wbr />
                {domain}
              </span>
              <ArrowUpRight
                aria-hidden
                size={28}
                className="hidden shrink-0 text-accent md:block"
              />
            </span>
          </a>
          {/* Outside the link (a button can't live inside one), pinned to the header row. */}
          <div className="absolute top-2.5 right-3 z-20 md:top-3 md:right-4">
            <CopyEmail email={CONTACT.email} />
          </div>
        </SpotlightCard>
      </Reveal>

      <Reveal as="ul" stagger={0.1} className="mt-4 grid gap-4 lg:grid-cols-3">
        {PROFILE_LINKS.map(({ id, icon, label, handle, href }, i) => (
          <li key={id} className="group">
            <SpotlightCard
              data-accent="red"
              data-highlight="bone"
              className="h-full border-2 border-steel bg-charcoal transition-transform duration-150 group-hover:-translate-y-0.5"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full items-center gap-4 p-4 -outline-offset-2"
              >
                <span className="flex size-11 shrink-0 items-center justify-center border border-steel border-t-bone/15 bg-ink text-bone transition-colors duration-150 group-hover:border-accent">
                  <TechLogo dir="social" icons={[icon]} className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-3xl leading-none tracking-wide">
                    {label}
                  </span>
                  <span className="mt-1 block text-sm break-all text-silver">
                    {handle}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5 text-xs font-bold tracking-widest text-silver uppercase">
                  <span aria-hidden className="hidden sm:block">
                    <span className="text-accent">{String(i + 2).padStart(2, "0")}</span>{" "}
                    / {TOTAL}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={18}
                    className="transition-colors duration-150 group-hover:text-accent"
                  />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </SpotlightCard>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
