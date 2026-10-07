import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // o chunk do Three.js (~250 kB gzip) é carregado sob demanda, depois do hero
  build: { chunkSizeWarningLimit: 1000 },
})
