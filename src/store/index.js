import { createStore } from 'vuex'

export default createStore({
  state: {
    userid: localStorage.getItem('userid') ? localStorage.getItem('userid') : '',
    type: localStorage.getItem('type') ? localStorage.getItem('type') : ''
  },
  mutations: {
    setToken (state, token) {
      state.userid = token.userid
      state.type = token.type
      localStorage.setItem('userid', token.userid)
      localStorage.setItem('type', token.type)
    },
    clearToken (state) {
      state.userid = ''
      state.type = ''
      localStorage.removeItem('userid')
      localStorage.removeItem('type')
    }
  },
  actions: {
  },
  modules: {
  }
})
