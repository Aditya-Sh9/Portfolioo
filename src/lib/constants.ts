export const SITE = {
  name: "Aditya Sharma",
  role: "Web Developer / Creative Technologist",
} as const;

export const HERO_COPY = {
  firstName: "Aditya",
  lastName: "Sharma",
  statement:
    "I build digital experiences where engineering meets creativity — products that work well, feel intentional, and have a personality of their own.",
  // Easter egg: shown without attribution by design.
  quote: "Why do we fall, sir? So that we can learn to pick ourselves up.",
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
  { id: SECTION_IDS.building, index: "03", label: "Building" },
  { id: SECTION_IDS.work, index: "04", label: "Work" },
  { id: SECTION_IDS.experience, index: "05", label: "Experience" },
  { id: SECTION_IDS.build, index: "06", label: "How I Build" },
  { id: SECTION_IDS.beyond, index: "07", label: "Beyond" },
  { id: SECTION_IDS.why, index: "08", label: "Why I Build" },
] as const;

export const NAV_CTA = {
  id: SECTION_IDS.contact,
  index: "09",
  label: "Contact",
} as const;
