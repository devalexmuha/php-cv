# How this CV works: a guide for a PHP developer

This guide explains the React version of the CV using things you already know from PHP and Laravel.

---

## 1. The big picture

**Laravel** (what you know):

```
Browser ──request──▶ Server (PHP) ──▶ routes/web.php ──▶ Controller ──▶ Blade view ──▶ HTML ──▶ Browser
                     (runs on every request, then PHP "dies")
```

**This CV** (React single page app):

```
Browser ──request──▶ GitHub Pages (just a file server, no PHP)
        ◀── index.html + one JS file + one CSS file + images
Browser runs the JS: React builds the HTML right inside the browser.
Clicking "Next" doesn't ask the server for anything. React just swaps the screen.
```

So there is **no backend** at all. GitHub Pages only serves static files.
All the "logic" (which screen is open, the gallery, the animations) runs in the visitor's browser.

---

## 2. Project map: Laravel thing → file in this project

| Laravel / PHP | This project | What it does |
|---|---|---|
| `public/index.php` (front controller) | `index.html` + `src/main.jsx` | Entry point. `main.jsx` renders `<App />` into `<div id="root">` |
| `routes/web.php` | `src/steps.js` | The list of screens and their order. Each step has an `id` used in the URL: `#/skills` |
| Router | `src/hooks/useStepNavigation.js` | Reads the URL hash and decides which step to show |
| `layouts/app.blade.php` | `src/App.jsx` | The page layout: header, current step, bottom navigation |
| `@yield('content')` | `<step.Component />` in `App.jsx` | The place where the current step is rendered |
| Blade components (`<x-card>`) | `src/components/**/*.jsx` | Small reusable pieces of UI |
| Variables passed to a view: `view('x', ['project' => $p])` | **props**: `<ProjectStep project={p} />` | Data a component receives from its parent |
| `config/*.php` arrays, or the database | `src/data/cv.json`, `src/data/projects.json` | All texts and image lists |
| `asset('media/x.png')` | `asset('media/x.png')` in `src/lib/asset.js` | Builds a correct URL to a file in `public/` |
| `public/` folder | `public/` folder | Copied to the site as is (images, PDF) |
| `composer install` | `npm install` | Installs packages (into `node_modules/`, like `vendor/`) |
| `composer.json` | `package.json` | List of packages and scripts |
| `php artisan serve` | `npm run dev` | Local server for development (with auto-reload) |
| Deploying the code + `artisan optimize` | `npm run build` | Creates the final site in `dist/` |

---

## 3. React ideas, explained with PHP

### A component is a function that returns HTML

```jsx
// src/components/steps/CanDoStep.jsx (simplified)
export default function CanDoStep() {
    return <h2 className="title title--md">{cv.canDo.title}</h2>;
}
```

It's like a Blade component. The HTML-looking syntax is called **JSX**. Differences from Blade:
- `{ ... }` instead of `{{ ... }}` (it escapes HTML automatically, like `{{ }}`)
- `className` instead of `class` (because `class` is a reserved word in JavaScript)
- loops: `items.map(item => <li>{item}</li>)` instead of `@foreach`
- conditions: `{isOpen && <Lightbox />}` or `cond ? a : b` instead of `@if`

### Props are the component's input

```jsx
<ProjectStep project={project} number={1} total={4} />
// inside: function ProjectStep({ project, number, total }) { ... }
```

Same idea as passing an array to a view or `@include('x', ['project' => $project])`.

### State is a variable that redraws the screen when it changes

In PHP every request starts from zero, so you never need this. In the browser the page stays alive, so React needs to know when to redraw:

```jsx
const [openIndex, setOpenIndex] = useState(-1);  // -1 = lightbox closed
setOpenIndex(3);  // React redraws: the lightbox opens on image 4
```

Rule: **never change state directly** (`openIndex = 3` does nothing). Always use the setter.

### Effects are code that runs after the screen is drawn

```jsx
useEffect(() => {
    window.addEventListener('hashchange', onHashChange);    // start listening
    return () => window.removeEventListener('hashchange', onHashChange);  // clean up
}, []);
```

Use them for event listeners, timers, focus. The returned function is cleanup, a bit like a destructor.

### Hooks

Functions whose names start with `use` (`useState`, `useEffect`, our own `useStepNavigation`) are **hooks**. Two rules:
- call them only at the top of a component (not inside `if` or loops),
- call them only from components or other hooks.

---

## 4. How a visitor goes through the CV

1. The visitor opens `https://devalexmuha.github.io/php-cv/`, and step 1 (Hello) is shown.
2. A click on **Next** calls `next()`, which sets the URL to `#/skills`.
3. The browser fires a `hashchange` event; `useStepNavigation` reads the hash and updates the state.
4. React redraws: `App.jsx` renders the Skills step; `StepScreen` animates it in from below (going deeper).
5. **Back** does the same in reverse (the animation goes the other way). **To the start** goes to `#/hello`.

Because the step lives in the URL, these also work:
- the browser's own Back/Forward buttons,
- sharing a direct link, for example `.../php-cv/#/sol4` opens the Sol4 project.

