import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/parcoursup/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Parcoursup Tracker',
        short_name: 'Parcoursup',
        theme_color: '#6C63FF',
        background_color: '#0f0f1a',
        display: 'standalone',
        start_url: '/parcoursup/',
        icons: [
          { src: '/parcoursup/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/parcoursup/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
})