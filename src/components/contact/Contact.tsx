import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layout/Section";
import { CONTACT, PROFILE_LINKS } from "@/data/contact";
import { SECTION_IDS } from "@/lib/constants";

/**
 * The email address is the call to action. Profile links are plain rows for now; custom
 * buttons or icons replace them later, so keep the data in `data/contact.ts`.
 */
export default function Contact() {
  return (
    <Section id={SECTION_IDS.contact} index="09" title="Contact">
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <a
          href={`mailto:${CONTACT.email}`}
          className="@container flex flex-col gap-12 border-2 border-bone bg-charcoal p-6 shadow-brutal transition-transform duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-[3px] active:translate-y-[3px] active:shadow-none md:p-10 lg:col-span-7"
        >
          <span className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-accent uppercase">
              Email
            </span>
            <ArrowUpRight aria-hidden size={28} />
          </span>
          {/* Sized from the panel's own width so the address always fits on one line. */}
          <span className="text-[length:clamp(0.875rem,6cqw,2.25rem)] font-bold whitespace-nowrap">
            {CONTACT.email}
          </span>
        </a>

        <ul className="grid content-start gap-4 lg:col-span-5">
          {PROFILE_LINKS.map(({ id, label, handle, href }) => (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 border-2 border-steel bg-charcoal px-5 py-4 transition-colors duration-150 hover:border-bone"
              >
                <span>
                  <span className="block font-bold">{label}</span>
                  <span className="block text-sm text-silver">{handle}</span>
                </span>
                <ArrowUpRight aria-hidden size={18} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
