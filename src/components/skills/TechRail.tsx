import Reveal from "@/animations/gsap/Reveal";
import TechLogo from "@/components/ui/TechLogo";
import { TECH_RAIL } from "@/data/skills";
import { techFor } from "@/data/tech";

const RAIL = TECH_RAIL.flatMap((name) => {
  const tech = techFor(name);
  return tech ? [{ name, ...tech }] : [];
});

/**
 * A slow, continuous rail of the main technologies (logos only, monochrome). Pure CSS: the
 * track holds two identical groups and slides left by exactly one group, so the loop is
 * seamless with no JavaScript and no React state. The second group is a decoration and hidden
 * from assistive tech; the first is the real list, with each logo's name as its label.
 * Motion, edge fades and the reduced-motion fallback (a static, wrapped grid) are in
 * globals.css under "Technology rail".
 */
export default function TechRail() {
  return (
    <Reveal className="mt-10">
      <div className="border-2 border-steel bg-ink">
        <div className="tech-rail py-4">
          <div className="tech-rail-track">
            <RailGroup />
            <RailGroup copy />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function RailGroup({ copy = false }: { copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      aria-label={copy ? undefined : "Technologies I build with"}
      className={`tech-rail-group ${copy ? "tech-rail-copy" : ""}`}
    >
      {RAIL.map(({ name, label, icons }) => (
        <li key={name}>
          <span
            role={copy ? undefined : "img"}
            aria-label={copy ? undefined : label}
            className="flex size-14 items-center justify-center border border-steel border-t-bone/15 bg-charcoal text-silver transition-colors duration-150 hover:border-accent hover:text-bone"
          >
            <TechLogo icons={icons} className="size-7" />
          </span>
        </li>
      ))}
    </ul>
  );
}
