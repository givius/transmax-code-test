import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Explicit host + allowedHosts prevents Vite's new CORS/origin
    // protection from returning "blocked:origin". If you need LAN
    // access, set host: true and add your hostname to allowedHosts.
    host: 'localhost',
    port: 5173,
    strictPort: false,
    cors: true,
    allowedHosts: ['localhost', '127.0.0.1'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
});
