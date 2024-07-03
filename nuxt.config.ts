// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'title', content: 'Tobias Rei' },
        { hid: 'og:image', property: 'og:image', content: 'ogimage.png' },
        { name: "theme-color", content: "#ffffff" },
        { name: "msapplication-TileColor", content: "#ffffff" },
      ],
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href:"/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href:"/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href:"/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#2d2d2d" },
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
  ],
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
