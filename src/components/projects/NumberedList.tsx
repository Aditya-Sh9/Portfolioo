import Reveal from "@/animations/gsap/Reveal";

type NumberedListProps = {
  items: readonly { title?: string; body: string }[];
};

/** Big accent numerals beside short write-ups: challenges, lessons. */
export default function NumberedList({ items }: NumberedListProps) {
  return (
    <Reveal as="ol" stagger={0.08} className="grid gap-8">
      {items.map(({ title, body }, i) => (
        <li
          key={title ?? body}
          className="grid gap-3 border-t-2 border-steel pt-5 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
        >
          <span aria-hidden className="font-display text-5xl leading-none text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            {title && (
              <h3 className="text-xl leading-snug font-bold text-bone">{title}</h3>
            )}
            <p
              className={`max-w-2xl leading-relaxed text-silver ${title ? "mt-2" : "text-lg"}`}
            >
              {body}
            </p>
          </div>
        </li>
      ))}
    </Reveal>
  );
}
