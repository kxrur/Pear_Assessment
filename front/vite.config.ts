import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@v': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@a': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@t': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@f': fileURLToPath(new URL('./src/functions', import.meta.url)),
    }
  },
})
