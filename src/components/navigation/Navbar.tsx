"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { NAV_CTA, NAV_LINKS, SECTION_IDS, SITE } from "@/lib/constants";

/** Tracks which section crosses the middle of the viewport. Only runs on the home page. */
function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string>(SECTION_IDS.hero);

  useEffect(() => {
    if (!enabled) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}

/**
 * On the home page a plain <a> lets Lenis handle the in-page scroll. Anywhere else the same
 * link becomes a client-side navigation to the home page (`/#id`).
 */
function NavAnchor({
  onHome,
  href,
  ...props
}: ComponentPropsWithoutRef<"a"> & { onHome: boolean; href: string }) {
  return onHome ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

const SECTION_LIST = [SECTION_IDS.hero, ...NAV_LINKS.map((l) => l.id), NAV_CTA.id];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const onHome = usePathname() === "/";
  const observed = useActiveSection(SECTION_LIST, onHome);
  // Case studies live under Selected Work, so that is the section they belong to.
  const active = onHome ? observed : SECTION_IDS.work;
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = (id: string) =>
    [
      "px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-200",
      active === id ? "bg-accent text-bone" : "text-silver hover:text-bone",
    ].join(" ");

  return (
    <>
      <a
        href="#main"
        className="sr-only bg-bone px-4 py-2 text-sm font-bold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-4 top-4 z-50 mx-auto max-w-6xl">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between border-2 border-steel bg-charcoal/80 px-4 py-2 backdrop-blur-md"
        >
          <NavAnchor
            onHome={onHome}
            href={onHome ? `#${SECTION_IDS.hero}` : "/"}
            className="text-sm font-bold tracking-tight uppercase"
            onClick={() => setOpen(false)}
          >
            {SITE.name}
          </NavAnchor>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <NavAnchor
                  onHome={onHome}
                  href={hrefFor(link.id)}
                  className={linkClass(link.id)}
                  aria-current={active === link.id ? "location" : undefined}
                >
                  {link.label}
                </NavAnchor>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <NavAnchor
              onHome={onHome}
              href={hrefFor(NAV_CTA.id)}
              className="hidden border-2 border-bone px-4 py-1.5 text-xs font-bold tracking-widest text-bone uppercase shadow-brutal-sm transition-transform duration-150 hover:-translate-x-px hover:-translate-y-px hover:bg-accent active:translate-x-[3px] active:translate-y-[3px] active:shadow-none lg:inline-block"
            >
              {NAV_CTA.label}
            </NavAnchor>
            <button
              type="button"
              className="border-2 border-steel p-2 text-bone transition-colors duration-150 hover:border-interactive lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          inert={!open}
          data-open={open}
          className="pointer-events-none mt-2 origin-top -translate-y-2 border-2 border-steel bg-charcoal/90 opacity-0 backdrop-blur-md transition-[opacity,transform] duration-200 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100 lg:hidden"
        >
          <ul className="divide-y-2 divide-steel">
            {[...NAV_LINKS, NAV_CTA].map((link) => (
              <li key={link.id}>
                <NavAnchor
                  onHome={onHome}
                  href={hrefFor(link.id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={`flex items-baseline gap-4 px-4 py-3 text-sm font-bold tracking-widest uppercase ${
                    active === link.id ? "bg-accent text-bone" : "text-silver"
                  }`}
                >
                  <span className="w-5 shrink-0 text-xs tabular-nums opacity-60">
                    {link.index}
                  </span>
                  {link.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
