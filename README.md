# Nirvair Singh — Portfolio

Personal portfolio site: a homepage plus six long-form case studies covering
product UX, design systems, conversion work and two independent client projects.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind v4** — design tokens live in `src/index.css` under `@theme`
- **react-router-dom** (BrowserRouter — see the SPA note below)
- **framer-motion** — scroll reveals only, all gated on `prefers-reduced-motion`

## Running locally

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + production build to dist/
pnpm preview    # serve the production build
pnpm lint
```

## Structure

```
src/
  components/
    home/          homepage sections
    case-study/    ScreenFrame, PhoneFrame and other shared case-study pieces
    layout/        Nav, Footer, ContactSheet
    ui/            Eyebrow, Reveal, SectionHeading, primitives
  pages/work/      one file per case study
  lib/             site config, project metadata, types
public/assets/     real product screenshots, per project
```

## Conventions worth knowing

- **Eyebrows** use one treatment portfolio-wide: the brand accent on light
  surfaces, white on dark. `src/components/ui/Eyebrow.tsx` is the single source.
  The accent is deliberately not used on dark — it measures 3.3:1 there.
- **Scroll reveals** all go through `src/components/ui/Reveal.tsx`
  (opacity + `blur(8px)` + 32px rise, 900ms, 90ms sibling stagger).
- **Case-study claims** are evidence-led. Several pages carry explicit notes
  where no verified metric exists; those notes are intentional, not filler.

## Deployment

Deployed on Vercel. Because the app uses `BrowserRouter`, `vercel.json` rewrites
all paths to `index.html` so deep links such as `/work/amrit-studio` resolve on
direct load and refresh. Removing that rewrite will 404 every route but `/`.

Build command `pnpm build` · output directory `dist`.
