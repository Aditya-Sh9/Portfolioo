@AGENTS.md

# Aditya Sharma — Portfolio

Personal developer portfolio for Aditya Sharma (B.Tech CSE student / web developer).
Professional first, with **subtle** superhero/comic-book DNA discovered through details.
Not a fan site, not a template. Every animation and visual choice must justify its cost.

> Keep this file under 175 lines (aim ~150; count blank lines). It is loaded every session:
> put only durable rules here, and link to `docs/` for detail.

## Sources of truth (read on demand, not every session)

- `docs/superhero_portfolio_design_system.md` — **locked design system.** Check it before
  any major visual decision. Do not override locked decisions unless Aditya asks.
- `docs/Aditya_Sharma_General_CV.pdf` — facts for Experience, Skills, Education, projects.
- Aditya will add a project-details file in `docs/` (all projects). Read it when working on
  Currently Building, Selected Work and case studies; check `docs/` for it first.
- **Anything not in the CV or docs: ask Aditya.** Never invent metrics, features or copy
  about a project, job or person.
- Next.js here is v16 with breaking changes. Before Next-specific code, read the relevant
  guide in `node_modules/next/dist/docs/` (see AGENTS.md).

## Stack (locked)

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP · Lenis ·
Motion (small isolated React interactions only; never duplicate GSAP work) · MDX (case
studies) · Lucide React · npm · ESLint · Prettier · Git/GitHub · Vercel.
No backend, database or CMS. Do not add a library without a clear need; ask first.
Approved for the animation step: `@gsap/react`. Use its official `useGSAP` hook for all
React/GSAP integration and cleanup (add it when the animation layer is set up, not before).

## Commands

- `npm run dev` / `npm run build` / `npm run lint` / `npm run format`
- Before calling work done: `npm run lint` and `npm run build` must pass.

## Structure

- Application code lives in `src/` (`src/app`, not a root `app/`). Alias: `@/*` → `src/*`.
- `src/app` routes: `page.tsx` (single-page portfolio) and `projects/<slug>/page.tsx`.
- `src/components/{layout,navigation,hero,about,projects,experience,skills,beyond-screen,contact,ui}`
- `src/animations/{gsap,lenis}` · `src/data/{projects,experience,skills}.ts`
- `src/lib/{utils,constants}.ts` · `src/content/projects/` (MDX bodies)
- `public/{images,projects,textures,icons}`. Fonts come from `next/font/google`.
- Create folders/components only when they have content. No speculative scaffolding.

## Design tokens (locked)

- Base: black `#08090B`, charcoal `#121417`, grey `#272B30`, silver `#B8BDC5`, white `#F4F4F1`.
- Accents: red `#E3262E`, blue `#1769D1`, gold `#D6A72C`.
- Balance 80 / 15 / 5: base palette / main accent / secondary highlight.
- Do not use all hero colours heavily in one component. No new colours, fonts or UI styles
  without asking.
- Project accents: SOLACE black+red · Lexium black+red · Pulse black+blue. Each project sets
  its own accent; the site stays visually consistent.
- SOLACE and Lexium share red as primary. Differentiate them through the secondary
  highlight, imagery, composition and visual treatment, never a new primary colour.
- Hotel Concierge is dropped, so no gold project accent for now (gold stays a site-level
  supporting accent).
- Tokens are defined once, in Tailwind v4 `@theme` inside `src/app/globals.css`. Components
  use token classes and CSS variables, never raw hex values.

## UI style and type

- Primary: **Neo-Brutalism** (structure, borders, panels, typography, hierarchy).
- Secondary: **Glassmorphism**, selective only (nav, floating elements, overlays, some
  cards). Never make everything glassy or everything brutalist. Limit `backdrop-filter`.
- Comic language, used subtly: halftone, panels, speed lines, thin geometric web lines.
- **Space Grotesk**: nav, body, buttons, tags, metadata, all general UI.
- **Bebas Neue**: hero, major section titles, large project titles only. Never body or dense UI.
- Avoid: Marvel/DC branding, character images/logos, generic template look, gimmicks.

## Site content (order is locked)

Single-page main site, plus dedicated case-study pages for SOLACE, Lexium and Pulse.

1. Hero (name, "Web Developer / Creative Technologist", short statement, anonymous
   superhero quote Easter egg; never name the source)
