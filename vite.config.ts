import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'prismjs',
      'prismjs/components/prism-python',
      'prismjs/components/prism-javascript',
      'prismjs/components/prism-json',
      'prismjs/components/prism-bash'
    ]
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'recoil': ['recoil'],
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true
  }
});