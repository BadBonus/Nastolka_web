import tailwindcss from "@tailwindcss/vite";
import Inspect from 'vite-plugin-inspect';

export default defineNuxtConfig({
  app: {
    baseURL: '/<repo>/', // имя репозитория
  },
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-svgo',
    'reka-ui/nuxt',
    // Когда будещь добавлять шрифты то глянь на https://github.com/nuxt-modules/fontaine для уточнения как шрифты добавлять в оптимизационный fontaine 
    'nuxt-auth-utils',
    '@nuxtjs/fontaine',
    '@nuxt/ui',
    '@nuxt/test-utils/module'
  ],

  vite: {
    plugins: [
      tailwindcss(),
      Inspect(),
    ],
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  imports: {
    dirs: ['types/*.ts', 'store/*.ts', 'types/**/*.ts'],
  },
  css: [
    '~/assets/css/main.css',
    '~/public/fonts/fonts.css',
    '@splidejs/splide/dist/css/splide.min.css'
  ],
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
      fallbacks: {
        'serif': ['ShantellSans'],
        'system-ui': ['Roboto', 'system-ui'],
        'sans-serif': ['Pangolin'],
      },

    },
    families: [{
      name: 'Rubik Doodle Shadow', provider: 'google'
    }]
  },

  components: [
    "~/components",
    "~/components/ui",
    "~/components/globals",
    "~/components/features",
  ],
})