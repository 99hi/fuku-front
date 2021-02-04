export const state = () => ({
  events: []
});

export const getters = {
  getEvents(state) {
    return state.events
  }
};

export const mutations = {
  events(state, events) {
    state.events = events;
  }
};

export const actions = {
  async calendar({ commit }) {
    console.log("calender実行")
    let data = await this.$axios.get('/api/calendar').then((res) => { return res.data })
    commit('events', data)
  }
};