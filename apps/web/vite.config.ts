import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@taskflow/types': resolve(__dirname, '../../packages/types/src/index.ts'),
      '@taskflow/domain': resolve(__dirname, '../../packages/domain/src/index.ts'),
      '@taskflow/utils': resolve(__dirname, '../../packages/utils/index.ts'),
    },
  },
});
