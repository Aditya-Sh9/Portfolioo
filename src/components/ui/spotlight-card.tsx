"use client";

import { useRef, type ComponentPropsWithoutRef, type PointerEvent } from "react";

type SpotlightCardProps = Omit<ComponentPropsWithoutRef<"div">, "onPointerMove"> & {
  as?: "div" | "article";
};

/**
 * A card that catches a soft light under the pointer: a faint wash across the face and a
 * brighter rim on the border. Colour comes from the surrounding theme, never from props, so
 * put `data-accent` / `data-highlight` on the card (the accent lights the wash and rim, the
 * highlight is the small hot core on the rim). The glow layers are styled in `globals.css`
 * ("Spotlight card"); this component only feeds them the pointer position, relative to the
 * card, through `--sx` / `--sy`.
 *
 * Adapted from a pasted spotlight-card. Kept: the pointer-following glow and the lit border.
 * Dropped: per-card injected <style>, the document-wide listener, `background-attachment:
 * fixed` (breaks under transforms), `touch-action: none` (it would block scrolling on phones),
 * hard-coded hues, blur and rounding. Fine pointers only; touch never shows the glow.
 */
export default function SpotlightCard({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: SpotlightCardProps) {
  const frame = useRef(0);

  function follow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const { clientX, clientY } = event;

    // One write per frame, from the latest event.
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--sx", `${clientX - box.left}px`);
      card.style.setProperty("--sy", `${clientY - box.top}px`);
    });
  }

  return (
    <Tag
      {...rest}
      onPointerMove={follow}
      className={`spotlight relative isolate ${className}`}
    >
      {children}
      <span aria-hidden className="spotlight-layer spotlight-wash" />
      <span aria-hidden className="spotlight-layer spotlight-rim" />
    </Tag>
  );
}