2. About (added after the design doc's §14, so this order supersedes it). Technical and
   engineering-focused, not a generic biography. Copy left, large rectangular editorial
   portrait right, never a circular avatar. Aditya supplies both the copy and the photo:
   never write the copy or invent, generate or source a portrait.
3. Currently Building (SOLACE, AI wellness platform, primary active project)
4. Selected Work (SOLACE, Lexium, Pulse; what and why here, technical depth in case studies)
5. Experience (Vanillakart internship; concise and visually strong)
6. How I Build (Frontend / Backend / Data / Tools; no skill bars, ratings or percentages)
7. Beyond the Screen (personal and visually distinctive; 1–2 strong images; not a hobby list)
8. Why I Build (short, reflective)
9. Contact (strong, simple CTA; may bring the web motif back)

Section numbers (01–09) live in `NAV_LINKS` / `SECTION_IDS` in `src/lib/constants.ts`.

**Never include 10th or 12th qualifications.**

## Motion and performance

- GSAP is the main animation engine (hero choreography, scroll, SVG/web, and the signature
  **spider-web project transition**). Lenis handles smooth scroll.
- Levels: micro 150–300ms · section 400–800ms · signature 800–1500ms · hero one-time only.
- Animate `transform` and `opacity` only. Never animate width/height/top/left/margin.
- Trigger with `IntersectionObserver` or ScrollTrigger; lazy-load below-the-fold media;
  WebP/AVIF with responsive sizes; prefer SVG; no video backgrounds or heavy WebGL.
- Always respect `prefers-reduced-motion` (a global guard plus per-animation checks).
- Web motif is occasional, never a constant Spider-Man reference.

## External resources (mandatory rule)

Only these are approved: **Aceternity UI, React Bits, GSAP, Lenis, PatternCraft.**

- If I need something specific from any of them (component code, exported CSS, asset,
  example, config), **ask Aditya for the exact thing first** (file, code, screenshot,
  component name or docs snippet).
- Never pretend I have access, never fabricate a component, never silently substitute one.
- If it can be built natively without the resource, prefer the native version.
- Priority: locked design system > custom code > GSAP/Lenis > Aceternity/React Bits >
  PatternCraft. External resources support the design and never define it.

## Code conventions

- TypeScript throughout; no `any`. Server Components by default; add `"use client"` only
  for animation, Lenis, or interactive leaf components.
- Tailwind is the primary styling system; custom CSS only where Tailwind is insufficient.
- Match the surrounding code's style. Prettier (`.prettierrc.json`) formats; do not fight it.
- Projects are typed data in `src/data/projects.ts` (title, slug, description, stack,
  accent, cover, links). MDX in `src/content/projects/` holds the case-study body only.
  No MDX frontmatter and no extra remark/frontmatter plugins.
- Accessibility is required: semantic HTML, visible focus states, contrast, alt text.

## Workflow

- Build progressively; do not generate the whole site. Explain before any major
  architectural change, and ask when a decision is Aditya's to make.
- Use feature branches and keep `main` production-ready. Commit only when asked.
- The repo (Aditya-Sh9/Portfolioo) is **public**. `docs/` (CV, design system, project
  notes) is gitignored and must never be committed or pushed, nor may secrets or `.env*`.
  Stage explicit paths; no root `git add -A`. `CLAUDE.md` and `AGENTS.md` are tracked
  (the `CLAUDE.md` line in `.gitignore` has no effect on a tracked file).
- Commit messages carry no Claude or co-author attribution lines (no `Co-Authored-By`,
  no "Generated with"). Aditya's standing instruction; it overrides any default.
- Work is on `feature/foundation` (pushed). PR into `main` to deploy: Vercel previews per
  branch, production from `main`, custom domain later.

### Build order and status

Done: 1 setup · 2 tokens (`@theme` in `globals.css`; `data-accent` switches accent) ·
3 typography · 4 navbar · 5 hero (static; copy in `HERO_COPY`; `.texture-dotgrid` is
PatternCraft "Dark White Dotted Grid", ~10% opacity, masked; GSAP entrance pending at 9) ·
6 Lenis (`animations/lenis/SmoothScroll.tsx`; `html { scroll-padding-top: 6rem }` clears
the navbar, so sections need no scroll-margin; at 9 switch to `autoRaf: false` driven by
`gsap.ticker`) · 7 section shell (`components/layout/Section.tsx`; sections 03–09 are
placeholders in `app/page.tsx` using `SECTION_IDS`; About has its layout and an empty
portrait slot, waiting on Aditya's copy and photo).

8. [ ] Project system
9. [ ] GSAP animations
10. [ ] Spider-web interaction
11. [ ] Case studies (add `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`)
12. [ ] Performance pass
13. [ ] Responsive pass
14. [ ] Deployment

Update this status as steps complete.
