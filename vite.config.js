import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    compression(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'HydeDesk',
        short_name: 'Hyde',
        start_url: '/',
        description: 'O HydeDesk é um sistema inovador de suporte técnico empresarial criado por alunos da escola SENAI Suíço-Brasileira. Com recursos para gerenciamento de TI, sua empresa pode manter sua infraestrutura funcionando sem interrupções. Acesse nossa página comercial e conheça mais sobre a plataforma!',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#23AFFF',
        language: 'pt-br',
        icons: [
          {
            src: 'icon.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  define: {
    "process.env": {},
  },
});
