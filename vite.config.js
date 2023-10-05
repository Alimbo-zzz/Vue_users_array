import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer'

export const root = resolve(__dirname, 'public');
export const outDir = resolve(__dirname, 'build');
export const src = resolve(__dirname, 'src');


export default defineConfig({
  base: '/Vue_users_array/',
  root,
  plugins: [vue()],
  server: { port: 3030 },
  build: {
    outDir,
    minify: true,
    rollupOptions: {
      input: {
        app: resolve(root, 'index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': src,
      '@images': resolve(src, 'assets/images'),
      '@icons': resolve(src, 'assets/icons'),
      '@fonts': resolve(src, 'assets/fonts'),
      '@localization': resolve(src, 'assets/localization'),
    }
  },
  css: {
    devSourcemap: true,
    postcss: { plugins: [autoprefixer()] },
    preprocessorOptions: { scss: { additionalData: `@import "@/styles/index.scss";` } }
  }
})
