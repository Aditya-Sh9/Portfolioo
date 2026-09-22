"use client";

import { Fragment, useId, useRef } from "react";
import {
  ChevronDown,
  Cpu,
  Database,
  Globe,
  Lock,
  Monitor,
  Server,
  type LucideIcon,
} from "lucide-react";
import { gsap, MOTION, MOTION_OK, useGSAP } from "@/animations/gsap";

export type ArchLayer = "client" | "core" | "service" | "data" | "external" | "auth";

export type ArchNode = {
  id: string;
  label: string;
  /** Deployment target or a short qualifier, e.g. "Railway", "stateless, decoupled". */
  detail?: string;
  layer: ArchLayer;
};

export type ArchEdge = {
  from: string;
  to: string;
  /** What the relationship is, in the project's own words, e.g. "Prisma", "Socket.io broadcast". */
  label?: string;
  /** Default styling if omitted is the same as "sync". */
  kind?: "sync" | "async" | "auth";
};

type ArchitectureDiagramProps = {
  /** id of the node acting as the hub — usually the backend/API layer. */
  core: string;
  nodes: readonly ArchNode[];
  edges: readonly ArchEdge[];
};

const LAYER_ICON: Record<ArchLayer, LucideIcon> = {
  client: Monitor,
  core: Server,
  service: Cpu,
  data: Database,
  external: Globe,
  auth: Lock,
};

const LAYER_LABEL: Record<ArchLayer, string> = {
  client: "Client",
  core: "API",
  service: "Service",
  data: "Data",
  external: "External",
  auth: "Auth",
};

function edgeKey(edge: ArchEdge) {
  return `${edge.from}->${edge.to}`;
}

/**
 * Hub-and-spoke system diagram for a case study's Architecture section: the backend/API node
 * at the centre, client and satellite services drawn as measured, curved SVG connectors (the
 * same DOM-measurement technique a Magic UI-style "animated beam" uses, reimplemented natively
 * — GSAP entrance, no Framer Motion, no looping gradient). Node and edge data is written per
 * project in its .mdx file, the same convention Flow/Spec already use; this component only
 * knows how to lay pieces out and connect them, never invents what those pieces are.
 * Reduced motion / no JS: everything renders in its final state, just without the draw-in.
 */
