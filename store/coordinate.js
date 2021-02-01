export const state = () => ({
  coordinateList: [],
  filteredCoordinate: [],
})

export const getters = {
  getCoordinate(state) {
    return state.coordinateList
  },

  filteredCoordinate(state) {
    return state.filteredCoordinate
  }
}

export const mutations = {
  setCoordinate(state, coordinate) {
    state.coordinateList = coordinate
    state.filteredCoordinate = coordinate
  },

  setFilteredCoordinate(state, coordinate) {
    console.log("setFilteredCoordinate", coordinate)
    state.filteredCoordinate = coordinate.slice()
  },
  resetFilteredCoordinate(state) {
    state.filteredCoordinate = state.coordinateList
  }
}

export const actions = {
  async coordinate({ commit }) {
    const coordinate = await this.$axios.get("/api/coordination/get").then((res) => { return res.data });
    commit('setCoordinate', coordinate)
  }
}