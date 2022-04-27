import Vue from 'vue'
import Vuex from 'vuex'
import Article from './module/Article'
import Auth from './module/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    count: state => state.count
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    updateCount ( {commit} ) {
      commit('increment')
    }
  },
  modules: {
    auth: Auth,
    article: Article,
  }
})
