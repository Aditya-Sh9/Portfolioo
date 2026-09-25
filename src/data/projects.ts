export type ProjectAccent = "red" | "blue" | "bone";
/** Secondary highlight (5%). Maps to `data-highlight`; both values are existing palette tokens. */
export type ProjectHighlight = "gold" | "bone";

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Optional one-line hook, shown where a project is featured. */
  tagline?: string;
  description: string;
  period: string;
  status: "In active development" | "Live";
  stack: readonly string[];
  /** Verified figures only (CV, Projects.md or Aditya's confirmation). */
  facts: readonly { value: string; label: string }[];
  accent: ProjectAccent;
  highlight: ProjectHighlight;
  links: { github: string; live?: string };
  /** Case-study at-a-glance strip; shown only when set. */
  role?: string;
  team?: string;
  /** Flip to true when `/projects/<slug>` exists (build step 10); the link is hidden until then. */
  hasCaseStudy: boolean;
};

export type Phase = { number: number; name: string; done: boolean; current?: boolean };

export type ActiveProject = Project & { phases: readonly Phase[] };

export const SOLACE: ActiveProject = {
  slug: "solace",
  title: "SOLACE",
  category: "AI Wellness Platform",
  tagline:
    "You’re not imagining it. There’s more to how you feel — and maybe a pattern in it.",
  description:
    "An emotionally intelligent AI wellness companion that helps you notice the quiet, hard-to-name things — low energy, brain fog, mood swings — and surfaces honest, non-clinical patterns in your own data, without ever diagnosing or prescribing.",
  period: "May 2026 — Present",
  status: "In active development",
  stack: [
    "Next.js",
    "TypeScript",
    "Express",
    "FastAPI",
    "scikit-learn",
    "PostgreSQL",
    "Supabase",
    "Prisma",
    "Gemini API",
  ],
  facts: [
    { value: "149", label: "Automated tests" },
    { value: "3", label: "Deployed services" },
  ],
  accent: "red",
  highlight: "gold",
  links: {
    github: "https://github.com/Aditya-Sh9/Solace",
    live: "https://solace-frontend-yk6x.vercel.app",
  },
  role: "Design and development, end to end",
  team: "Solo",
  hasCaseStudy: true,
  // Source: the SOLACE repo state.md (2026-09-24): Phase 5 sub-phase 5a (encrypted journal
  // backend) is done, the journal UI is not. It stays a labelled roadmap, never a card headline.
  phases: [
    { number: 0, name: "Monorepo, deploy pipeline, Supabase", done: true },
    { number: 1, name: "Auth + animated onboarding", done: true },
    { number: 2, name: "Daily check-in + dashboard", done: true },
    { number: 3, name: "Rule engine + Gemini insights", done: true },
    { number: 4, name: "Personal ML pattern model", done: true },
    { number: 5, name: "Encrypted journal", done: false, current: true },
    { number: 6, name: "Women’s wellness section", done: false },
    { number: 7, name: "Polish, accessibility, docs, deploy hardening", done: false },
  ],
};

export const LEXIUM: Project = {
  slug: "lexium",
  title: "Lexium",
  category: "Legal Services Marketplace",
  description:
    "A full-stack marketplace connecting citizens with verified legal professionals, covering the whole journey from finding a provider and booking a consultation to filing a case, tracking it, leaving a review and releasing the escrowed payment.",
  period: "Apr 2026 — May 2026",
  status: "Live",
  // Stack per the Lexium README, plus Docker (confirmed by Aditya, 2026-09-20).
  stack: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Laravel",
    "PHP",
    "MongoDB",
    "Firebase Authentication",
    "Docker",
  ],
  facts: [
    { value: "6", label: "Provider types" },
    { value: "3", label: "User roles" },
    { value: "50+", label: "Test transactions" },
  ],
  accent: "bone",
  highlight: "gold",
  links: {
    github: "https://github.com/Aditya-Sh9/Lexium",
    live: "https://lexium-law.vercel.app/",
  },
  role: "Design and development, end to end",
  team: "Solo",
  hasCaseStudy: true,
};

export const PULSE: Project = {
  slug: "pulse",
  title: "Pulse",
  category: "Project Management Platform",
  description:
    "A full-stack task management platform for teams to organize, track and collaborate on projects, with real-time updates, team messaging, analytics dashboards, role-based access control, and Board, List, Table and Calendar views.",
  period: "Feb 2026 — Apr 2026",
  status: "Live",
  stack: ["MongoDB", "Express", "React", "Node.js", "Firebase", "Socket.io"],
  facts: [
    // Bebas has no lowercase, so the unit lives in the label.
    { value: "<2", label: "Sec. update latency" },
    { value: "4", label: "Task views" },
    { value: "10", label: "Test workspaces" },
  ],
  accent: "blue",
  highlight: "gold",
  links: {
    github: "https://github.com/Aditya-Sh9/Pulse",
    live: "https://pulse-sigma-amber.vercel.app/",
  },
  role: "Design and development, end to end",
  team: "Solo",
  hasCaseStudy: true,
};

/** Selected Work order. */
export const PROJECTS: readonly Project[] = [SOLACE, LEXIUM, PULSE];
