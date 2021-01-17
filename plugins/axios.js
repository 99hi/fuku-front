export default function ({ $axios, store }) {
  console.log("axios", store.state.login.token)
  $axios.onRequest(config => {
    if (store.state.login.token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.login.token}`
    }
    return config
  })
}