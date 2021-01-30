import colors from 'vuetify/es5/util/colors'

const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_UPLOADPRESET,
  baseUrl,
  WEATHER_API_KEY
} = process.env;

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
    '~/plugins/axios',
    '~/plugins/vue-croppa',
    '~/plugins/vue-draggable-resizable'
  ],

  env: {
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUDNAME,
    CLOUDINARY_UPLOADPRESET,
    baseUrl,
    WEATHER_API_KEY
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
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/cloudinary',
    'nuxt-clipboard2'
  ],

 

  // proxy: {
  //   '/api': {
  //     target: process.env.NODE_ENV === "production" ? "https://stylie-api.herokuapp.com/api" : "http://localhost:8000/api",
  //     pathRewrite: {
  //         '^/api': '/',
  //     },
  //   },
  // },
  axios: {
    baseURL: process.env.NODE_ENV === "production" ? "https://stylie-api.herokuapp.com/" : "http://localhost:8000/",
    // proxy: true,
    // prefix: '/',
    // credentials: true,
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
    redirect: {
      login: '/login', 
      logout: '/login',
      callback: false,
      home: false
    },
    token: {
      prefix: '_token.'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/user/token', method: 'get', propertyName: 'token' },
          logout: false,
          user: { url: '/api/user', method: 'get', propertyName: false }
        },
      }
    }
  },

  cloudinary: {
    cloudName: CLOUDINARY_CLOUDNAME,
    apiKey: CLOUDINARY_API_KEY,
    secure: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) { }
  }
}
