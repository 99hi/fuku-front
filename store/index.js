export const state = () => ({
  alertOption: {
    type: "",
    message: ""
  },
  alertFlag: false,
  weatherArea: {
    city: "",
    romaji: ""
  },
  weatherFlag: false
})

export const getters = {
  getAlertOption(state) {
    return state.alertOption
  },
  getFlag(state) {
    return state.alertFlag
  },
  getArea(state) {
    return state.weatherArea
  }
}

export const mutations = {
  changeAlert(state, { type, message }) {
    state.alertOption.type = type
    state.alertOption.message = message
    state.alertFlag = true
  },
  changeFlag(state, flag) {
    state.alertFlag = flag
  },

  setWeatherArea(state, area) {
    state.weatherArea = area
  },
  setWeatherFlag(state, flag) {
    state.weatherFlag = flag
  }
}

export const actions = {
  // async nuxtServerInit({ commit }, { app }) {
  //     await app.$axios
  //         .get("/user")
  //         .then(response => {
  //             commit("login/setUser", response.user);
  //             commit("login/setLoggedIn", true);
  //         })
  //         .catch(() => {
  //             commit("login/setUser", null);
  //             commit("login/setLoggedIn", false);
  //         });
  // }
  async getArea({ commit }) {
    const json = require(`~/assets/city.json`);
    const weather = await this.$axios.get('/api/weather/get').then((res) => { return res.data })
    commit('setWeatherFlag', weather.display)

    json.forEach((prefectures) => {
      prefectures.cities.filter((city) => {
        if (city.city === weather.area) {
          commit('setWeatherArea', city)
        }
      });
    })
  }
};