import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://ani-hub-six.vercel.app', // Substitua pela URL exata da sua Vercel se for diferente
        changeOrigin: true,
        secure: false,
      },
    },
  },
})