"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import {
  canWebTransition,
  startWebTransition,
  type WebDirection,
} from "@/animations/web/web-transition";

type WebLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** "next" heads forward (the web comes from the left, the new page from the right); "previous" mirrors it. */
  direction: WebDirection;
};

/**
 * A `next/link` that runs the web transition. It attaches to the nearest panel that is marked
 * `data-web-anchor` (the pager panels) or `data-project` (a project card). Anything else falls
 * back to a normal navigation: modifier and middle clicks, new-tab links, reduced motion, a
 * transition already running, or no panel to attach to. Keyboard activation works as a click.
 */
export default function WebLink({ href, direction, onClick, ...rest }: WebLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (rest.target && rest.target !== "_self") return;
        if (!canWebTransition()) return;

        const anchor = event.currentTarget.closest<HTMLElement>(
          "[data-web-anchor], [data-project]",
        );
        if (!anchor) return;

        event.preventDefault();
        void startWebTransition({ anchor, direction, navigate: () => router.push(href) });
      }}
    />
  );
}
