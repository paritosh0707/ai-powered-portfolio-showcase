# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page AI/ML portfolio site (Paritosh Sharma) built with Vite + React + TypeScript, shadcn/ui, and Tailwind. Originally scaffolded via Lovable (`lovable-tagger` is a dev-only Vite plugin, active only in development mode).

## Commands

- `npm run dev` — start Vite dev server on **port 8080** (host `::`)
- `npm run build` — production build; `npm run build:dev` for a development-mode build
- `npm run lint` — ESLint over the repo
- `npm run preview` — preview the production build

No test framework is configured. The repo has both `bun.lockb` and `package-lock.json`; `npm` is the documented workflow.

## Architecture

**Routing** (`src/App.tsx`): `react-router-dom` with a shared `Layout` (Navbar + `<Outlet/>` + Footer). Providers wrap everything: `QueryClientProvider` (react-query) → `ThemeProvider` → `TooltipProvider`, plus two toasters (`Toaster` from shadcn and `Sonner`). Keep new routes above the catch-all `*` NotFound route.

**Home page** (`src/pages/Index.tsx`) composes section components in order: Hero → About → Competencies → Skills → Experience → Projects → Contact, with a floating `ChatAssistant`. Section components live directly in `src/components/` (not in `ui/`).

**Two independent blog/article systems** — do not confuse them:
- **Legacy `/blog`** — driven by the hardcoded array in `src/data/blogPosts.ts`, rendered by `src/pages/BlogList.tsx` and `src/pages/BlogArticle.tsx`.
- **Mindstack `/mindstack`** (`src/mindstack/`) — the real content system. Markdown files in `src/mindstack/content/{blog,books,posts}/*.md` are loaded at build time via `import.meta.glob(..., { query: '?raw', eager: true })` and parsed with `front-matter` in `articles.ts`. Category is derived from the folder name and slug from the filename. **Adding an article = dropping a `.md` file with the required frontmatter** (`title, slug, category, date, description, tags, readingTime`); articles missing fields are dropped with a console warning. Rendered by `ArticlePage.tsx` via `MarkdownRenderer` (react-markdown + remark-gfm + rehype-highlight, with a table of contents built from extracted headings).

**ChatAssistant** (`src/components/ChatAssistant.tsx`) POSTs to a hardcoded backend at `http://localhost:8000/api/v1/chatbot/chat` — the backend is a separate service not in this repo. Update this URL when wiring to a deployed API.

**Theme**: `src/providers/ThemeProvider.tsx` provides `useTheme()`; light/dark are driven by CSS custom properties (HSL tokens) defined in `src/index.css`. `ThemeToggle.tsx` switches modes.

## Conventions

- Import alias `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig`).
- shadcn/ui primitives live in `src/components/ui/`; config in `components.json` (style "default", base color slate). Use the shadcn CLI to add new primitives rather than hand-writing them.
- **Before styling anything, read `.claude/skills/design-system/SKILL.md`** — the single source of truth for color/type/space/elevation tokens, the component-class contract, and the mobile-responsive checklist. Tokens live in `src/index.css` (`@layer base` = CSS vars, `@layer components` = classes) and `tailwind.config.ts`; add/change tokens there first, then consume them. Never hardcode hex, inline `shadow-[…]`, or one-off font stacks. Run the `ui-design-reviewer` agent (`.claude/agents/`) after UI work.
- Styling is Tailwind + custom component classes under `@layer components` in `src/index.css` (e.g. `glass-card`, `section-title`, `surface-card`, `btn-primary/outline`, `chip`). Reuse these for consistency; reference theme colors as `bg-accent`, `text-muted-foreground`, etc.
- TypeScript is intentionally loose: `strict: false`, `noUnusedLocals: false`, `noImplicitAny: false`. Don't rely on the compiler to catch unused/implicit-any issues.
- Toasts: `sonner`'s `toast()` is used in newer code; the shadcn `use-toast` hook also exists. Prefer `sonner`.
