export const state = () => ({
  clothesList: [],
  filteredClothes: [],
  selectedClothes: [],
  shareCloset: [],
  shareUser: 0,
  shareUserList: [],
  category: [],
  countCloset: {}
})

export const getters = {
  getClothesList(state) {
    if (state.shareUser === 0) {
      return state.clothesList
    } else {
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
    return state.shareUserList
  },

  getCategory(state) {
    return state.category.map((cate) => cate.name)
  }
}

export const mutations = {
  //クローゼット
  setClothes(state, payload) {
    state.clothesList = payload
  },

  setFilteredClothes(state, payload) {
    state.filteredClothes = payload.slice()
  },
  resetFilteredClothes(state) {
    if (state.shareUser === 0) {
      state.filteredClothes = state.clothesList
    } else {
      state.filteredClothes = state.shareCloset[state.shareUser - 1]
    }

  },

  //コーディネート追加
  setSelectedClothes(state, payload) {
    state.selectedClothes = payload
  },
  deleteSelectedClothes(state, payload) {
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
  },
  //カテゴリー
  setCategory(state, category) {
    state.category = category
  }
}

export const actions = {
  async checkClothes({ commit, state }) {
    const clothes = await this.$axios.get('/api/clothes/get').then((res) => { return res.data })
    commit('setClothes', clothes)
    commit('setFilteredClothes', clothes)
  },

  async shareCloset({ commit, state }) {
    const closet = await this.$axios.get('/api/share').then((res) => { return res.data })
    commit('setShareCloset', closet)
  },

  async shareUserList({ commit, state }) {
    const userList = await this.$axios.get('/api/share/users').then((res) => { return res.data})
    commit('setShareUserList', userList)
  },

  async category({ commit }) {
    const category = await this.$axios.get('/api/category').then((res) => { return res.data })
    commit('setCategory', category)
  },

 }