import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifestConfig from './manifest.config'

export default defineConfig({
  plugins: [react(), crx({ manifest: manifestConfig })],
  build: {
    rollupOptions: {
      input: {
        sidebar: 'src/pages/sidebar/index.html',
        settings: 'src/pages/settings/index.html',
      },
    },
  },
})
