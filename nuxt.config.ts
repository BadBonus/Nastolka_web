import tailwindcss from "@tailwindcss/vite";
import Inspect from 'vite-plugin-inspect';

export default defineNuxtConfig({
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
    '@nuxt/ui'
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
    '~/assets/fonts/fonts.css'
  ],
  // quasar: {
  // plugins: ['Dialog', 'Notify']
  //   config: {
  //     dark: true,
  //     brand: {
  //       primary: 'var(--color-primary)',
  //       secondary: 'var(--color-secondary)',
  //       accent: 'var(--color-accent)',
  //       dark: 'var(--color-dark)',
  //       'dark-page': 'var(--color-dark-page)',
  //       positive: 'var(--color-positive)',
  //       negative: 'var(--color-negative)',
  //       info: 'var(--color-info)',
  //       warning: 'var(--color-warning)',
  //     }
  //   },
  //   iconSet: 'material-icons',
  //   // css: [], 
  //   sassVariables: false,
  //   plugins: [
  //     'BottomSheet',
  //     'Dialog',
  //     'Loading',
  //     'LoadingBar',
  //     'Notify',],
  //   extras: {
  //     font: 'roboto-font',
  //   },

  // },

  components: [
    "~/components",
    "~/components/ui",
    "~/components/globals",
    "~/components/features",
  ],
})