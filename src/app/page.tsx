import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Section from "@/components/layout/Section";
import { SECTION_IDS } from "@/lib/constants";

// Temporary: each entry is replaced by its real section component as content lands.
const PLACEHOLDER_SECTIONS = [
  { id: SECTION_IDS.building, index: "03", title: "Currently Building" },
  { id: SECTION_IDS.work, index: "04", title: "Selected Work" },
  { id: SECTION_IDS.experience, index: "05", title: "Experience" },
  { id: SECTION_IDS.build, index: "06", title: "How I Build" },
  { id: SECTION_IDS.beyond, index: "07", title: "Beyond the Screen" },
  { id: SECTION_IDS.why, index: "08", title: "Why I Build" },
  { id: SECTION_IDS.contact, index: "09", title: "Contact" },
] as const;

export default function Home() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <Hero />
      <About />
      {PLACEHOLDER_SECTIONS.map((section) => (
        <Section key={section.id} {...section}>
          <p className="mt-6 max-w-md text-silver">Content coming soon.</p>
        </Section>
      ))}
    </main>
  );
}
