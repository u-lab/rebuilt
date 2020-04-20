require('dotenv').config()

module.exports = {
  srcDir: __dirname,

  env: {
    apiUrl: process.env.API_URL + '/api/v1',
    appName: process.env.APP_NAME,
    appLocale: process.env.APP_LOCALE || 'en',
    githubAuth: !!process.env.GITHUB_CLIENT_ID
  },

  head: {
    htmlAttrs: {
      lang: process.env.APP_LOCALE
    },
    title: process.env.APP_NAME,
    titleTemplate: '%s - ' + process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: process.env.APP_NAME
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.APP_URL },
      { hid: 'og:title', property: 'og:title', content: process.env.APP_NAME },
      {
        hid: 'og:description',
        property: 'og:description',
        content: process.env.APP_NAME
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#007bff' },

  router: {
    middleware: ['locale', 'check-auth']
  },

  css: [{ src: '~assets/sass/app.scss', lang: 'scss' }],

  plugins: [
    '~plugins/i18n',
    '~plugins/vform',
    '~plugins/axios',
    '@/plugins/vue-inject',
    '@/plugins/vuelidate'
  ],

  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/router',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources'
  ],

  buildModules: ['@nuxtjs/google-analytics'],

  build: {
    extractCSS: true
  },

  sitemap: {
    // custom configuration for @nuxtjs/sitemap
  },

  styleResources: {
    scss: ['@/assets/sass/_variables.scss', '@/assets/sass/functions/*.scss']
  },

  googleAnalytics: {
    // custom configuration for @nuxtjs/google-analytics
    // id: "UA-12301-2"
  }
}
