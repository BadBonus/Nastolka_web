import tailwindcss from '@tailwindcss/vite';
import Inspect from 'vite-plugin-inspect';
import {fileURLToPath} from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    // Когда будещь добавлять шрифты то глянь на https://github.com/nuxt-modules/fontaine для уточнения как шрифты добавлять в оптимизационный fontaine
    '@nuxtjs/fontaine',
    'nuxt-tiptap-editor',
    '@vueuse/nuxt',
    'reka-ui/nuxt',
    'vue-mess-detector-nuxt-devtools',
    // 'shadcn-nuxt',
    'nuxt-svgo',
  ],
  svgo: {
    defaultImport: 'component',
  },

  // shadcn: {
  //   /**
  //    * Prefix for all the imported component.
  //    * @default "Ui"
  //    */
  //   prefix: '',
  //   /**
  //    * Directory that the component lives in.
  //    * Will respect the Nuxt aliases.
  //    * @link https://nuxt.com/docs/api/nuxt-config#alias
  //    * @default "@/components/ui"
  //    */
  //   componentDir: '@/components/ui'
  // },

  app: {
    baseURL: '/Nastolka_web/',
    buildAssetsDir: 'assets',
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  icon: {
    serverBundle: false,
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  runtimeConfig: {
    public: {
      apiBase: '',
      imgproxyUrl: process.env.NUXT_PUBLIC_IMGPROXY_URL || 'http://localhost:8079',
    },
  },

  devtools: {
    enabled: true,
  },

  css: ['@/assets/css/main.css', '~/public/fonts/fonts.css', '@splidejs/splide/dist/css/splide.min.css'],

  fonts: {
    providers: {
      npm: false,
    },
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
      fallbacks: {
        serif: ['Shantell Sans'],
        'system-ui': ['Roboto', 'system-ui'],
        'sans-serif': ['Pangolin'],
      },
      preload: true,
    },
    families: [
      {
        name: 'Rubik Doodle Shadow',
        provider: 'google',
      },
      {
        name: 'Shantell Sans',
        provider: 'local',
      },
    ],
  },

  routeRules: {
    '/': {prerender: true},
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  vite: {
    plugins: [tailwindcss(), Inspect()],
    optimizeDeps: {
      include: ['vue-advanced-cropper', 'v-calendar', 'zod'],
    },
  },
  typescript: {
    tsConfig: {
      include: ['./app/shared/types/**/*.d.ts'],
    },
  },
  alias: {
    '#src': fileURLToPath(new URL('./app', import.meta.url)),
    '#types': fileURLToPath(new URL('./shared/types', import.meta.url)),
    '#consts': fileURLToPath(new URL('./shared/constants', import.meta.url)),
    '#apiEndPoints': fileURLToPath(new URL('./shared/constants/api-endpoints', import.meta.url)),
    '#valSchemas': fileURLToPath(new URL('./shared/types/validationSchemas', import.meta.url)),
    '#components': fileURLToPath(new URL('./components', import.meta.url)),
    '#features': fileURLToPath(new URL('./components/features', import.meta.url)),
    '#globals': fileURLToPath(new URL('./components/globals', import.meta.url)),
  },
  components: [{path: '~/components/globals'}, {path: '~/components/features'}, '~/components'],
  colorMode: {
    preference: 'dark',
  },
});
