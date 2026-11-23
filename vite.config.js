import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL || process.env.VITE_API_URL || 'http://localhost:3001'),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
        manifest: {
          name: 'Wayline Logistics Workspace',
          short_name: 'Wayline',
          description: 'Shipment tracking and proof-of-delivery workspace.',
          theme_color: '#102b46',
          background_color: '#f4f7fb',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          ],
        },
        workbox: {
          navigateFallback: '/index.html',
          globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /\/shipments(?:\/.*)?$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'wayline-shipment-api',
                networkTimeoutSeconds: 4,
                expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 },
              },
            },
          ],
        },
      }),
    ],
    server: { host: '0.0.0.0', port: 5173, strictPort: true },
    preview: { host: '0.0.0.0', port: 4173, strictPort: true },
  };
});