export default function ArchitectureDiagram({
  core,
  nodes,
  edges,
}: ArchitectureDiagramProps) {
  const uid = useId().replace(/:/g, "");
  /** Scopes GSAP's string-selector queries ([data-arch-node]/[data-arch-label]) across the
   * whole panel, including the labelled-connections list that sits below the SVG diagram. */
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const pathRefs = useRef(new Map<string, SVGPathElement>());
  const glowRefs = useRef(new Map<string, SVGPathElement>());

  const coreNode = nodes.find((n) => n.id === core);
  const clientNodes = nodes.filter((n) => n.layer === "client");
  const satelliteNodes = nodes.filter((n) => n.id !== core && n.layer !== "client");
  const stackedNodes = [...clientNodes, coreNode, ...satelliteNodes].filter(
    (n): n is ArchNode => Boolean(n),
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const computeLayout = () => {
        const containerRect = container.getBoundingClientRect();
        edges.forEach((edge) => {
          const fromEl = nodeRefs.current.get(edge.from);
          const toEl = nodeRefs.current.get(edge.to);
          const path = pathRefs.current.get(edgeKey(edge));
          if (!fromEl || !toEl || !path) return;

          const a = fromEl.getBoundingClientRect();
          const b = toEl.getBoundingClientRect();
          const startX = a.left - containerRect.left + a.width / 2;
          const startY = a.top - containerRect.top + a.height / 2;
          const endX = b.left - containerRect.left + b.width / 2;
          const endY = b.top - containerRect.top + b.height / 2;
          const midX = (startX + endX) / 2;
          const bow = (endY - startY) * 0.35;
          const d = `M ${startX},${startY} Q ${midX},${startY + bow} ${endX},${endY}`;
          path.setAttribute("d", d);
          glowRefs.current.get(edgeKey(edge))?.setAttribute("d", d);
        });
      };

      computeLayout();
      const ro = new ResizeObserver(computeLayout);
      ro.observe(container);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const pathEls = Array.from(pathRefs.current.values());
        const glowEls = Array.from(glowRefs.current.values());
        const glowLength = new Map<SVGPathElement, number>();

        pathEls.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        // A short bright segment (16% of the line) sits off the start of each path, then
        // travels the full length once — a comet, not a repeating shimmer.
        glowEls.forEach((g) => {
          const len = g.getTotalLength();
          glowLength.set(g, len);
          gsap.set(g, {
            opacity: 1,
            strokeDasharray: `${len * 0.16} ${len}`,
            strokeDashoffset: len,
          });
        });

        gsap
          .timeline({
            scrollTrigger: { trigger: container, start: "top 85%", once: true },
          })
          .to("[data-arch-node]", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: MOTION.ease,
            stagger: 0.07,
          })
          .to(
            pathEls,
            { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 },
            "-=0.25",
          )
          .to(
            glowEls,
            {
              strokeDashoffset: (_i, target: SVGPathElement) =>
                -(glowLength.get(target) ?? 0) * 1.1,
              duration: 0.7,
              ease: "power1.inOut",
              stagger: 0.08,
            },
            "<",
          )
          .to(glowEls, { opacity: 0, duration: 0.35, ease: "power1.in" }, "-=0.15")
          .to(
            "[data-arch-label]",
            { opacity: 1, duration: 0.35, ease: MOTION.ease, stagger: 0.05 },
            "-=0.3",
          );
      });

      return () => {
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: panelRef, dependencies: [core, nodes, edges] },
  );

  const renderNode = (node: ArchNode | undefined) => {
    if (!node) return null;
    const emphasized = node.id === core;
    const boundary = node.layer === "external" || node.layer === "auth";
    const Icon = LAYER_ICON[node.layer];

    return (
      <div
        key={node.id}
        ref={(el) => {
          if (el) nodeRefs.current.set(node.id, el);
        }}
        data-arch-node
        className={`relative flex items-start gap-3 border-2 bg-ink p-3.5 ${
          emphasized
            ? "panel-tint border-accent"
            : boundary
              ? "border-highlight"
              : "border-steel"
        }`}
      >
        <Icon
          aria-hidden
          size={18}
          className={`mt-0.5 shrink-0 ${emphasized ? "text-accent" : boundary ? "text-highlight" : "text-silver"}`}
        />
        <div>
          <p className="text-[0.65rem] font-bold tracking-widest text-silver uppercase">
            {LAYER_LABEL[node.layer]}
          </p>
          <p className="font-bold text-bone">{node.label}</p>
          {node.detail && <p className="mt-0.5 text-xs text-silver">{node.detail}</p>}
        </div>
      </div>
    );
  };

  return (
    <div ref={panelRef} className="border-2 border-steel bg-charcoal p-5 md:p-8">
      <div className="mb-6 flex items-center justify-between text-silver">
        <span className="flex items-center gap-2">
          <span aria-hidden className="hatch h-2.5 w-7" />
          <span className="text-[0.65rem] font-bold tracking-widest uppercase">
            System architecture
          </span>
        </span>
        <span aria-hidden className="reg-mark" />
      </div>

      {/* Desktop: hub-and-spoke diagram, connectors measured from the rendered node boxes. */}
      <div ref={containerRef} className="relative hidden md:block">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <marker
              id={`arch-arrow-sync-${uid}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" style={{ fill: "var(--color-steel)" }} />
            </marker>
            <marker
              id={`arch-arrow-async-${uid}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" style={{ fill: "var(--color-steel)" }} />
            </marker>
            <marker
              id={`arch-arrow-auth-${uid}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" style={{ fill: "var(--highlight)" }} />
            </marker>
          </defs>
          {edges.map((edge) => {
            const bright =
              edge.kind === "auth" || edge.kind === "async"
                ? "var(--highlight)"
                : "var(--accent)";
            return (
              <Fragment key={edgeKey(edge)}>
                <path
                  ref={(el) => {
                    if (el) pathRefs.current.set(edgeKey(edge), el);
                  }}
                  data-arch-edge
                  fill="none"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  style={{
                    stroke:
                      edge.kind === "auth" ? "var(--highlight)" : "var(--color-steel)",
                  }}
                  strokeDasharray={
                    edge.kind === "async" || edge.kind === "auth" ? "6 5" : undefined
                  }
                  markerEnd={`url(#arch-arrow-${edge.kind ?? "sync"}-${uid})`}
                />
                {/* One-shot light trail: travels once as the line above draws in, then fades. */}
                <path
                  ref={(el) => {
                    if (el) glowRefs.current.set(edgeKey(edge), el);
                  }}
                  data-arch-glow
                  fill="none"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  opacity={0}
                  style={{ stroke: bright, filter: `drop-shadow(0 0 3px ${bright})` }}
                />
              </Fragment>
            );
          })}
        </svg>

        <div className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-10">
          <div className="flex flex-col gap-5">{clientNodes.map(renderNode)}</div>
          <div className="flex flex-col items-stretch">{renderNode(coreNode)}</div>
          <div className="flex flex-col gap-4">{satelliteNodes.map(renderNode)}</div>
        </div>
      </div>

      {/* Tablet / mobile: a stacked flow, so connections never overlap text. */}
      <ol className="flex flex-col gap-3 md:hidden">
        {stackedNodes.map((node, i) => (
          <li key={node.id}>
            <div
              className={`border-2 bg-ink p-3.5 ${node.id === core ? "panel-tint border-accent" : node.layer === "external" || node.layer === "auth" ? "border-highlight" : "border-steel"}`}
            >
              <p className="text-[0.65rem] font-bold tracking-widest text-silver uppercase">
                {LAYER_LABEL[node.layer]}
              </p>
              <p className="font-bold text-bone">{node.label}</p>
              {node.detail && <p className="mt-0.5 text-xs text-silver">{node.detail}</p>}
            </div>
            {i < stackedNodes.length - 1 && (
              <div aria-hidden className="flex justify-center py-1 text-interactive">
                <ChevronDown size={16} />
              </div>
            )}
          </li>
        ))}
      </ol>

      {edges.some((e) => e.label) && (
        <ul className="mt-6 flex flex-col gap-1.5 border-t border-steel pt-4">
          {edges
            .filter((edge) => edge.label)
            .map((edge) => (
              <li
                key={edgeKey(edge)}
                data-arch-label
                className="text-xs leading-relaxed text-silver"
              >
                <span className="font-bold text-bone">
                  {nodes.find((n) => n.id === edge.from)?.label} →{" "}
                  {nodes.find((n) => n.id === edge.to)?.label}
                </span>{" "}
                — {edge.label}
              </li>
            ))}
        </ul>
      )}

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.65rem] font-bold tracking-widest text-silver uppercase">
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="h-px w-4 bg-steel" /> Sync
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="h-px w-4 border-t border-dashed border-steel" />{" "}
          Async
        </li>
        <li className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-px w-4 border-t border-dashed border-highlight"
          />{" "}
          Auth
        </li>
      </ul>
    </div>
  );
}
