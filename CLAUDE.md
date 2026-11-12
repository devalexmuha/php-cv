# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A one-page CV built as a small React SPA (Vite + React 19 + Tailwind CSS v4). The CV is split into "steps" (screens) that the visitor goes through with Next / Back / To the start, like diving deeper into the CV. All text and image data lives in JSON. There is no test suite and no linter. `GUIDE.md` explains the project for the owner (a PHP developer new to React); keep it in sync when the architecture changes.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`
- `npm run thumbs` — regenerate the WebP gallery thumbnails (`project-photos/<project>/thumbs/`) after adding or renaming screenshots

## Architecture

- `index.html` is a thin shell (`<div id="root">`, fonts, meta); `src/main.jsx` renders `src/App.jsx` into it.
- `src/steps.js` is the ordered list of steps (`id` for the URL hash, `chapter`, `label`, `Component`, `props`). Pet project steps are generated from `src/data/projects.json`. Reordering or adding screens happens here.
- `src/hooks/useStepNavigation.js`: the URL hash (`#/skills`) is the single source of truth. `goTo()` only sets the hash; a `hashchange` listener updates state and the direction (1 forward, -1 back). This gives browser Back/Forward and deep links without a router, and no 404s on GitHub Pages. `useKeyboardNavigation.js` adds ← → Home End and ignores keys while a `<dialog>` or the lightbox (`.yarl__portal`) is open.
- `src/App.jsx`: `Header` (chapter tabs, `TableOfContents` dialog, progress line), `StepScreen` inside `AnimatePresence` (motion `motion/react`; direction-aware enter/exit, `MotionConfig reducedMotion="user"`), `StepNav` (Back, To the start, counter, Next / Back to start).
- `StepScreen` makes each step fill the space between header and nav. A step taller than the screen scrolls inside the step, with a bottom fade while content is hidden. Desktop (1440×900) is designed to fit without scrolling; keep it that way when adding content.
- `src/components/steps/*` contains one component per screen. Shared pieces are in `src/components/ui/`: `RichText` (turns `[label](url)` in JSON strings into links), `BulletList` (square bullets; items are strings or `{ term, note }`; `compact` for dense lists), `ProjectGallery` (cover + thumbnail strip + yet-another-react-lightbox with Captions/Counter/Thumbnails/Zoom), `AiSummarize` + `AiIcons` (prefilled `?q=` links; Gemini copies the prompt to the clipboard instead), `Icon`.
- Data: `src/data/cv.json` holds all CV text and keeps the owner's wording, so don't rewrite it. `src/data/projects.json` holds the projects, and each image has `src` (full PNG), `thumb` (WebP), `alt`, `width`, `height`.
- Screenshots in `public/media/images/project-photos/<project>/` are named `<story-order>-<project>-<what-it-shows>.png`. The number prefix is the story order and must stay.
- Asset paths in JSON are relative to `public/` with no leading slash (`media/images/...`); build URLs with `asset()` from `src/lib/asset.js` (prefixes `import.meta.env.BASE_URL`).
- `src/main.css`: `@theme` tokens (colors `body`/`accent`/`secondary`/`disabled`/`footer`, fonts `title` = Literata, `main` = Crimson Pro), base rules, component classes (`page-container`, `title(--lg/--md/--sm)`, `kicker`, `text`, `link`, `btn(--primary/--outline/--text/--icon)`, `card`, `chip`, `bullet`). Responsive rules use the custom desktop-first variants `w1100`, `w880`, `w580`, `w450`, `w320` (`width <= N`) plus `h760` for short screens, not Tailwind's default breakpoints. Component classes can't take variants in Tailwind v4 (`w580:btn--icon` does nothing), so use utilities for responsive overrides.
- Fonts load from Google Fonts via `<link>` in `index.html`.

## Deployment

- `.github/workflows/deploy.yml` builds with Node 22 (`npm ci && npm run build`) and deploys `dist/` to GitHub Pages on every push to `main` (site: https://devalexmuha.github.io/php-cv/).
- `vite.config.js` sets `base: './'` so the site works under the `/php-cv/` Pages subpath. Keep it relative, and keep hash-based step URLs (GitHub Pages can't rewrite unknown paths to `index.html`).