Keyboard: → next, ← back, Home = start, End = contacts. The **Contents** button lists all steps.

---

## 4.1 How AI tools (and visitors without JavaScript) read the CV

Most AI tools (ChatGPT, Claude, Perplexity) read only the raw HTML and don't run JavaScript.
The React app alone would look like an empty page to them. So during `npm run build`:

- `prerender/static-cv.js` turns `cv.json` + `projects.json` into the **whole CV as plain HTML**
  and writes it into `index.html` (like rendering a Blade view to a string).
- It also creates `cv.md`, the same CV as Markdown (`…/php-cv/cv.md`), and adds
  structured "Person" data (schema.org JSON-LD) to the `<head>`.
- In a normal browser a tiny script in `index.html` hides that plain copy at once,
  and React shows the interactive CV. Without JavaScript the plain copy is the page.

The plugin that wires this up is `aiReadableCv()` in `vite.config.js`.
You don't need to do anything: edit the JSON as usual and the plain copy follows.
Only if you add a **new kind of field** to the JSON, add it to `static-cv.js` too.

To see what an AI sees: run `npm run build`, open `dist/index.html` in a text editor,
or open the page with JavaScript turned off in the browser's DevTools.

---

## 5. Everyday tasks

### Run it locally

```bash
npm install        # once, or after pulling changes to package.json
npm run dev        # open the printed URL (http://localhost:5173/)
```

Saving a file updates the browser instantly.

### Change a text

Edit `src/data/cv.json`. Links inside texts use this format: `[link text](https://url)`.

### Add or change a pet project

1. Put the screenshots in `public/media/images/project-photos/<project-folder>/`,
   named in story order: `1-myproject-what-it-shows.png`, `2-myproject-...png`.
2. Run `npm run thumbs` to create the small WebP previews in `thumbs/`.
3. Add the project to `src/data/projects.json` (copy an existing one and change it).
   Each image needs `src`, `thumb`, `alt` (what the screenshot shows), `width`, `height`.

A new project automatically becomes a new step (see the end of `src/steps.js`).

### Add, remove or reorder a screen

Edit the `steps` array in `src/steps.js`. A new screen = a new component in `src/components/steps/`.

### Change colors or fonts

Edit the `@theme` block at the top of `src/main.css`. All components use these tokens
(`text-secondary`, `bg-footer`, `font-title`...).

### Responsive rules

Same system as before: `w880:...` means "when the screen is 880px wide or less".
Variants: `w1100`, `w880`, `w580`, `w520`, `w450`, `w320`, and `h760` (screen height 760px or less).

---

## 6. Deploying to GitHub Pages

The workflow `.github/workflows/deploy.yml` already does everything. On every push to **main** it:

1. installs Node 22,
2. runs `npm ci` (a clean install from `package-lock.json`),
3. runs `npm run build` and creates `dist/`,
4. uploads `dist/` to GitHub Pages.

### Steps for you

1. One-time setup: in the repository on GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
2. Merge the branch into `main` and push:
   ```bash
   git checkout main
   git merge cv-full-redesign
   git push origin main
   ```
3. Open the **Actions** tab and wait for the green check (about 1 minute).
4. Open https://devalexmuha.github.io/php-cv/

> Pushing only the `cv-full-redesign` branch won't publish it: the workflow runs for `main`,
> and by default GitHub Pages only accepts deployments from the default branch.

### Why it works under `/php-cv/`

- `vite.config.js` has `base: './'`, so all built file paths are relative and work in any folder.
- Screens use `#/hash` URLs. GitHub Pages doesn't know any page except `index.html`.
  A URL like `/php-cv/skills` would give a 404, but `/php-cv/#/skills` always loads `index.html`.

### Check the production build before pushing

```bash
npm run build
npm run preview    # serves dist/ exactly as it will be published
```

---

## 7. If something goes wrong

| Problem | Where to look |
|---|---|
| White page | Browser DevTools → Console. A red error points to the file and line. |
| Image doesn't show (404) | The path in JSON must start with `media/...` (no `/` at the start) and be used through `asset()`. Check the file name and the letter case: GitHub Pages is case-sensitive, Windows isn't. |
| New screenshot has no preview | Run `npm run thumbs`. |
| Change not visible on the live site | Check the Actions tab for a red ❌, then hard-refresh (Ctrl+F5). |
| `npm ci` fails with EBUSY or EPERM on Windows | Another process (a running `npm run dev`, or the IDE) holds files in `node_modules`. Stop it and try again. |

---

## 8. Packages used

| Package | Why |
|---|---|
| `react`, `react-dom` | The UI library |
| `vite`, `@vitejs/plugin-react` | Dev server and build tool |
| `tailwindcss`, `@tailwindcss/vite` | Styling (same as before) |
| `motion` | Step transitions (going deeper / coming back), turned off for visitors who prefer reduced motion |
| `yet-another-react-lightbox` | Screenshot viewer: swipe, keyboard, zoom, captions |
| `sharp` (dev only) | Makes the WebP thumbnails in `npm run thumbs` |
