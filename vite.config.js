import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base: works on GitHub Pages under /cv-project/ and on any other path.
  base: './',
  plugins: [tailwindcss()],
})
