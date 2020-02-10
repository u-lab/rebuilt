require('dotenv').config()

module.exports = {
  srcDir: __dirname,

  env: {
    apiUrl: process.env.API_URL,
    appName: process.env.APP_NAME,
    appLocale: process.env.APP_LOCALE || 'en',
    githubAuth: !!process.env.GITHUB_CLIENT_ID
  },

  head: {
    title: process.env.APP_NAME,
    titleTemplate: '%s - ' + process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#007bff' },

  router: {
    middleware: ['locale', 'check-auth']
  },

  css: [{ src: '~assets/sass/app.scss', lang: 'scss' }],

  plugins: [
    '~components/global',
    '~plugins/i18n',
    '~plugins/vform',
    '~plugins/axios',
    '~plugins/fontawesome',
    { src: '~plugins/bootstrap', mode: 'client' }
  ],

  modules: ['@nuxtjs/router', '@nuxtjs/pwa', '@nuxtjs/sitemap'],

  buildModules: [
    '@nuxtjs/google-analytics'
  ],

  build: {
    extractCSS: true
  },

  sitemap: {
    // custom configuration for @nuxtjs/sitemap
  },

  googleAnalytics: {
    // custom configuration for @nuxtjs/google-analytics
    // id: "UA-12301-2"
  }
}
