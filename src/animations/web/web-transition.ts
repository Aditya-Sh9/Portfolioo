import type Lenis from "lenis";
import { gsap, MOTION_OK } from "@/animations/gsap";

/**
 * The web transition between case studies (design system §4). A web shoots from the edge the
 * user is heading toward, attaches to the panel that was clicked and tugs it that way, while an
 * ink slab (page-coloured, with a halftone edge and a bone rule) sweeps across and covers the
 * page. The route changes under the slab, which then leaves the way it came, and the new page's
 * own entrance (the CSS `data-hero` reveal) plays as it clears. Then everything is removed: the
 * web is never a permanent graphic.
 *
 * This is the engine only: `WebTransition` renders the overlay and registers it here, `WebLink`
 * starts a run. One GSAP timeline per phase, everything on transform, opacity and SVG geometry,
 * no React state. It never blocks navigation: without the overlay, or under reduced motion, a
 * link just navigates, and a route that is slow to arrive times out and the slab leaves anyway.
 */

export type WebDirection = "next" | "previous";

export type WebOverlay = { root: HTMLElement; svg: SVGSVGElement; slab: HTMLElement };

type Timeline = ReturnType<typeof gsap.timeline>;

/** Longest we wait for the new route before uncovering the page regardless. */
const ROUTE_TIMEOUT_MS = 2500;
/** Lean of the slab's leading edge, degrees. The overhang keeps the slanted edge off-screen. */
const SKEW = 12;
const OVERHANG = Math.tan((SKEW * Math.PI) / 180) / 2;

let overlay: WebOverlay | null = null;
let lenis: Lenis | null = null;
let busy = false;
let routeArrived: (() => void) | null = null;
let timeline: Timeline | null = null;

export function registerOverlay(next: WebOverlay | null) {
  if (next === null) reset();
  overlay = next;
}

export function registerLenis(next: Lenis | null) {
  lenis = next;
}

/** Called by `WebTransition` whenever the pathname changes. */
export function notifyRoute() {
  routeArrived?.();
}

/** True when a link may run the transition: overlay mounted, idle, and motion allowed. */
export function canWebTransition() {
  return overlay !== null && !busy && window.matchMedia(MOTION_OK).matches;
}

type Run = {
  /** The panel the web attaches to and pulls. */
  anchor: HTMLElement;
  direction: WebDirection;
  navigate: () => void;
};

export async function startWebTransition({ anchor, direction, navigate }: Run) {
  const current = overlay;
  if (!current || busy) {
    navigate();
    return;
  }

  busy = true;
  const html = document.documentElement;
  const web = lay(current, anchor, direction);
  lenis?.stop();
  // Holds the incoming page's CSS entrance until the slab starts to clear (see globals.css).
  html.setAttribute("data-web-transition", "");
  current.root.hidden = false;

  let navigated = false;
  try {
    await playOut(current, web);

    const arrived = waitForRoute();
    navigated = true;
    navigate();
    await arrived;
    await frames(2);

    // Under the slab: hide the web, put the new page at the top, then let the entrance start.
    gsap.set(current.svg.querySelectorAll("[data-strand], [data-thread], [data-node]"), {
      opacity: 0,
    });
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    html.removeAttribute("data-web-transition");
    await playIn(current, web);
  } catch {
    // Whatever went wrong, the visitor still gets where they clicked.
    if (!navigated) navigate();
  } finally {
    finish(current, anchor);
  }
}

type Web = ReturnType<typeof lay>;

