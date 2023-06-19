import { defineVitestConfig } from 'nuxt-vitest/config';
import { fileURLToPath } from 'node:url';

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./', import.meta.url)),
      },
    },
    exclude: ['e2e/*', 'node_modules/**/*'],
  },
});
