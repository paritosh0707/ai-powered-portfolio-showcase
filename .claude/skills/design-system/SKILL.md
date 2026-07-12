---
name: design-system
description: The visual design system for the AI portfolio site — color/type/space/elevation tokens, component-class contracts, and the mobile-responsive rules. Read this BEFORE styling any component, adding a Tailwind class, choosing a color, or building a new section, so the UI stays one coherent, professional system in light and dark.
---

# Portfolio Design System

Source of truth for how this site looks. Tokens live in `src/index.css` (`@layer base` = CSS variables, `@layer components` = reusable classes) and `tailwind.config.ts`. **Change tokens here first, then components consume them — never hardcode hex, px shadows, or one-off font stacks in a component.**

## Design principles

1. **Restraint over decoration.** Neutral canvas, one accent (emerald). Color earns attention; it is not wallpaper.
2. **Token-driven.** Every color, radius, shadow, and font comes from a variable. A raw `#10b981` or `shadow-[0_4px...]` in a component is a bug.
3. **Light and dark are equal citizens.** Every change must be checked in both themes. Dark mode leans on borders + surface elevation, not heavy shadows.
4. **Mobile is the default target, not an afterthought.** Design at 375px first, enhance upward.
5. **Motion is subtle and fast** (150–300ms, ease-out). It confirms actions and guides the eye; it never blocks or distracts.

## Color

HSL tokens (space-separated, consumed as `hsl(var(--token))`). Defined in `:root` (light) and `.dark`.

| Role | Token | Use for |
|------|-------|---------|
| Canvas | `--background` / `--foreground` | Page bg + primary text |
| Accent | `--accent` / `--accent-foreground` | The ONE brand color — CTAs, links, active state, focus ring. Emerald/teal. |
| Surfaces | `--card`, `--surface-container[-low/high/highest/lowest]` | Layered panels; higher = more elevated |
| Muted | `--muted` / `--muted-foreground` | Secondary text, chips, subtle fills |
| Lines | `--border` / `--input` / `--ring` | Hairlines, field borders, focus ring |
| Status | `--destructive`, `emerald-500` (live), `amber-500` (in-progress) | Feedback + status dots |

Rules:
- **Accent is precious.** At most one primary accent action per viewport region. Don't accent every card.
- Text contrast: body text uses `foreground`; de-emphasized text uses `muted-foreground` (never lighter than that for real content). Avoid `foreground/40` or lighter for anything readable.
- Use `foreground/NN` opacity only for decorative overlays, dividers, and hover washes.

## Typography

Loaded in `index.html` (Google Fonts, `display=swap`). Three families, three jobs — do not introduce a fourth.

| Family | Tailwind | Role |
|--------|----------|------|
| Plus Jakarta Sans | `font-display` | Headings, hero, section titles, numbers/stats |
| Inter | `font-body` (default `body`) | All body copy, UI labels, buttons |
| JetBrains Mono | `font-mono` | Code, kbd, technical tags |

Scale (use these, don't invent sizes):
- Hero H1: `text-4xl sm:text-5xl md:text-6xl`, `font-extrabold`, `tracking-tight`, leading ~1.08
- Section title: `.section-title` → `text-3xl md:text-4xl lg:text-5xl font-extrabold font-display tracking-tight`
- Card/sub heading: `text-xl md:text-2xl font-bold`
- Body: `text-base leading-relaxed` (never below `text-sm` for paragraphs)
- Eyebrow/label: `text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground`

Headings get `tracking-tight`; long body never exceeds `max-w-[65ch]` (~`max-w-2xl`) for readability.

## Space & layout

- Spacing uses Tailwind's 4px scale. Vertical rhythm inside a section steps in 4 / 6 / 8 / 12 / 16 / 24.
- **Section vertical padding:** `py-20 md:py-28 lg:py-32`.
- **Horizontal gutters (standardize on this):** `px-5 sm:px-6 lg:px-8`. No more `px-4 md:px-8` vs `px-6 md:px-12` drift.
- **Content max-width:** standard sections `max-w-6xl mx-auto`; wide/hero `max-w-7xl`; prose/article `max-w-3xl`. Pick one of these three — nothing in between.
- 8px base radius (`--radius: 0.5rem`); cards use `rounded-2xl`, controls `rounded-lg`, chips `rounded-lg`/`rounded-full`.

## Elevation (shadows)

Use the named Tailwind shadow scale (`shadow-xs/sm/md/lg/xl`) mapped to warm-tinted CSS vars — never inline shadow values. Resting cards use `shadow-sm`; hover lifts to `shadow-md`/`lg`. In dark mode shadows are near-invisible by design; elevation reads through `surface-container-*` + borders.

## Component classes (contract)

Defined in `src/index.css @layer components`. Reuse before writing new CSS.

| Class | What |
|-------|------|
| `.btn-primary` | Solid accent CTA, h-11 (44px touch). |
| `.btn-outline` | Bordered secondary, h-11. |
| `.btn-ghost` | Minimal; bump to h-11 on touch targets. |
| `.surface-card` / `.glass-card` | Panels. `glass-card` = frosted (`backdrop-blur`) for overlays/floating UI; `surface-card` = solid for in-flow content. |
| `.chip` | Tag/pill for skills & tech. |
| `.section-title` / `.section-subtitle` / `.section-divider` | Section headers. |
| `.filter-pill` | Toggle filters (`.active` state). |
| `.input-field` | Form inputs — matches shadcn `Input`. |
| `.gradient-text` | Accent gradient on headline words (sparingly). |
| `.timeline-line` / `.timeline-dot` | Experience timeline. |
| `.status-dot` (`.live` / `.in-progress`) | Project status. |

shadcn/ui primitives in `src/components/ui/` are the base for interactive controls — extend them, don't reinvent buttons/dialogs.

## Mobile & responsiveness (required checklist)

Breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280`. Design mobile-first (base styles = smallest), layer `sm:`/`md:`/`lg:` upward.

- [ ] **Touch targets ≥ 44×44px** for anything tappable (buttons, nav links, icon buttons, chips that act as buttons).
- [ ] **No horizontal overflow at 320–375px.** Wide content (tables, code blocks, chip rows) scrolls inside its own `overflow-x-auto`; the page body never scrolls sideways.
- [ ] **Fluid type**: hero/large headings scale down at `sm`/base; nothing clips or wraps awkwardly at 360px.
- [ ] **Stack grids on mobile**: `grid md:grid-cols-2 lg:grid-cols-3`, single column base.
- [ ] **Navbar** collapses to a sheet/drawer under `md`; menu button ≥44px.
- [ ] **Floating UI (ChatAssistant)** must fit small screens — cap at `w-[calc(100vw-2rem)]`, `max-h-[85dvh]`, and respect safe areas.
- [ ] **Respect `prefers-reduced-motion`** — gate non-essential framer-motion / animations.
- [ ] Test both themes at 375px, 768px, 1280px.

## How to apply

1. Need a color/space/shadow/font? Use an existing token/class. Missing? Add it to `index.css`/`tailwind.config.ts` **here first**, then use it.
2. New section → wrap in `<section>` with standard padding + one of the three max-widths; title with `.section-title` + `.section-divider`.
3. Before finishing, run the **Mobile checklist** in both themes.
4. For a review pass, use the `ui-design-reviewer` agent.
