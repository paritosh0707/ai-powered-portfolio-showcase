---
name: Portfolio UI/UX Redesign
overview: Complete visual transformation of Paritosh Sharma's portfolio from a generic glassmorphism template into a premium, editorial-grade site befitting a Lead AI Engineer & Architect -- using Stitch MCP for design exploration, then implementing in React/Tailwind/shadcn.
todos:
  - id: stitch-design
    content: "Phase 1: Create Stitch project and generate screen designs for all 7 sections (Hero, About, Skills, Experience, Projects, Contact, Full-page composite). Use generate_variants for hero exploration."
    status: completed
  - id: design-system
    content: "Phase 2: Overhaul design system -- add Google Fonts (Plus Jakarta Sans, Inter, JetBrains Mono), revamp color tokens in index.css for both light/dark, update tailwind.config.ts with new typography and spacing."
    status: completed
  - id: navbar-hero
    content: "Phase 3a-b: Rebuild Navbar (uncomment, sticky frosted glass, monogram, smooth indicators, resume CTA) and Hero (remove particle canvas, add gradient mesh, massive typography, floating badges)."
    status: completed
  - id: about-skills
    content: "Phase 3c-d: Rebuild About (two-column asymmetric, impact metric counters) and Skills (horizontal tabs, lightweight chip grid)."
    status: completed
  - id: experience-projects
    content: "Phase 3e-f: Rebuild Experience (left-aligned timeline, expandable accordions) and Projects (bento grid, status dots, restyled filter pills)."
    status: completed
  - id: contact-footer-404
    content: "Phase 3g-i: Rebuild Contact (full-width dark section, wire form), Footer (uncomment, simple bar), and 404 page (apply design tokens)."
    status: completed
  - id: animation-polish
    content: "Phase 4: Add Framer Motion, create reusable animation wrappers (FadeIn, SlideUp, StaggerChildren), replace CSS animations, add micro-interactions and scroll-triggered reveals."
    status: completed
  - id: tech-debt
    content: "Phase 5: Fix theme provider inconsistency, remove next-themes, fix asset paths, add missing CSS variables, remove unused files, add typography plugin to Tailwind config."
    status: completed
isProject: false
---

# Portfolio UI/UX Complete Redesign

## Current State Analysis (Problems)

The current site at [src/pages/Index.tsx](src/pages/Index.tsx) has these design issues:

- **Generic template feel**: Glassmorphism cards, particle canvas, purple/blue gradients -- looks like a Lovable/GPT-generated site, not hand-crafted
- **No typography system**: Uses browser defaults (no custom fonts loaded anywhere)
- **Flat information hierarchy**: Every section looks the same -- glass card inside a centered container
- **No scroll-triggered animations**: Everything animates on page load via CSS (`animate-scale-in`, `animate-fade-in`)
- **Broken/incomplete elements**: Navbar and Footer commented out on home page, Contact form not wired, placeholder images everywhere, `next-themes` imported but provider not mounted
- **No visual rhythm**: Same padding, same card style, same layout pattern repeated for every section
- **Off-brand 404 page**: Uses raw Tailwind colors, not design tokens

---

## Design Philosophy: "Precision Engineering"

The new design communicates **technical authority**, **leadership maturity**, and **product-grade craft**. Think the intersection of Linear.app (dark elegance), Stripe (clarity + typography), and Anthropic.com (intellectual sophistication).

---

## Phase 1: Design Exploration with Stitch MCP

We will create a Stitch project and generate screen designs for each major section. This gives us visual references before writing any code.

**Screens to generate:**

1. **Hero + Navbar** (full viewport, both light and dark)
2. **About / Bio** section
3. **Skills & Expertise** section
4. **Experience / Timeline** section
5. **Projects Grid** section
6. **Contact + Footer** section
7. **Full page composite** (all sections together for scroll rhythm)

For the hero, we will use `generate_variants` with `creativeRange: "EXPLORE"` to produce 3-5 alternatives, then pick the strongest.

---

## Phase 2: Design System Overhaul

### Typography (in [index.html](index.html) + [tailwind.config.ts](tailwind.config.ts))

- **Display font**: "Plus Jakarta Sans" (800 weight) -- modern geometric sans with personality
- **Body font**: "Inter" (400/500/600) -- the gold standard for UI
- **Monospace**: "JetBrains Mono" -- for code blocks, tech labels
- Loaded via Google Fonts in `index.html`

### Color System (in [src/index.css](src/index.css))

Both modes equally polished:

**Dark mode (default visual impression):**

- Background: deep navy `#0A0F1E` -> `#111827`
- Foreground: `#F1F5F9`
- Accent: electric blue `#3B82F6` with cyan highlights `#06B6D4`
- Surface cards: `#1E293B` with subtle borders
- Muted: slate-400

**Light mode:**

- Background: warm white `#FAFBFC`
- Foreground: `#0F172A`
- Accent: same blue `#3B82F6`
- Surface cards: white `#FFFFFF` with subtle shadow
- Muted: slate-500

### Spacing & Layout

- Max-width: `1280px` (not 1400)
- Section padding: `py-24 md:py-32` (more breathing room)
- Card radius: `1rem` (16px)
- Generous gaps: `gap-8` to `gap-12`

---

## Phase 3: Component-by-Component Rebuild

### 3a. Navbar ([src/components/Navbar.tsx](src/components/Navbar.tsx))

