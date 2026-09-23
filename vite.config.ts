import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 🟢 Meneruskan seluruh request /api ke Express Backend
      '/api': {
        target: 'http://localhost:3000', // 👈 Sesuaikan dengan port Express kamu (3000 / 5000 / 8000)
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
