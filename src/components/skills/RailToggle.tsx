"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

/**
 * Pause / play for the technology rail (WCAG 2.2.2: moving content that starts on its own needs
 * a way to stop it that works without a mouse). The rail is server-rendered, so this leaf only
 * flips `data-paused` on its `[data-rail]` ancestor; the CSS ("Technology rail" in globals.css)
 * does the pausing. The label stays fixed and `aria-pressed` carries the state. Hidden when
 * reduced motion or missing JS means there is nothing to pause.
 */
export default function RailToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  function toggle() {
    const next = !paused;
    buttonRef.current
      ?.closest<HTMLElement>("[data-rail]")
      ?.setAttribute("data-paused", String(next));
    setPaused(next);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-pressed={paused}
      onClick={toggle}
      className="rail-toggle flex w-14 shrink-0 items-center justify-center border-l-2 border-steel text-silver transition-colors duration-150 hover:bg-charcoal hover:text-bone aria-pressed:text-bone"
    >
      {paused ? <Play aria-hidden size={18} /> : <Pause aria-hidden size={18} />}
      <span className="sr-only">Pause technology rail</span>
    </button>
  );
}
