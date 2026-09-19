export type SkillGroup = {
  id: string;
  title: string;
  items: readonly string[];
};

/**
 * Grouped, never rated: no bars, levels or percentages. Sources: CV skills plus the stacks
 * documented for SOLACE, Lexium and Pulse.
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
      "REST APIs",
      "Socket.io",
      "Firebase Authentication",
    ],
  },
  {
    id: "data",
    title: "Data",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Prisma", "scikit-learn"],
  },
  {
    id: "tools",
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Docker", "Vercel", "Railway"],
  },
];

/** CV "Core CS Fundamentals" plus the C/C++ language entry. */
export const CORE_FOUNDATIONS: readonly string[] = [
  "C/C++",
  "DBMS",
  "SQL",
  "Operating Systems",
  "Computer Networks",
  "OOP",
];
