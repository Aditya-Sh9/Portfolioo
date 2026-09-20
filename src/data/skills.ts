export type SkillGroup = {
  id: string;
  title: string;
  items: readonly string[];
};

/**
 * Grouped, never rated: no bars, levels or percentages. Sources: CV skills plus the stacks
 * documented for SOLACE, Lexium and Pulse. Names must match `data/tech.ts` to get a logo and
 * `data/projects.ts` stacks to show which projects use them.
 */
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML & CSS",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "Laravel",
      "PHP",
      "FastAPI",
      "Socket.io",
      "Firebase Authentication",
    ],
  },
  {
    id: "data",
    title: "Data",
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Prisma",
      "Firebase",
      "scikit-learn",
    ],
  },
  {
    id: "tools",
    title: "Tools & Delivery",
    items: ["Git", "GitHub", "Postman", "Docker", "Vercel", "Railway"],
  },
];

/**
 * The main technologies, in the order the rail shows them. Every name is one already in
 * SKILL_GROUPS and in data/tech.ts (so each has a logo); nothing is here only to fill space.
 */
export const TECH_RAIL: readonly string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "FastAPI",
  "PHP",
  "Laravel",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Supabase",
  "Prisma",
  "Git",
  "GitHub",
  "Docker",
  "Vercel",
];

/** CV "Core CS Fundamentals" plus the C/C++ language entry, and REST APIs (a concept, not a product). */
export const CORE_FOUNDATIONS: readonly string[] = [
  "C/C++",
  "DBMS",
  "SQL",
  "Operating Systems",
  "Computer Networks",
  "OOP",
  "REST APIs",
];
