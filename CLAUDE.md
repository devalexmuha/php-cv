# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A single-page static CV site (one `index.html`), built with Vite + Tailwind CSS v4. There is no JavaScript application code, no test suite and no linter.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`

## Architecture

- `index.html` (repo root) is the only page. All styling is Tailwind utility classes inline in the markup; it links `/src/main.css` directly (no JS entry point).
- `src/main.css` holds the Tailwind setup: `@theme` design tokens (colors `body`/`accent`/`secondary`/`disabled`/`footer`, fonts `title`/`main`), a few `@layer base`/`components` rules, and custom max-width variants `w880`, `w580`, `w450`, `w320` (`@media (width <= N)`). Use these variants (e.g. `w450:h-[100px]`) for responsive rules instead of Tailwind's default mobile-first breakpoints. They are registered widest to narrowest so narrower rules win.
- `public/media/` holds static assets (images, icons, resume PDF). Reference them with root-absolute paths such as `/media/images/...`; Vite copies `public/` to the build root as-is.
- Fonts (Literata, Crimson Pro) load from Google Fonts via `<link>` in `index.html`.

## Deployment

- `.github/workflows/deploy.yml` builds with Node 22 (`npm ci && npm run build`) and deploys `dist/` to GitHub Pages on every push to `main`.
- `vite.config.js` sets `base: './'` so the site works under the `/cv-project/` Pages subpath. Keep it relative.
