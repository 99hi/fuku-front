export const state = () => ({
  clothesList: [],
  filteredClothes: [],
  selectedClothes: [],
  shareCloset: [],
  shareUser: 0,
  shareUserList: []
})

export const getters = {
  getClothesList(state) {
    if (state.shareUser === 0) {
      console.log("自分のクローゼットを返す")
      console.log(state.clothesList)
      return state.clothesList
    } else {
      console.log("シェアのクローゼットを返す")
      console.log(state.shareCloset[state.shareUser - 1])
      return state.shareCloset[state.shareUser - 1]
    }
  },

  getFilteredClothes(state) {
    return state.filteredClothes
  },

  getSelectedClothes(state) {
    return state.selectedClothes;
  },

  getShareClothes(state) {
    return state.shareClothes
  },

  getShareUserList(state) {
    console.log("getShareUserList")
    return state.shareUserList
  }
}

export const mutations = {
  //クローゼット
  setClothes(state, payload) {
    state.clothesList = payload
  },

  setFilteredClothes(state, payload) {
    state.filteredClothes = payload.slice()
    console.log("setFilteredClothes実行")
  },
  resetFilteredClothes(state) {
    console.log("リセット")
    if (state.shareUser === 0) {
      state.filteredClothes = state.clothesList
    } else {
      state.filteredClothes = state.shareCloset[state.shareUser - 1]
    }

  },

  //コーディネート追加
  setSelectedClothes(state, payload) {
    state.selectedClothes = payload
    console.log("setSelectedClotehs実行")
  },
  deleteSelectedClothes(state, payload) {
    console.log("deleteSelectedClothes実行")
    state.selectedClothes = state.selectedClothes.filter((clothes) => clothes.id !== payload.id)
  },

  //シェア
  setShareCloset(state, closet) {
    state.shareCloset = closet
  },
  changeCloset(state, payload) {
    state.shareUser = payload
    if (state.shareUser === 0) {
      state.filteredClothes = state.clothesList
    } else {
      state.filteredClothes = state.shareCloset[state.shareUser - 1]
    }
  },
  setShareUserList(state, userList) {
    state.shareUserList = userList
  }
}

export const actions = {
  async checkClothes({ commit, state }) {
    const clothes = await this.$axios.get('/api/clothes/get').then((res) => { return res.data })
    console.log(clothes)
    commit('setClothes', clothes)
    commit('setFilteredClothes', clothes)
  },

  async shareCloset({ commit, state }) {
    const closet = await this.$axios.get('/api/share').then((res) => { return res.data })
    console.log(closet)
    commit('setShareCloset', closet)
  },

  async shareUserList({ commit, state }) {
    const userList = await this.$axios.get('/api/share/users').then((res) => { return res.data})
    console.log(userList)
    commit('setShareUserList', userList)
  }
}