import { defineConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue(), viteCommonjs()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './tests/*.js',
  },
});
