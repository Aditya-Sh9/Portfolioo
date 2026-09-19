export type ExperienceEntry = {
  id: string;
  organization: string;
  /** Shown small, under the period. */
  organizationNote?: string;
  role: string;
  period: string;
  /** Verified figures only (CV). */
  facts: readonly { value: string; label: string }[];
  highlights: readonly string[];
  stack: readonly string[];
  certificateUrl?: string;
};

/** Source: CV. Newest first. */
export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: "vanillakart",
    organization: "Vanillakart",
    organizationNote: "Subsidiary of Emvity Brushflicks Creative Hub Pvt. Ltd.",
    role: "Web Development Intern",
    period: "Sep 2025 — Nov 2025",
    facts: [
      { value: "6", label: "Client websites" },
      { value: "3", label: "Sites with the mobile nav bug fixed" },
      { value: "2", label: "Months" },
    ],
    highlights: [
      "Built and maintained responsive client websites using the MERN stack and WordPress.",
      "Fixed a mobile navigation bug affecting 3 client sites, improving frontend responsiveness and UI/UX consistency across devices.",
      "Strengthened practical knowledge of database integration, responsive design, and collaborative development through real-world, project-based delivery.",
    ],
    stack: ["MongoDB", "ExpressJS", "ReactJS", "NodeJS", "WordPress", "JavaScript"],
    certificateUrl:
      "https://drive.google.com/file/d/1q9YPR7aYaUnBE6IgJwJcQDxGyQOlckSB/view?usp=sharing",
  },
];
