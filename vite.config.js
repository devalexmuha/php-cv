import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base: works on GitHub Pages under /php-cv/ and on any other path.
  base: './',
  plugins: [react(), tailwindcss()],
})
