// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['nuxt-primevue', '@nuxtjs/tailwindcss'],
  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: false,
      ripple: true,
    },
    components: {
      exclude: ['Editor']
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  },
  css: [
    'primevue/resources/themes/lara-light-green/theme.css',
    'primevue/resources/primevue.min.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
    'assets/css/tailwind.css',
  ],
  app: {
    head: {
      title: 'EMI Calculator',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    }
  },
});