export const SITE = {
  name: "Aditya Sharma",
  role: "Full-Stack Developer / Software Engineer",
} as const;

export const SITE_DESCRIPTION =
  "Portfolio of Aditya Sharma, full-stack developer and software engineer.";

/** Social preview image (public/og.png, 1200x630). Repeated wherever a page sets its own `openGraph`. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.role}`,
} as const;

export const HERO_COPY = {
  firstName: "Aditya",
  lastName: "Sharma",
  statement:
    "I build digital experiences where engineering meets creativity — products that work well, feel intentional, and have a personality of their own.",
  // Easter egg: shown without attribution by design.
  quote: "Why do we fall, sir? So that we can learn to pick ourselves up.",
} as const;

// Copy written by Aditya; do not rewrite.
export const ABOUT_COPY = {
  headline: "I build things from both sides of the screen.",
  paragraphs: [
    "I’m Aditya, a Computer Science and Engineering student focused on building full-stack digital experiences where engineering meets creativity. I enjoy working across the stack — from designing responsive interfaces and interactions to building APIs, databases, authentication systems, and the infrastructure behind them.",
    "I’ve built products ranging from legal-tech marketplaces and real-time project management platforms to AI-powered applications. I’m particularly interested in the space where engineering, product thinking, and visual design overlap — building things that aren’t just functional, but feel intentional to use.",
  ],
  // Stack lines follow the approved wireframe.
  stack: [
    { label: "Frontend", items: "React · Next.js · TS" },
    { label: "Backend", items: "Node · Express · APIs" },
  ],
} as const;

// Copy written by Aditya; do not rewrite.
export const WHY_COPY = {
  paragraphs: [
    "I’ve always enjoyed taking an idea that exists only in my head and turning it into something people can actually see, use, and interact with.",
    "For me, building isn’t just about writing code. It’s about figuring things out, making something feel right, breaking it, fixing it, and eventually looking at it and thinking — yeah, this works.",
  ],
  closing: "I build because I like the process of turning “what if?” into “here it is.”",
} as const;

/** Section anchor ids. Sections on the page must use these ids. */
export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  building: "building",
  work: "work",
  experience: "experience",
  build: "how-i-build",
  beyond: "beyond-the-screen",
  why: "why-i-build",
  contact: "contact",
} as const;

/** Navigation entries in page order. `index` matches the 01–09 section numbering. */
export const NAV_LINKS = [
  { id: SECTION_IDS.about, index: "02", label: "About" },
  { id: SECTION_IDS.work, index: "03", label: "Work" },
  { id: SECTION_IDS.building, index: "04", label: "Building" },
  { id: SECTION_IDS.experience, index: "05", label: "Experience" },
  { id: SECTION_IDS.build, index: "06", label: "How I Build" },
  { id: SECTION_IDS.beyond, index: "07", label: "Beyond" },
  { id: SECTION_IDS.why, index: "08", label: "Why I Build" },
  { id: SECTION_IDS.contact, index: "09", label: "Contact" },
] as const;

/** The navbar's call to action: Aditya's CV (Google Drive viewer, opens in a new tab). */
export const NAV_CTA = {
  href: "https://drive.google.com/file/d/18sUWwczYfPBfYZR81idtnEqgJyJS2fq-/view?usp=sharing",
  label: "CV",
} as const;
