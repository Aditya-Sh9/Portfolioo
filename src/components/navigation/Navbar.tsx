"use client";

import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
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
  const menuButton = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const onHome = usePathname() === "/";
  const observed = useActiveSection(SECTION_LIST, onHome);
  // Case studies live under Selected Work, so that is the section they belong to.
  const active = onHome ? observed : SECTION_IDS.work;
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // While the menu is open the page behind it is locked (Lenis, plus plain overflow for the
  // no-Lenis case), Escape closes it and hands focus back to the button, and it closes by
  // itself if the viewport grows into the desktop layout. Outside taps land on the scrim.
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    lenis?.stop();

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    desktop.addEventListener("change", onDesktop);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = previousOverflow;
      lenis?.start();
      desktop.removeEventListener("change", onDesktop);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  // Active = bone text with a red bar sitting on the navbar's bottom border. (Bone on a red
  // fill is 4.16:1, under AA for this size, so the red carries the state as a shape instead.)
  const linkClass = (id: string) =>
    [
      "relative inline-block px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-200 pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center",
      active === id
        ? "text-bone after:absolute after:inset-x-2 after:-bottom-2 after:h-[3px] after:bg-accent"
        : "text-silver hover:text-bone",
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
        {/* Outside-tap target for the mobile menu; sits behind the header's own content. */}
        <div
          aria-hidden
          data-open={open}
          onClick={() => setOpen(false)}
          className="pointer-events-none fixed inset-0 -z-10 bg-ink/70 opacity-0 transition-opacity duration-200 data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 lg:hidden"
        />

        <nav
          aria-label="Primary"
          className="flex items-center justify-between border-2 border-steel bg-charcoal/80 px-4 py-2 backdrop-blur-md"
        >
          <NavAnchor
            onHome={onHome}
            href={onHome ? `#${SECTION_IDS.hero}` : "/"}
            className="inline-flex min-h-11 items-center text-sm font-bold tracking-tight uppercase lg:min-h-0"
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
              className="hidden border-2 border-bone px-4 py-1.5 text-xs font-bold tracking-widest text-bone uppercase shadow-brutal-sm transition-transform duration-150 hover:-translate-x-px hover:-translate-y-px hover:bg-bone hover:text-ink active:translate-x-[3px] active:translate-y-[3px] active:shadow-none lg:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center"
            >
              {NAV_CTA.label}
            </NavAnchor>
            <button
              ref={menuButton}
              type="button"
              className="flex size-11 items-center justify-center border-2 border-steel text-bone transition-colors duration-150 hover:border-interactive lg:hidden"
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
          className="pointer-events-none mt-2 origin-top -translate-y-2 border-2 border-steel bg-charcoal/95 opacity-0 backdrop-blur-md transition-[opacity,transform] duration-200 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100 lg:hidden"
        >
          <ul className="divide-y-2 divide-steel">
            {[...NAV_LINKS, NAV_CTA].map((link) => (
              <li key={link.id}>
                <NavAnchor
                  onHome={onHome}
                  href={hrefFor(link.id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={`flex min-h-11 items-baseline gap-4 px-4 py-3 text-sm font-bold tracking-widest uppercase ${
                    active === link.id
                      ? "bg-ink text-bone shadow-[inset_4px_0_0_0_var(--accent)]"
                      : "text-silver"
                  }`}
                >
                  <span className="w-5 shrink-0 text-xs tabular-nums">{link.index}</span>
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
