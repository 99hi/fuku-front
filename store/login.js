export const state = () => ({
  loggedIn: false,
  user: null,
  token: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user || null;
  },
  setLoggedIn(state, bool) {
    state.loggedIn = bool;
  },
  setToken(state, token) {
    console.log("セットトークン")
    state.token = token
  }
};

export const getters = {};

export const actions = {};