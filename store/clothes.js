export const state = () => ({
  clothesList: [],
  filteredClothes: []
})

export const getters = {
  getClothesList(state) {
    return state.clothesList
  },

  getFilteredClothes(state) {
    return state.filteredClothes
  }
}

export const mutations = {
  setClothes(state, payload) {
    state.clothesList = payload
  },

  setFilteredClothes(state, payload) {
    state.filteredClothes = payload.slice()
    console.log("setFilteredClothes実行")
  },

  resetFilteredClothes(state) {
    console.log("リセット")
    state.filteredClothes = state.clothesList
  }
}

export const actions = {
  async checkClothes({ commit, state }) {
    const clothes = await this.$axios.get('/api/clothes/get').then((res) => { return res.data })
    console.log(clothes)
    commit('setClothes', clothes)
    commit('setFilteredClothes', clothes)
  }
}