export const state = () => ({
  alertOption: {
    type: "",
    message: ""
  },
  flag: false
})

export const getters = {
  getAlertOption(state) {
    return state.alertOption
  },
  getFlag(state) {
    return state.flag
  }
}

export const mutations = {
  changeAlert(state, { type, message }) {
    state.alertOption.type = type
    state.alertOption.message = message
    state.flag = true
  },
  changeFlag(state, flag) {
    state.flag = flag
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
      await app.$axios
          .get("/user")
          .then(response => {
              commit("login/setUser", response.user);
              commit("login/setLoggedIn", true);
          })
          .catch(() => {
              commit("login/setUser", null);
              commit("login/setLoggedIn", false);
          });
  }
};