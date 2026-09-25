/**
 * Technology name -> logo. The files live in `public/icons/tech/` and are one-colour SVGs:
 * Devicon "plain" (MIT, devicon.dev) where one exists, otherwise Simple Icons (CC0,
 * simpleicons.org). They are drawn as masks (`.tech-icon`), so their colour comes from the
 * theme and never from the brand. A name with no entry here has no logo and stays as text.
 */
export type Tech = {
  /** Accessible name and tooltip; defaults to the name used in the data. */
  label?: string;
  /** File names without extension. More than one is drawn side by side. */
  icons: readonly string[];
};

const TECH: Record<string, Tech> = {
  // Frontend
  React: { icons: ["react"] },
  "Next.js": { icons: ["nextjs"] },
  TypeScript: { icons: ["typescript"] },
  JavaScript: { icons: ["javascript"] },
  "Tailwind CSS": { icons: ["tailwindcss"] },
  "HTML & CSS": { icons: ["html5", "css3"] },
  Bootstrap: { icons: ["bootstrap"] },
  Vite: { icons: ["vite"] },

  // Backend
  "Node.js": { icons: ["nodejs"] },
  Express: { icons: ["express"] },
  Laravel: { icons: ["laravel"] },
  PHP: { icons: ["php"] },
  FastAPI: { icons: ["fastapi"] },
  "Socket.io": { icons: ["socketio"] },
  Firebase: { icons: ["firebase"] },
  "Firebase Authentication": { icons: ["firebase"] },
  WordPress: { icons: ["wordpress"] },

  // Data
  MongoDB: { icons: ["mongodb"] },
  PostgreSQL: { icons: ["postgresql"] },
  MySQL: { icons: ["mysql"] },
  Supabase: { icons: ["supabase"] },
  Prisma: { icons: ["prisma"] },
  "scikit-learn": { icons: ["scikitlearn"] },
  "Gemini API": { icons: ["gemini"] },

  // Tools
  Git: { icons: ["git"] },
  GitHub: { icons: ["github"] },
  Postman: { icons: ["postman"] },
  Docker: { icons: ["docker"] },
  Vercel: { icons: ["vercel"] },
  Railway: { icons: ["railway"] },

  // Spellings used in the CV-derived Experience data.
  ExpressJS: { label: "Express", icons: ["express"] },
  ReactJS: { label: "React", icons: ["react"] },
  NodeJS: { label: "Node.js", icons: ["nodejs"] },
};

export function techFor(name: string): (Tech & { label: string }) | undefined {
  const tech = TECH[name];
  return tech && { ...tech, label: tech.label ?? name };
}
