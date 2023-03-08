// store/auth.js
export const state = () => ({
    loggedIn: window.localStorage.getItem('loggedIn'),
    token: window.localStorage.getItem('token'),
    user: window.localStorage.getItem('user'),
    loading: false
  })
  
  export const mutations = {
    setLoading(state, value) {
      state.loading = value
    },
    setLoggedIn(state, loggedIn) {
      localStorage.setItem('loggedIn', loggedIn)
      state.loggedIn = window.localStorage.getItem('loggedIn')
    //   state.loggedIn = loggedIn
    },
    setToken(state, token) {
        localStorage.setItem('token', token)
        state.token = window.localStorage.getItem('token')
    //   state.token = token
    },
    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = window.localStorage.getItem('user')
    },
    logout() {
        localStorage.setItem('loggedIn', false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
  }
  export const getters = {
    isUser: (state) => {
      return JSON.parse(state.user)
    },
    isToken: (state) => {
      return state.token
    },
    isLoggedIn: (state) => {
      return state.loggedIn
    },
    isLoading: (state) => {
      return state.loading
    }
  }
  
  export const actions = {
    
    fetchData({ commit }) {
        commit('setLoading', true)
        return myApi.getData().then((response) => {
        // process the response
        commit('setLoading', false)
        return response
        })
    },
    async login({ commit }, data) {
        commit('setLoading', true)
      try {
        const response = await this.$axios.post(this.$baseurl + '/auth/local',data)
        const token = response.data.jwt
        commit('setLoggedIn', true)
        commit('setToken', token)
        commit('setUser', response.data)
        return response
      } catch (error) {
        return error
      }
    },
  
    logout({ commit }) {
      commit('setLoggedIn', false)
      commit('setToken', null)
      commit('setUser', null)
    }
  }

  export default {
    state,
    actions,
    mutations,
    getters
  };