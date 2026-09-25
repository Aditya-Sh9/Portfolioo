import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment } from "react";

type FlowProps = {
  /** Left to right. Nodes inside a stage stack: they sit at the same step of the request path. */
  stages: readonly {
    nodes: readonly { name: string; detail?: string }[];
  }[];
};

/** How the pieces connect, drawn from what the project's own docs state. Not a claim about anything else. */
export default function Flow({ stages }: FlowProps) {
  return (
    <ol className="flex flex-col gap-3 md:flex-row md:items-stretch">
      {stages.map((stage, i) => (
        <Fragment key={stage.nodes.map((n) => n.name).join("|")}>
          <li className="grid flex-1 content-center gap-3">
            {stage.nodes.map(({ name, detail }) => (
              <div key={name} className="border-2 border-steel bg-charcoal p-4">
                <p className="flex items-center gap-3 font-bold">
                  <span aria-hidden className="h-2 w-2 shrink-0 bg-accent" />
                  {name}
                </p>
                {detail && (
                  <p className="mt-1 pl-5 text-xs font-bold tracking-widest text-silver uppercase">
                    {detail}
                  </p>
                )}
              </div>
            ))}
          </li>
          {i < stages.length - 1 && (
            <li
              aria-hidden
              className="flex items-center justify-center text-interactive md:px-1"
            >
              <ArrowDown size={20} className="md:hidden" />
              <ArrowRight size={20} className="hidden md:block" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}