- **Uncomment and fix** -- currently commented out on home page
- Slim (h-16), sticky, transparent -> frosted glass on scroll
- Left: "PS" monogram or "Paritosh Sharma" in display font
- Right: nav links with smooth underline animation on hover/active
- Far right: theme toggle + "Resume" CTA button
- Mobile: slide-in drawer (not fullscreen overlay)

### 3b. Hero ([src/components/Hero.tsx](src/components/Hero.tsx))

- **Replace particle canvas** with a CSS-only animated gradient mesh / aurora effect (lighter, more modern, no canvas performance overhead)
- Massive display typography: "Building the Future of AI" or similar bold headline (72-96px)
- Sub-headline: role + company in lighter weight
- Two CTAs: "View My Work" (filled) + "Download Resume" (outlined)
- Professional avatar with subtle ring/glow treatment
- **Floating tech keyword badges** that drift subtly (CSS-only)
- Scroll indicator at bottom

### 3c. About ([src/components/About.tsx](src/components/About.tsx))

- **Two-column asymmetric layout**: narrative text (left, ~60%) + impact metrics (right, ~40%)
- Metrics as large display numbers with labels: "3+ Years", "20+ Mentored", "63% QA Boost", "850+ Test Cases"
- Clean prose paragraphs, no glass card wrapper
- Education as compact inline badges
- Animate metrics with counting effect on scroll-enter (Framer Motion)

### 3d. Skills ([src/components/Skills.tsx](src/components/Skills.tsx))

- **Horizontal category tabs** (Agentic AI | LLMOps | Cloud | Programming)
- Selected category shows skills as a clean grid of chips/badges with subtle hover glow
- No heavy glass cards -- lightweight surface containers
- Optional: small icon or logo per skill if recognizable (e.g., Python logo, Docker whale)

### 3e. Experience ([src/components/Experience.tsx](src/components/Experience.tsx))

- **Left-aligned vertical timeline** (not centered -- more readable, especially on mobile)
- Thin accent line with dot markers
- Each role: title + company + period as header, description as paragraph
- Nested projects as expandable accordion (collapsed by default, expand to reveal)
- Staggered scroll-reveal animations

### 3f. Projects ([src/components/Projects.tsx](src/components/Projects.tsx))

- **Bento grid layout**: first project gets a hero-size card (spans 2 cols), rest are normal
- Category filter pills (keep current logic but restyle)
- Cards: subtle surface background, tech stack as small pills, hover lifts card with shadow
- "Impact" line highlighted with a small chart icon or colored sidebar indicator
- Status badge: "In Progress" with amber dot, "Live" with green dot

### 3g. Contact ([src/components/Contact.tsx](src/components/Contact.tsx))

- **Full-width dark section** (even in light mode) as a visual break
- Large display headline: "Let's Build Something Together"
- Two-column: clean form (left) + contact info & social icons (right)
- Social links as icon buttons with hover effects
- Wire up the form (at minimum add `onSubmit` handler)

### 3h. Footer ([src/components/Footer.tsx](src/components/Footer.tsx))

- **Uncomment and redesign**
- Simple bar: name left, social icons center, "Back to top" button right
- Copyright + current year

### 3i. 404 Page ([src/pages/NotFound.tsx](src/pages/NotFound.tsx))

- Rebrand to use design tokens (currently uses raw gray/blue classes)

---

## Phase 4: Animation & Polish

### Add Framer Motion

- Install `framer-motion`
- Create reusable scroll-triggered animation wrappers (`FadeIn`, `SlideUp`, `StaggerChildren`)
- Replace all CSS `animate-*` classes with Framer Motion `motion.div` + `whileInView`
- Add `AnimatePresence` for route transitions

### Micro-interactions

- Navbar link hover underlines
- Button hover scale + shadow lift
- Card hover parallax tilt (subtle, optional)
- Section heading slide-in from left
- Metric number counting animation

### Performance

- Remove the particle canvas entirely (saves ~100 particles * 60fps rendering)
- Lazy-load below-fold sections with `React.lazy` + `Suspense`
- Optimize image loading with proper `loading="lazy"` attributes

---

## Phase 5: Fix Technical Debt

- **Fix theme provider**: Remove `next-themes` usage from [src/components/ChatAssistant.tsx](src/components/ChatAssistant.tsx) and [src/components/ui/sonner.tsx](src/components/ui/sonner.tsx), use the custom `ThemeProvider` consistently
- **Add missing sidebar CSS variables** in `index.css` (Tailwind config references `--sidebar-*` vars that don't exist)
- **Fix asset paths**: Replace `/imgg.jpg` references, add proper avatar image
- **Uncomment Navbar + Footer** in [src/pages/Index.tsx](src/pages/Index.tsx) and [src/App.tsx](src/App.tsx)
- **Remove unused** `App.css`, unused shadcn components, `lovable-tagger`
- **Add `@tailwindcss/typography`** to Tailwind plugins (it's in devDependencies but not in config)

---

## Dependency Changes

**Add:**

- `framer-motion` -- animation library
- Google Fonts: Plus Jakarta Sans, Inter, JetBrains Mono (via `<link>` in index.html)

**Remove:**

- `next-themes` (replace with existing custom ThemeProvider)
- `lovable-tagger` (dev dependency, remove from vite config)

---

## Execution Order

We proceed section by section. Each section: generate Stitch design -> review -> implement -> polish -> move to next.