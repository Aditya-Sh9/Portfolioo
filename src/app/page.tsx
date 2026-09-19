import About from "@/components/about/About";
import WhyIBuild from "@/components/about/WhyIBuild";
import Contact from "@/components/contact/Contact";
import Experience from "@/components/experience/Experience";
import Hero from "@/components/hero/Hero";
import Section from "@/components/layout/Section";
import CurrentlyBuilding from "@/components/projects/CurrentlyBuilding";
import SelectedWork from "@/components/projects/SelectedWork";
import HowIBuild from "@/components/skills/HowIBuild";
import { SECTION_IDS } from "@/lib/constants";

export default function Home() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <Hero />
      <About />
      <CurrentlyBuilding />
      <SelectedWork />
      <Experience />
      <HowIBuild />
      {/* Placeholder: replaced once Aditya supplies the images. */}
      <Section id={SECTION_IDS.beyond} index="07" title="Beyond the Screen">
        <p className="mt-6 max-w-md text-silver">Content coming soon.</p>
      </Section>
      <WhyIBuild />
      <Contact />
    </main>
  );
}
