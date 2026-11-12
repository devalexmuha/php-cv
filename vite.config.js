import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { renderStaticHtml, renderMarkdown, renderJsonLd } from './prerender/static-cv.js'

// Read the CV data fresh every time, so edits to the JSON show up without a restart.
function loadCv() {
  const read = (file) => JSON.parse(fs.readFileSync(new URL(file, import.meta.url), 'utf8'))
  return { cv: read('./src/data/cv.json'), projects: read('./src/data/projects.json') }
}

// Makes the CV readable without JavaScript (AI tools, crawlers): see prerender/static-cv.js
function aiReadableCv() {
  return {
    name: 'ai-readable-cv',

    // index.html: the full CV as plain HTML + structured Person data in <head>
    transformIndexHtml(html) {
      const { cv, projects } = loadCv()
      return html
        .replace('<!-- static-cv -->', renderStaticHtml(cv, projects))
        .replace('</head>', `    ${renderJsonLd(cv)}\n</head>`)
    },

    // npm run build: also publish the CV as dist/cv.md
    generateBundle() {
      const { cv, projects } = loadCv()
      this.emitFile({ type: 'asset', fileName: 'cv.md', source: renderMarkdown(cv, projects) })
    },

    // npm run dev: serve the same cv.md
    configureServer(server) {
      server.middlewares.use('/cv.md', (req, res) => {
        const { cv, projects } = loadCv()
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.end(renderMarkdown(cv, projects))
      })
    },
  }
}

export default defineConfig({
  // Relative base: works on GitHub Pages under /php-cv/ and on any other path.
  base: './',
  plugins: [react(), tailwindcss(), aiReadableCv()],
})
