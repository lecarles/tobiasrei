// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'title', content: 'Acord per Vilamarxant' }
      ],
    }
  },
  build: {
    transpile: ['gsap']
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  modules: [
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_TOKEN },], 
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'ca',
        name: 'Valencià'
      },
      {
        code: 'es',
        name: 'Castellano'
      },
    ],
    defaultLocale: 'ca',    
    vueI18n: './i18n.config.ts'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;'
        }
      }
    }
  }
})
