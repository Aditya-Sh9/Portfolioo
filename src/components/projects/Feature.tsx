import type { ReactNode } from "react";
import Reveal from "@/animations/gsap/Reveal";
import Screen from "@/components/projects/Screen";

type FeatureProps = {
  index: string;
  title: string;
  image: { src: string; alt: string; width: number; height: number };
  /** Puts the screenshot on the right (lg+), so consecutive features alternate. */
  reverse?: boolean;
  children: ReactNode;
};

/** One feature row in a wide case section: a screenshot beside its explanation. */
export default function Feature({
  index,
  title,
  image,
  reverse = false,
  children,
}: FeatureProps) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Screen
        {...image}
        label={`Fig. ${index}`}
        className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
      />
      <Reveal className="lg:col-span-5">
        <p aria-hidden className="font-display text-5xl leading-none text-accent">
          {index}
        </p>
        <h3 className="mt-2 font-display text-3xl leading-none tracking-wide md:text-4xl">
          {title}
        </h3>
        <div className="mt-5 space-y-4">{children}</div>
      </Reveal>
    </div>
  );
}
