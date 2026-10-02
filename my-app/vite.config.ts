import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
const apiBase = (process.env.VITE_API_BASE || 'https://xtipeal88c.execute-api.us-east-1.amazonaws.com').trim();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: apiBase,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
