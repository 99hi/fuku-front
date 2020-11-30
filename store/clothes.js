export const state = () => ({
  clothesList: Object
})

export const getters = {
  getClothesList(state) {
    return state.clothesList
  }
}

export const mutations = {
  setClothes(state, payload) {
    state.clothesList = payload
  }
}

export const actions = {
  async getClothes() {
    const clothes = await this.$axios.get('/api/clothes/get')
    commit('setClothes', clothes)
  }
}