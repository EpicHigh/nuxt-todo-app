// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  // @ts-ignore
  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt', 'nuxt-vitest'],
  // @ts-ignore
  pages: true,
});
