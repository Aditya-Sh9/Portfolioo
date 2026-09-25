import { Film } from "lucide-react";
import Image from "next/image";
import Reveal from "@/animations/gsap/Reveal";

type VideoSlotProps = {
  /** An MP4 under /public. Until it exists the slot shows a "coming soon" panel over the poster. */
  src?: string;
  poster: string;
  /** What the walkthrough shows; the video's accessible name and the caption. */
  title: string;
};

/**
 * The case study's walkthrough video. With `src` it is a plain <video> with controls that loads
 * nothing until played (`preload="none"`) and never autoplays. Without it, a placeholder of the
 * same 16:9 size, so the layout does not move when the real video arrives.
 */
export default function VideoSlot({ src, poster, title }: VideoSlotProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
      <Reveal>
        <figure>
          <div className="relative aspect-video overflow-hidden border-2 border-bone bg-charcoal shadow-brutal">
            {src ? (
              <video
                controls
                playsInline
                preload="none"
                poster={poster}
                aria-label={title}
                className="h-full w-full object-cover"
              >
                <source src={src} type="video/mp4" />
              </video>
            ) : (
              <>
                <Image
                  src={poster}
                  alt=""
                  fill
                  sizes="(min-width: 1152px) 1120px, 100vw"
                  className="object-cover object-top opacity-25 grayscale"
                />
                <div
                  aria-hidden
                  className="texture-halftone absolute inset-0 opacity-50"
                />
                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <div>
                    <span
                      aria-hidden
                      className="mx-auto grid size-14 place-items-center border-2 border-bone bg-ink md:size-16"
                    >
                      <Film size={24} className="text-bone" />
                    </span>
                    <p className="mt-5 font-display text-4xl tracking-wide md:text-6xl">
                      Walkthrough
                    </p>
                    <p className="mt-2 text-xs font-bold tracking-widest text-silver uppercase">
                      Video coming soon
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <figcaption className="mt-4 text-sm text-silver">
            <span className="mr-3 font-bold tracking-widest text-bone uppercase">
              Demo
            </span>
            {title}
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
