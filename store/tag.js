export const state = () => ({
  clothes: [],
  coordinate: [],
});

export const getters = {
  getClothesTag(state) {
    return state.clothes
  },

  getCoordinateTag(state) {
    return state.coordinate
  }
};

export const mutations = {
  setClothesTag(state, tag) {
    state.clothes = tag;
  },
  setCoordinateTag(state, tag) {
    state.coordinate = tag
  }
};

export const actions = {
  async ClothesTag({ commit }) {
    const tag = await this.$axios.get('/api/tag/clothes').then((res) => { return res.data})
    commit('setClothesTag', tag)
  },

  async CoordinateTag({ commit }) {
    const tag = await this.$axios.get('/api/tag/coordinations').then((res) => {return res.data})
    commit('setCoordinateTag', tag)
  }
};