/** Sizes the slab, builds the web from the anchor's box, and returns what the timelines need. */
function lay({ svg, slab }: WebOverlay, anchor: HTMLElement, direction: WebDirection) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const sign = direction === "next" ? 1 : -1;
  const overhang = H * OVERHANG;
  const rect = anchor.getBoundingClientRect();

  // Slab: `next` enters from the right and leaves to the left; `previous` mirrors it.
  const slabWidth = W + overhang * 4;
  slab.dataset.dir = direction;
  slab.style.width = `${slabWidth}px`;
  gsap.set(slab, { x: sign * (W + overhang + 2), skewX: -sign * SKEW });

  // Web: three strands fanned from the origin edge to points just inside the panel's near edge,
  // with two sagging cross-threads between them and a small node where each strand lands.
  const originX = sign === 1 ? 0 : W;
  const attachX = (sign === 1 ? rect.left : rect.right) + sign * 18;
  const top = Math.max(rect.top, 96);
  const bottom = Math.min(rect.bottom, H - 32);
  const mid = (top + bottom) / 2;
  const half = Math.max(bottom - top, 120) / 2;
  const attachY = [-0.62, 0, 0.62].map((t) => mid + t * half);
  const originY = attachY.map((y, i) => Math.min(H, Math.max(0, y + (i - 1) * H * 0.14)));
  const pull = Math.min(W * 0.1, 140);

  const strands = [...svg.querySelectorAll<SVGLineElement>("[data-strand]")];
  const threads = [...svg.querySelectorAll<SVGPathElement>("[data-thread]")];
  const nodes = [...svg.querySelectorAll<SVGCircleElement>("[data-node]")];
  const along = [0.55, 0.75];

  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  gsap.set([...strands, ...threads], { strokeDashoffset: 1, opacity: 1 });
  gsap.set(nodes, { opacity: 0, attr: { r: 0 } });

  /** Puts the whole web where it is when the panel has been pulled `t` pixels. */
  const draw = (t: number) => {
    const x = attachX - sign * t;
    strands.forEach((line, i) => {
      line.setAttribute("x1", String(originX));
      line.setAttribute("y1", String(originY[i]));
      line.setAttribute("x2", String(x));
      line.setAttribute("y2", String(attachY[i]));
      nodes[i]?.setAttribute("cx", String(x));
      nodes[i]?.setAttribute("cy", String(attachY[i]));
    });
    threads.forEach((path, j) => {
      const f = along[j] ?? 0.6;
      const at = (i: number) => [
        originX + (x - originX) * f,
        originY[i] + (attachY[i] - originY[i]) * f,
      ];
      const [ax, ay] = at(j);
      const [bx, by] = at(j + 1);
      const sag = Math.abs(x - originX) * 0.06;
      path.setAttribute(
        "d",
        `M${ax} ${ay} Q${(ax + bx) / 2 + sign * sag} ${(ay + by) / 2} ${bx} ${by}`,
      );
    });
  };
  draw(0);

  return {
    draw,
    pull,
    sign,
    anchor,
    coverX: -sign * (overhang + 2),
    exitX: -sign * (slabWidth + overhang + 2),
  };
}

function playOut({ svg, slab }: WebOverlay, web: Web) {
  const strands = svg.querySelectorAll("[data-strand]");
  const threads = svg.querySelectorAll("[data-thread]");
  const nodes = svg.querySelectorAll("[data-node]");
  const tug = { t: 0 };

  return new Promise<void>((resolve) => {
    timeline = gsap
      .timeline({ onComplete: resolve })
      .to(
        strands,
        { strokeDashoffset: 0, duration: 0.2, ease: "power2.out", stagger: 0.025 },
        0,
      )
      .to(
        threads,
        { strokeDashoffset: 0, duration: 0.16, ease: "power2.out", stagger: 0.04 },
        0.12,
      )
      .to(
        nodes,
        {
          opacity: 1,
          attr: { r: 6 },
          duration: 0.14,
          ease: "power2.out",
          stagger: 0.025,
        },
        0.16,
      )
      .to(
        tug,
        {
          t: web.pull,
          duration: 0.34,
          ease: "power2.in",
          onUpdate: () => {
            web.draw(tug.t);
            gsap.set(web.anchor, { x: -web.sign * tug.t });
          },
        },
        0.2,
      )
      .to(slab, { x: web.coverX, duration: 0.36, ease: "power2.inOut" }, 0.16);
  });
}

function playIn({ slab }: WebOverlay, web: Web) {
  return new Promise<void>((resolve) => {
    timeline = gsap
      .timeline({ onComplete: resolve })
      .to(slab, { x: web.exitX, duration: 0.6, ease: "power3.out" });
  });
}

/** Everything back to rest: overlay hidden, web reset, scrolling and focus handed back. */
function finish({ root, svg, slab }: WebOverlay, anchor: HTMLElement) {
  timeline?.kill();
  timeline = null;
  gsap.set(anchor, { clearProps: "transform" });
  gsap.set(slab, { clearProps: "transform" });
  gsap.set(svg.querySelectorAll("[data-strand], [data-thread]"), {
    strokeDashoffset: 1,
    opacity: 1,
  });
  gsap.set(svg.querySelectorAll("[data-node]"), { opacity: 0, attr: { r: 0 } });
  root.hidden = true;
  document.documentElement.removeAttribute("data-web-transition");
  lenis?.start();
  routeArrived = null;
  busy = false;

  // A client-side navigation leaves focus on a link that no longer exists: give it to the page.
  const main = document.getElementById("main");
  if (main) {
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
  }
}

/** Puts an interrupted run back to rest (the overlay is being unmounted). */
function reset() {
  if (!busy || !overlay) return;
  timeline?.kill();
  finish(overlay, document.body);
}

function waitForRoute() {
  return new Promise<void>((resolve) => {
    const done = () => {
      window.clearTimeout(timer);
      routeArrived = null;
      resolve();
    };
    const timer = window.setTimeout(done, ROUTE_TIMEOUT_MS);
    routeArrived = done;
  });
}

function frames(count: number) {
  return new Promise<void>((resolve) => {
    let left = count;
    const tick = () => (--left <= 0 ? resolve() : requestAnimationFrame(tick));
    requestAnimationFrame(tick);
  });
}
