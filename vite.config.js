import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// En Netlify, si no se definió VITE_SITE_URL, se usa la dirección principal del sitio
// (la .netlify.app o el dominio propio cuando se conecte).
if (process.env.NETLIFY && process.env.URL && !process.env.VITE_SITE_URL) {
  process.env.VITE_SITE_URL = process.env.URL
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // Utiliza "polling" para detectar cambios en algunos entornos
      interval: 100,
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
