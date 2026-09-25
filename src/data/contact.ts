export const CONTACT = {
  email: "adityasharma.reach@gmail.com",
} as const;

/**
 * Profile links, in display order. Sources: CV (LinkedIn, GitHub) and Aditya (LeetCode).
 * `icon` is a file in `public/icons/social/` (Devicon / Simple Icons, one-colour).
 */
export const PROFILE_LINKS = [
  {
    id: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    handle: "AdityaSharma1060",
    href: "https://www.linkedin.com/in/AdityaSharma1060",
  },
  {
    id: "github",
    icon: "github",
    label: "GitHub",
    handle: "Aditya-Sh9",
    href: "https://github.com/Aditya-Sh9",
  },
  {
    id: "leetcode",
    icon: "leetcode",
    label: "LeetCode",
    handle: "Aditya_sh106",
    href: "https://leetcode.com/u/Aditya_sh106/",
  },
] as const;
