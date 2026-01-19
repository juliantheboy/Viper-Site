import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Basic polyfill for process.env to prevent crashes in some environments
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});