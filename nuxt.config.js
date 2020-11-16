import colors from 'vuetify/es5/util/colors'

const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_UPLOADPRESET,
  BASE_URL,
  BROWSER_BASE_URL,
} = process.env;


// const environment = process.env.NODE_ENV
// const envSet = require(`./env.${environment}.js`)


export default {
  server: {
    host: '0.0.0.0',
  },
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'stylie',
    title: 'stylie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'icon.png' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vue-croppa'
  ],

  env: {
    //baseUrl: process.env.NODE_ENV === "production" ? "http://stylie.ap-northeast-1.elasticbeanstalk.com/api" : "http://localhost:8000/api",
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUDNAME,
    CLOUDINARY_UPLOADPRESET,
    BASE_URL
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/auth',

    '@nuxtjs/proxy'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseUrl: process.env.NODE_ENV === "production" ? "https://stylie-api.herokuapp.com/" : "http://localhost:8000/",
    proxy: true,  // 追加
    credentials: true,
    prefix: '/',
  },

  proxy: {
    //'/api': process.env.NODE_ENV === "production" ? "http://stylie.ap-northeast-1.elasticbeanstalk.com/" : "http://localhost:8000/",
    '/api': {
      //'target': envSet.BASE_URL,
      target: process.env.NODE_ENV === "production" ? "https://stylie-api.herokuapp.com/" : "http://localhost:8000/",
      secure: false,
      changeOrigin: true,
    }
  },


  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  manifest: {
    name: 'stylie',
    lang: 'ja',
    short_name: 'stylie',
    title: 'stylie',
    description: 'stylie description',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    start_url: '/',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'get' },
          user: { url: '/me', method: 'get', propertyName: 'data' }
        },
        //tokenRequired: true,
        //tokenType: 'bearer'
      }
    },
    redirect: {
      login: '/auth/login', // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      home: '/' // ログイン後のリダイレクトURL
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) { }
  }
}
