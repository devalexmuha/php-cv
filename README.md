# php cv

My PHP / Laravel CV: an interactive, step-by-step CV site.

**Live:** https://devalexmuha.github.io/php-cv/

## What's inside

- The CV is split into screens: Hello → Skills → What I can do → Pet projects → Education & experience → Why me → Contacts.
- Navigate with **Next / Back / To the start**, the ← → keys or the Contents menu. Every screen has its own link, like `#/sol4`.
- Each pet project has a screenshot gallery that tells its story step by step.
- "Summarize this CV with AI" links for ChatGPT, Gemini, Claude, Perplexity and Grok.
- The whole CV is also in the HTML as plain text and in [`cv.md`](https://devalexmuha.github.io/php-cv/cv.md), so AI tools can read it without running JavaScript.
- Mobile friendly.

## Tech

React 19 · Vite · Tailwind CSS v4 · motion · yet-another-react-lightbox.
All texts and image lists live in `src/data/*.json`.

## Run locally

```bash
npm install
npm run dev        # development server
npm run build      # production build into dist/
npm run preview    # preview the production build
npm run thumbs     # regenerate gallery thumbnails after adding screenshots
```

## Deploy

Every push to `main` is built and published to GitHub Pages by `.github/workflows/deploy.yml`.

## Learn how it works

See [GUIDE.md](GUIDE.md): the project explained for a PHP / Laravel developer.
