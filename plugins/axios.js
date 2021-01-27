const weatherUrl = "https://api.openweathermap.org"

export default function ({ $axios, store }) {
  console.log("axios", $axios)
  $axios.onRequest(config => {
    //openweathermapの場合はBearerトークンがあるとCorsエラーになる
    if(config.url.indexOf(weatherUrl) === 0) {
      delete config.headers.common["Authorization"];
      return config
    }
    if (store.state.login.token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.login.token}`
    }
    
    return config
  })
}