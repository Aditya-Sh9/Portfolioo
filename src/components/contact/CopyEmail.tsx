"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Copies the address to the clipboard. The only state is a two-second "copied" flag, set on
 * click; a polite live region announces it to screen readers. If the clipboard is blocked the
 * button simply does nothing (the address is a normal mailto link right next to it).
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard unavailable or denied; nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-9 items-center gap-2 border-2 border-steel bg-ink px-3 text-xs font-bold tracking-widest text-silver uppercase transition-colors duration-150 hover:border-accent hover:text-bone active:translate-x-px active:translate-y-px pointer-coarse:min-h-11"
    >
      {copied ? (
        <Check aria-hidden size={16} className="text-accent" />
      ) : (
        <Copy aria-hidden size={16} />
      )}
      {copied ? "Copied" : "Copy"}
      <span className="sr-only"> email address</span>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
